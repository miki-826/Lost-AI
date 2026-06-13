type SessionRecord = {
  secret_identity: string;
  player_guess: string;
  match_rate: number;
  memory_recovery: number;
  rank: string;
  is_success: boolean;
  good_words: unknown;
  good_questions: unknown;
  unnecessary_questions: unknown;
  advice: string;
  after_story: string;
  chat_history: unknown;
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export async function saveSession(record: SessionRecord): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  try {
    const res = await fetch(`${url}/rest/v1/game_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
    });
    return res.ok;
  } catch {
    return false;
  }
}
