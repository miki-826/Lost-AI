import OpenAI from "openai";

export function getOpenAI(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  // 未設定、またはダミー値（短すぎる/プレフィックス不正）はフォールバックに回す
  if (!apiKey || apiKey.length < 20 || !apiKey.startsWith("sk-")) return null;
  return new OpenAI({ apiKey });
}

export function extractJson<T>(text: string): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}
