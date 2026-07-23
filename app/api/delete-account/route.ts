import { NextResponse } from "next/server";
import net from "node:net";
import tls from "node:tls";

const DEFAULT_TO_EMAIL = "labirnythgame@gmail.com";

type DeleteAccountPayload = {
  playerId?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export async function POST(request: Request) {
  let payload: DeleteAccountPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const playerId = payload.playerId?.trim();

  if (!playerId) {
    return NextResponse.json({ message: "Player ID is required." }, { status: 400 });
  }

  const config = getSmtpConfig();

  if (!config) {
    return NextResponse.json(
      { message: "Email sending is not configured yet." },
      { status: 500 }
    );
  }

  try {
    await sendSmtpMail({
      config,
      subject: "The Maze account deletion request",
      text: [
        "Hey please delete my account, my id:",
        playerId,
        "",
        "I understand that deleting my account may permanently remove my progress, leaderboard data, and related game information.",
      ].join("\n"),
    });

    return NextResponse.json({ message: "Deletion request sent." });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "";
    const isBadCredentials =
      errorMessage.includes("535") || errorMessage.includes("5.7.8");
    const isTimeout = errorMessage.includes("timed out");

    return NextResponse.json(
      {
        message: isBadCredentials
          ? "Gmail rejected the SMTP login. Use a Gmail App Password in SMTP_PASS, not your normal Google account password."
          : isTimeout
            ? "SMTP request timed out. Check SMTP_HOST and SMTP_PORT. For Gmail use port 465 or 587; some hosting providers also block outbound SMTP."
          : "Could not send the deletion request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port: Number(process.env.SMTP_PORT || 465),
    user,
    pass,
    from: process.env.SMTP_FROM || user,
    to: process.env.DELETE_ACCOUNT_TO || DEFAULT_TO_EMAIL,
  };
}

async function sendSmtpMail({
  config,
  subject,
  text,
}: {
  config: SmtpConfig;
  subject: string;
  text: string;
}) {
  let socket: net.Socket | tls.TLSSocket = config.port === 465
    ? tls.connect({
        host: config.host,
        port: config.port,
        servername: config.host,
      })
    : net.connect({
        host: config.host,
        port: config.port,
      });

  socket.setEncoding("utf8");
  socket.setTimeout(15000);

  try {
    await readSmtpResponse(socket);
    await smtpCommand(socket, `EHLO ${config.host}`);

    if (config.port !== 465) {
      await smtpCommand(socket, "STARTTLS");
      socket = tls.connect({
        socket,
        servername: config.host,
      });
      socket.setEncoding("utf8");
      socket.setTimeout(15000);
      await smtpCommand(socket, `EHLO ${config.host}`);
    }

    await smtpCommand(socket, "AUTH LOGIN");
    await smtpCommand(socket, Buffer.from(config.user).toString("base64"));
    await smtpCommand(socket, Buffer.from(config.pass).toString("base64"));
    await smtpCommand(socket, `MAIL FROM:<${config.from}>`);
    await smtpCommand(socket, `RCPT TO:<${config.to}>`);
    await smtpCommand(socket, "DATA");
    await smtpData(socket, buildMessage(config, subject, text));
    await smtpCommand(socket, "QUIT");
  } finally {
    socket.end();
  }
}

function buildMessage(config: SmtpConfig, subject: string, text: string) {
  const safeText = text.replace(/\r?\n\./g, "\n..");

  return [
    `From: The Maze <${config.from}>`,
    `To: ${config.to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    safeText,
  ].join("\r\n");
}

function smtpCommand(socket: net.Socket | tls.TLSSocket, command: string) {
  socket.write(`${command}\r\n`);
  return readSmtpResponse(socket);
}

function smtpData(socket: net.Socket | tls.TLSSocket, message: string) {
  socket.write(`${message}\r\n.\r\n`);
  return readSmtpResponse(socket);
}

function readSmtpResponse(socket: net.Socket | tls.TLSSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("timeout", onTimeout);
    }

    function onData(chunk: string) {
      buffer += chunk;
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (!lastLine || !/^\d{3} /.test(lastLine)) {
        return;
      }

      cleanup();

      if (/^[45]\d{2}/.test(lastLine)) {
        reject(new Error(buffer));
        return;
      }

      resolve(buffer);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onTimeout() {
      cleanup();
      reject(new Error("SMTP request timed out."));
    }

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("timeout", onTimeout);
  });
}
