import { NextResponse } from "next/server";
import { getFaqItems } from "@/lib/faq";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getFaqItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Could not load FAQ." }, { status: 500 });
  }
}
