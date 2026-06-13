import { NextResponse } from "next/server";
import { saveSession, isSupabaseConfigured } from "@/lib/supabase";
import type { JudgeResult, Message } from "@/types/game";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ saved: false, reason: "supabase not configured" });
    }

    const body = await req.json();
    const { result, chatHistory } = body as {
      result: JudgeResult;
      chatHistory: Message[];
    };

    const ok = await saveSession({
      secret_identity: result.trueIdentity,
      player_guess: result.playerGuess,
      match_rate: result.matchRate,
      memory_recovery: result.memoryRecovery,
      rank: result.rank,
      is_success: result.isSuccess,
      good_words: result.goodWords,
      good_questions: result.goodQuestions,
      unnecessary_questions: result.unnecessaryQuestions,
      advice: result.advice,
      after_story: result.afterStory,
      chat_history: chatHistory,
    });

    return NextResponse.json({ saved: ok });
  } catch {
    return NextResponse.json({ saved: false }, { status: 200 });
  }
}
