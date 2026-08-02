import { NextResponse } from "next/server";
import { getFaqItems, saveFaqItems } from "@/lib/faq";

type SaveFaqPayload = {
  password?: string;
  items?: unknown;
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: SaveFaqPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { message: "Admin password is not configured." },
      { status: 500 }
    );
  }

  if (payload.password !== adminPassword) {
    return NextResponse.json({ message: "Invalid password." }, { status: 401 });
  }

  try {
    if (!("items" in payload)) {
      const items = await getFaqItems();
      return NextResponse.json({ items, message: "Logged in." });
    }

    const items = await saveFaqItems(Array.isArray(payload.items) ? payload.items : []);
    return NextResponse.json({ items, message: "FAQ saved." });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not save FAQ." },
      { status: 400 }
    );
  }
}
