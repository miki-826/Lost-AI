"use client";

import { useState } from "react";
import BgmPlayer from "@/components/BgmPlayer";
import StatusBadge from "@/components/StatusBadge";
import TitleScreen from "@/components/TitleScreen";
import StoryScreen from "@/components/StoryScreen";
import HowToPlayScreen from "@/components/HowToPlayScreen";
import ChatScreen from "@/components/ChatScreen";
import GuessScreen from "@/components/GuessScreen";
import VideoResultScreen from "@/components/VideoResultScreen";
import AnalysisScreen from "@/components/AnalysisScreen";
import { getRandomIdentity } from "@/lib/identities";
import type {
  ChatResponse,
  Emotion,
  GamePhase,
  JudgeResult,
  Message,
  SecretIdentity,
} from "@/types/game";

const NOISE_BY_REMAINING: Record<number, number> = {
  5: 92,
  4: 76,
  3: 58,
  2: 41,
  1: 25,
  0: 12,
};

export default function Page() {
  const [phase, setPhase] = useState<GamePhase>("title");
  const [identity, setIdentity] = useState<SecretIdentity | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [remaining, setRemaining] = useState(5);
  const [fragments, setFragments] = useState<string[]>([]);
  const [playerGuess, setPlayerGuess] = useState("");
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emotion, setEmotion] = useState<Emotion>("neutral");

  const noise = NOISE_BY_REMAINING[remaining] ?? 50;
  const stability = 100 - noise;

  // 推理後（動画・総合評価）はBGMを切り替える
  const bgmSrc =
    phase === "video" || phase === "analysis" ? "/music/result.mp3" : "/music/bgm.mp3";

  const startGame = () => {
    const id = getRandomIdentity();
    setIdentity(id);
    setMessages([{ role: "assistant", content: id.initialMemory }]);
    setRemaining(5);
    setFragments([]);
    setPlayerGuess("");
    setResult(null);
    setEmotion("neutral");
    setPhase("playing");
  };

  const backToTitle = () => {
    setPhase("title");
    setIdentity(null);
    setMessages([]);
    setRemaining(5);
    setFragments([]);
    setResult(null);
    setEmotion("neutral");
  };

  const handleSend = async (question: string) => {
    if (!identity || remaining <= 0 || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityId: identity.id,
          secretIdentity: identity.name,
          coreRole: identity.coreRole,
          forbiddenWords: identity.forbiddenWords,
          chatHistory: messages,
          remainingQuestions: remaining,
          userQuestion: question,
        }),
      });
      const data: ChatResponse = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.memoryFragments?.length) {
        setFragments((prev) => Array.from(new Set([...prev, ...data.memoryFragments])));
      }
      if (data.emotion) setEmotion(data.emotion);
      setRemaining((r) => Math.max(0, r - 1));
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "通信エラーが発生しました" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = async (guess: string) => {
    if (!identity || isLoading) return;
    setPlayerGuess(guess);
    setIsLoading(true);

    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityId: identity.id,
          secretIdentity: identity.name,
          coreRole: identity.coreRole,
          playerGuess: guess,
          chatHistory: messages,
        }),
      });
      const data: JudgeResult = await res.json();
      setResult(data);
      setPhase("video");

      // プレイ履歴を保存（Supabase設定時のみ）
      fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: data, chatHistory: messages }),
      }).catch(() => {});
    } catch {
      // 採点失敗時もタイトルへ戻れるように最低限のフォールバック
      setResult({
        matchRate: 0,
        memoryRecovery: 0,
        rank: "D",
        isSuccess: false,
        trueIdentity: identity.name,
        playerGuess: guess,
        goodQuestions: [],
        goodWords: [],
        unnecessaryQuestions: [],
        advice: "採点に失敗しました。もう一度挑戦してください。",
        afterStory: "記憶は、ノイズの中へ沈んでいった。",
      });
      setPhase("video");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="scanlines noise-bg relative min-h-screen w-full">
      <BgmPlayer src={bgmSrc} />
      <StatusBadge />

      {phase === "title" && (
        <TitleScreen onStart={() => setPhase("story")} onHowTo={() => setPhase("howto")} />
      )}
      {phase === "story" && <StoryScreen onNext={startGame} />}
      {phase === "howto" && (
        <HowToPlayScreen onStart={startGame} onBack={() => setPhase("title")} />
      )}
      {phase === "playing" && (
        <ChatScreen
          messages={messages}
          remaining={remaining}
          noise={noise}
          stability={stability}
          fragments={fragments}
          isLoading={isLoading}
          emotion={emotion}
          onSend={handleSend}
          onGuess={() => setPhase("guess")}
        />
      )}
      {phase === "guess" && (
        <GuessScreen fragments={fragments} isLoading={isLoading} onSubmit={handleGuess} />
      )}
      {phase === "video" && result && (
        <VideoResultScreen
          isSuccess={result.isSuccess}
          onFinish={() => setPhase("analysis")}
        />
      )}
      {phase === "analysis" && result && (
        <AnalysisScreen result={result} onBackToTitle={backToTitle} />
      )}
    </main>
  );
}
