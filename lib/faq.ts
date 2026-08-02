import { promises as fs } from "node:fs";
import path from "node:path";

export type FaqItem = {
  question: string;
  answer: string;
};

const faqPath = path.join(process.cwd(), "content", "faq.json");

export async function getFaqItems(): Promise<FaqItem[]> {
  const file = await fs.readFile(faqPath, "utf8");
  const items = JSON.parse(file);

  return parseFaqItems(items);
}

export async function saveFaqItems(items: FaqItem[]) {
  const parsedItems = parseFaqItems(items);
  await fs.writeFile(faqPath, `${JSON.stringify(parsedItems, null, 2)}\n`, "utf8");
  return parsedItems;
}

export function parseFaqItems(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) {
    throw new Error("FAQ must be an array.");
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`FAQ item ${index + 1} is invalid.`);
    }

    const question = "question" in item ? String(item.question).trim() : "";
    const answer = "answer" in item ? String(item.answer).trim() : "";

    if (!question || !answer) {
      throw new Error(`FAQ item ${index + 1} needs a question and answer.`);
    }

    return { question, answer };
  });
}
