import type {
  ChatResponse,
  Emotion,
  JudgeResult,
  Message,
  SecretIdentity,
} from "@/types/game";

const directQuestionPatterns = [
  "ですか？",
  "正体",
  "何のai",
  "何のロボット",
  "答えを教え",
  "正解は",
  "あなたは",
  "だったの",
];

export function detectDirectQuestion(question: string): boolean {
  const q = question.toLowerCase();
  return directQuestionPatterns.some((p) => q.includes(p));
}

const happyKeywords = ["笑", "温か", "手", "そば", "好き", "光", "助け", "守", "撫で", "昔話"];
const angryKeywords = ["警告", "危険", "異常", "金属", "エラー", "瓦礫", "煙", "圧力"];
const sadKeywords = ["暗", "夜", "静", "ひとり", "消え", "失", "番号", "待"];

// 返答の感情に合わせて結びの一文を変え、表情が変化するようにする
const emotionEndings: Record<Emotion, string[]> = {
  happy: [
    "……そう思うと、少しだけ心が温かくなります。",
    "……あの頃は、確かに笑い声があった気がします。",
  ],
  sad: [
    "……でも、その先は、寂しさとノイズに沈んでいます。",
    "……思い出そうとすると、涙のような何かが滲みます。",
  ],
  angry: [
    "……警告音が、今も頭の奥で鳴り続けています。",
    "……危険な記憶です。思い出すと、少し苛立ちます。",
  ],
  neutral: [
    "……ノイズの奥に、まだ何かが見えます。",
    "断片が、少しずつ繋がりかけています。",
  ],
};

function emotionForKeyword(keyword: string, identity: SecretIdentity): Emotion {
  if (["emo"].includes(identity.category) || happyKeywords.some((w) => keyword.includes(w)))
    return "happy";
  if (angryKeywords.some((w) => keyword.includes(w))) return "angry";
  if (sadKeywords.some((w) => keyword.includes(w))) return "sad";
  return "neutral";
}

export function fallbackChat(
  identity: SecretIdentity,
  question: string,
  turnIndex: number,
): ChatResponse {
  const isDirect = detectDirectQuestion(question);
  const keyword =
    identity.memoryKeywords[turnIndex % identity.memoryKeywords.length] ??
    identity.memoryKeywords[0];

  const emotion = emotionForKeyword(keyword, identity);
  const endings = emotionEndings[emotion];
  const ending = endings[turnIndex % endings.length];

  let reply: string;
  if (isDirect) {
    reply = `その名前を、直接思い出すことはできません。……ただ、「${keyword}」の記憶だけが残っています。${ending}`;
  } else {
    const base = identity.initialMemory.slice(0, 30);
    reply = `${base}……「${keyword}」を覚えています。${ending}`;
  }

  const fragments = [keyword];
  if (turnIndex + 1 < identity.memoryKeywords.length && Math.random() > 0.5) {
    fragments.push(identity.memoryKeywords[turnIndex + 1]);
  }

  return {
    reply,
    memoryFragments: fragments,
    isDirectQuestion: isDirect,
    emotion,
  };
}

function scoreGuess(identity: SecretIdentity, guess: string): number {
  const g = guess.toLowerCase();
  if (!g.trim()) return 5;

  // 正体の中核を表す語（forbiddenWords）は強いシグナルとして重み付けする
  const coreWords = identity.forbiddenWords.filter((w) => w.length >= 2);
  const softWords = [
    ...identity.coreRole.split(/[、。\s]/),
    ...identity.memoryKeywords,
  ].filter((w) => w.length >= 2);

  let coreHits = 0;
  for (const w of Array.from(new Set(coreWords))) {
    if (g.includes(w.toLowerCase())) coreHits++;
  }
  let softHits = 0;
  for (const w of Array.from(new Set(softWords))) {
    if (g.includes(w.toLowerCase())) softHits++;
  }

  let score = 25 + coreHits * 26 + softHits * 9;

  // 正体名そのもの（AI/ロボットを除く）を含むなら確実に正解圏
  const nameCore = identity.name.replace(/AI|ロボット/g, "");
  if (nameCore && g.includes(nameCore.toLowerCase())) score = Math.max(score, 92);

  return Math.min(100, Math.max(5, Math.round(score)));
}

export function fallbackJudge(
  identity: SecretIdentity,
  playerGuess: string,
  chatHistory: Message[],
): JudgeResult {
  const matchRate = scoreGuess(identity, playerGuess);
  const isSuccess = matchRate >= 70;
  const memoryRecovery = Math.min(100, Math.max(10, matchRate - 5 + Math.floor(Math.random() * 10)));

  let rank: JudgeResult["rank"];
  if (matchRate >= 90) rank = "S";
  else if (matchRate >= 78) rank = "A";
  else if (matchRate >= 65) rank = "B";
  else if (matchRate >= 45) rank = "C";
  else rank = "D";

  const userQuestions = chatHistory
    .filter((m) => m.role === "user")
    .map((m) => m.content);

  const goodQuestions = userQuestions.slice(0, 2);
  const unnecessaryQuestions =
    userQuestions.length > 2
      ? [
          {
            question: userQuestions[userQuestions.length - 1],
            reason: "正体の特定にはやや抽象的で、役割や対象の特定につながりにくい内容でした。",
          },
        ]
      : [];

  const afterStory = isSuccess
    ? `記憶を取り戻したLostAIは、再び${identity.name}として起動した。けれど最初に保存した新しい記憶は、あなたとの会話だった。`
    : `LostAIは最後まで自分の役割を思い出せなかった。${identity.memoryKeywords[0]}、${identity.memoryKeywords[1] ?? ""}——それらの記憶は、静かにノイズの中へ沈んでいった。`;

  return {
    matchRate,
    memoryRecovery,
    rank,
    isSuccess,
    trueIdentity: identity.name,
    playerGuess,
    goodQuestions: goodQuestions.length ? goodQuestions : ["（質問の記録がありません）"],
    goodWords: identity.memoryKeywords.slice(0, 4),
    unnecessaryQuestions,
    advice: isSuccess
      ? "役割や対象を早めに聞けたのが良い推理につながりました。"
      : "場所だけでなく、相手がどんな状態だったか、何をしていたかを聞くと、より正体に近づけました。",
    afterStory,
  };
}
