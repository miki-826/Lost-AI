export type SecretIdentity = {
  id: string;
  name: string;
  category: "daily" | "sf" | "emo" | "industrial";
  coreRole: string;
  forbiddenWords: string[];
  initialMemory: string;
  memoryKeywords: string[];
};

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Emotion = "neutral" | "happy" | "sad" | "angry";

export type ChatResponse = {
  reply: string;
  memoryFragments: string[];
  isDirectQuestion: boolean;
  emotion: Emotion;
};

export type UnnecessaryQuestion = {
  question: string;
  reason: string;
};

export type JudgeResult = {
  matchRate: number;
  memoryRecovery: number;
  rank: "S" | "A" | "B" | "C" | "D";
  isSuccess: boolean;
  trueIdentity: string;
  playerGuess: string;
  goodQuestions: string[];
  goodWords: string[];
  unnecessaryQuestions: UnnecessaryQuestion[];
  advice: string;
  afterStory: string;
};

export type GamePhase =
  | "title"
  | "story"
  | "howto"
  | "playing"
  | "guess"
  | "video"
  | "analysis";

export type GameState = {
  phase: GamePhase;
  secretIdentity: SecretIdentity | null;
  messages: Message[];
  remainingQuestions: number;
  memoryNoise: number;
  memoryStability: number;
  memoryFragments: string[];
  playerGuess: string;
  result: JudgeResult | null;
  isLoading: boolean;
};
