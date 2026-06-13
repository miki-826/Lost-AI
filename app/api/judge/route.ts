import { NextResponse } from "next/server";
import { getOpenAI, extractJson } from "@/lib/openai";
import { buildJudgePrompt } from "@/lib/prompts";
import { fallbackJudge } from "@/lib/fallback";
import { identities } from "@/lib/identities";
import type { JudgeResult, Message } from "@/types/game";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      identityId,
      secretIdentity,
      coreRole,
      playerGuess = "",
      chatHistory = [],
    } = body as {
      identityId?: string;
      secretIdentity: string;
      coreRole: string;
      playerGuess: string;
      chatHistory: Message[];
    };

    const openai = getOpenAI();
    const identity =
      identities.find((i) => i.id === identityId) ??
      identities.find((i) => i.name === secretIdentity);

    if (!openai) {
      if (!identity) {
        return NextResponse.json({ error: "identity not found" }, { status: 400 });
      }
      return NextResponse.json(fallbackJudge(identity, playerGuess, chatHistory));
    }

    const prompt = buildJudgePrompt({ secretIdentity, coreRole, playerGuess, chatHistory });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = extractJson<JudgeResult>(text);

    if (!parsed) {
      if (identity) {
        return NextResponse.json(fallbackJudge(identity, playerGuess, chatHistory));
      }
      return NextResponse.json({ error: "judge failed" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: "judge error" }, { status: 500 });
  }
}
