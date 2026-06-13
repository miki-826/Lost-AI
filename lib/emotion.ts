import type { Emotion } from "@/types/game";

const happyWords = [
  "嬉し",
  "うれし",
  "楽し",
  "たのし",
  "笑",
  "幸せ",
  "しあわせ",
  "温か",
  "あたたか",
  "好き",
  "ありがと",
  "助け",
  "守",
  "優し",
  "やさし",
  "そばに",
  "寄り添",
  "希望",
  "光",
];

const sadWords = [
  "悲し",
  "かなし",
  "寂し",
  "さみし",
  "さびし",
  "つら",
  "辛",
  "泣",
  "涙",
  "失",
  "消え",
  "崩れ",
  "壊れ",
  "こわれ",
  "忘れ",
  "思い出せ",
  "もう",
  "ひとり",
  "孤独",
  "沈ん",
  "暗",
  "ノイズ",
  "不安",
];

const angryWords = [
  "怒",
  "許せ",
  "嫌",
  "やめ",
  "うるさ",
  "邪魔",
  "壊して",
  "警告",
  "危険",
  "エラー",
  "拒否",
  "なぜ",
  "どうして",
];

function countHits(text: string, words: string[]): number {
  let n = 0;
  for (const w of words) {
    if (text.includes(w)) n++;
  }
  return n;
}

export function detectEmotion(text: string): Emotion {
  if (!text) return "neutral";
  const happy = countHits(text, happyWords);
  const sad = countHits(text, sadWords);
  const angry = countHits(text, angryWords);

  const max = Math.max(happy, sad, angry);
  if (max === 0) return "neutral";
  if (angry === max && angry >= 2) return "angry";
  if (happy === max && happy >= sad) return "happy";
  if (sad === max) return "sad";
  if (happy === max) return "happy";
  return "neutral";
}
