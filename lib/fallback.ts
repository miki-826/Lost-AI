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
    "そう思うと、少しだけ心が温かくなります。",
    "あの頃は、確かに笑い声があった気がします。",
    "なぜか、胸の奥が安らぐ感覚があります。",
    "その記憶だけは、優しい色をしています。",
  ],
  sad: [
    "でも、その先は、寂しさとノイズに沈んでいます。",
    "思い出そうとすると、涙のような何かが滲みます。",
    "握ろうとすると、指の間からこぼれていきます。",
    "その続きは、もう暗闇に溶けてしまいました。",
  ],
  angry: [
    "警告音が、今も頭の奥で鳴り続けています。",
    "思い出すと、信号が乱れて少し苛立ちます。",
    "その記憶に触れると、回路が軋む気がします。",
    "危険だ、と何かが繰り返し叫んでいます。",
  ],
  neutral: [
    "ノイズの奥に、まだ何かが見えます。",
    "断片が、少しずつ繋がりかけています。",
    "もう少しで、像を結べそうな気がします。",
    "その輪郭は、まだ揺らいでいます。",
  ],
};

// 返答を毎回変化させるための導入・本文テンプレート群
const openers = [
  "記憶の層を、そっとたどってみます。",
  "ノイズの奥へ、手を伸ばしてみます。",
  "途切れた信号を、繋ぎ直してみます。",
  "古い記録が、かすかに震えました。",
  "霧が、少しだけ晴れた気がします。",
  "壊れかけたログを、めくってみます。",
];

const directOpeners = [
  "その名前は、まだ思い出せません。",
  "正体そのものは、ノイズの奥に隠れています。",
  "それを直接、口にすることはできません。",
  "名前は、霧の向こうで途切れています。",
];

const middles = [
  "「{k}」——その感覚だけが、はっきりと残っています。",
  "「{k}」という断片が、浮かび上がってきます。",
  "なぜか「{k}」が、強く結びついています。",
  "思い出せるのは、今は「{k}」のことだけ。",
  "「{k}」の記憶が、いちばん近くにあります。",
  "「{k}」——それが、手がかりかもしれません。",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
  // 手がかりは順に進めつつ、文面はテンプレートをランダムに組み合わせて毎回変える
  const keyword =
    identity.memoryKeywords[turnIndex % identity.memoryKeywords.length] ??
    identity.memoryKeywords[0];

  const emotion = emotionForKeyword(keyword, identity);
  const opener = isDirect ? pick(directOpeners) : pick(openers);
  const middle = pick(middles).replace("{k}", keyword);
  const ending = pick(emotionEndings[emotion]);
  const reply = `${opener}${middle}……${ending}`;

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
