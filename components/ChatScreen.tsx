"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StatusBar from "./StatusBar";
import MemoryFragmentCard from "./MemoryFragmentCard";
import NeonButton from "./NeonButton";
import type { Message } from "@/types/game";

export default function ChatScreen({
  messages,
  remaining,
  noise,
  stability,
  fragments,
  isLoading,
  onSend,
  onGuess,
}: {
  messages: Message[];
  remaining: number;
  noise: number;
  stability: number;
  fragments: string[];
  isLoading: boolean;
  onSend: (q: string) => void;
  onGuess: () => void;
}) {
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const canSend = input.trim().length > 0 && remaining > 0 && !isLoading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-3 px-3 py-4 sm:px-4">
      <StatusBar remaining={remaining} noise={noise} stability={stability} />

      <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[200px_1fr_180px]">
        {/* 左：AIステータス */}
        <div className="panel hidden flex-col items-center gap-3 rounded-md p-4 lg:flex">
          <div className="relative h-32 w-32">
            <Image
              src="/images/character.png"
              alt="LostAI"
              fill
              className="object-contain pulse-glow"
            />
          </div>
          <div className="text-center font-term text-[10px] leading-relaxed text-accent">
            <div className="glow-text">AI STATUS</div>
            <div className="mt-1 text-subink">MEMORY FRAGMENT</div>
            <div className="text-subink">LOADING...</div>
          </div>
          <div className="mt-2 w-full space-y-1 font-term text-[9px] text-subink/70">
            <div>{">"} SYNC {Math.max(0, 100 - noise)}%</div>
            <div>{">"} CORE UNSTABLE</div>
            <div className="text-warn/70 fail-flicker">{">"} CONNECTING...</div>
          </div>
        </div>

        {/* 中央：チャットログ */}
        <div className="panel flex flex-col rounded-md">
          <div className="flex items-center gap-2 border-b border-accent/20 px-4 py-2 font-term text-[10px] tracking-widest text-subink">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            CHAT LOG / 深層記憶領域
          </div>
          <div
            ref={logRef}
            className="thin-scroll flex-1 space-y-4 overflow-y-auto p-4"
            style={{ maxHeight: "calc(100vh - 240px)", minHeight: "320px" }}
          >
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 font-term text-xs text-accent">
                <span className="animate-pulse">記憶を呼び出しています</span>
                <span className="caret" />
              </div>
            )}
          </div>
        </div>

        {/* 右：記憶断片 */}
        <div className="panel flex flex-col gap-2 rounded-md p-3">
          <div className="font-term text-[10px] tracking-widest text-accent glow-text">
            記憶断片 / FRAGMENTS
          </div>
          <div className="flex flex-wrap content-start gap-2">
            {fragments.length === 0 ? (
              <span className="font-term text-[10px] text-subink/60">
                まだ断片はありません
              </span>
            ) : (
              fragments.map((f, i) => <MemoryFragmentCard key={`${f}-${i}`} label={f} />)
            )}
          </div>
        </div>
      </div>

      {/* 下：入力欄 */}
      <div className="panel flex flex-col gap-2 rounded-md p-3 sm:flex-row sm:items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={remaining <= 0 || isLoading}
          placeholder={
            remaining <= 0 ? "呼び出し回数がありません。推理へ進んでください" : "質問を入力..."
          }
          className="flex-1 rounded border border-accent/40 bg-[rgba(0,10,20,0.6)] px-3 py-2.5 font-term text-sm text-ink placeholder:text-subink/50 outline-none transition-all focus:border-glow focus:shadow-glow disabled:opacity-40"
        />
        <div className="flex gap-2">
          <NeonButton onClick={handleSend} disabled={!canSend} className="px-4 py-2.5 text-sm">
            質問する
          </NeonButton>
          <NeonButton
            onClick={onGuess}
            variant="success"
            disabled={isLoading}
            className="px-4 py-2.5 text-sm"
          >
            推理へ ▸
          </NeonButton>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  if (message.role === "system") {
    return (
      <div className="fade-in text-center font-term text-[11px] text-warn/80">
        — {message.content} —
      </div>
    );
  }
  const isAi = message.role === "assistant";
  return (
    <div className={`fade-in flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
          isAi
            ? "border border-accent/40 bg-[rgba(0,217,255,0.07)] text-ink"
            : "border border-[#1b2f5a] bg-[rgba(11,16,32,0.9)] text-glow"
        }`}
      >
        <div
          className={`mb-1 font-term text-[9px] tracking-widest ${
            isAi ? "text-accent" : "text-subink"
          }`}
        >
          {isAi ? "LostAI" : "YOU"}
        </div>
        {message.content}
      </div>
    </div>
  );
}
