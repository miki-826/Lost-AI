import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({ connected: false });
  }

  try {
    // 実際に疎通できるか軽量に確認する（4秒でタイムアウト）
    const check = openai.models.list();
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 4000),
    );
    await Promise.race([check, timeout]);
    return NextResponse.json({ connected: true });
  } catch {
    return NextResponse.json({ connected: false });
  }
}
