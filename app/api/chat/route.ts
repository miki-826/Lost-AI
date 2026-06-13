import { NextResponse } from "next/server";
import { getOpenAI, extractJson } from "@/lib/openai";
import { buildChatPrompt } from "@/lib/prompts";
import { fallbackChat } from "@/lib/fallback";
import { identities } from "@/lib/identities";
import type { ChatResponse, Message } from "@/types/game";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      identityId,
      secretIdentity,
      coreRole,
      forbiddenWords = [],
      chatHistory = [],
      remainingQuestions = 5,
      userQuestion = "",
    } = body as {
      identityId?: string;
      secretIdentity: string;
      coreRole: string;
      forbiddenWords: string[];
      chatHistory: Message[];
      remainingQuestions: number;
      userQuestion: string;
    };

    const turnIndex = 5 - remainingQuestions;
    const openai = getOpenAI();

    if (!openai) {
      const identity =
        identities.find((i) => i.id === identityId) ??
        identities.find((i) => i.name === secretIdentity);
      if (!identity) {
        return NextResponse.json(
          { reply: "……記憶が、見つかりません。", memoryFragments: [], isDirectQuestion: false },
          { status: 200 },
        );
      }
      return NextResponse.json(fallbackChat(identity, userQuestion, turnIndex));
    }

    const prompt = buildChatPrompt({
      secretIdentity,
      coreRole,
      forbiddenWords,
      chatHistory,
      remainingQuestions,
      userQuestion,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = extractJson<ChatResponse>(text);

    if (!parsed) {
      return NextResponse.json({
        reply: "……うまく、思い出せませんでした。",
        memoryFragments: [],
        isDirectQuestion: false,
      });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json(
      {
        reply: "……通信にノイズが走りました。もう一度試してください。",
        memoryFragments: [],
        isDirectQuestion: false,
      },
      { status: 200 },
    );
  }
}
