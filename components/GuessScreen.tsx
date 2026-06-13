"use client";

import { useState } from "react";
import MemoryFragmentCard from "./MemoryFragmentCard";
import NeonButton from "./NeonButton";

export default function GuessScreen({
  fragments,
  isLoading,
  onSubmit,
}: {
  fragments: string[];
  isLoading: boolean;
  onSubmit: (guess: string) => void;
}) {
  const [guess, setGuess] = useState("");

  return (
    <div className="noise-bg flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="panel w-full max-w-2xl rounded-md p-8 fade-in">
        <div className="mb-2 text-center">
          <h2 className="font-title text-3xl tracking-widest text-glow glow-text">
            MEMORY MATCH
          </h2>
          <p className="font-term text-sm text-subink">記憶照合</p>
        </div>

        <p className="my-6 text-center text-lg text-ink">
          このAIは、かつて何のAI／ロボットだった？
        </p>

        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && guess.trim() && !isLoading) onSubmit(guess.trim());
          }}
          autoFocus
          placeholder="例：駅で迷子を案内するAI"
          className="w-full rounded border border-glow/60 bg-[rgba(0,10,20,0.6)] px-4 py-3.5 text-center font-term text-base text-ink placeholder:text-subink/40 outline-none shadow-glow transition-all focus:border-glow focus:shadow-glow-lg"
        />

        <p className="mt-3 text-center font-term text-[11px] text-warn/80">
          照合後は追加で質問できません。
        </p>

        <div className="mt-6">
          <div className="mb-2 font-term text-[10px] tracking-widest text-accent">
            集めた記憶断片：
          </div>
          <div className="flex flex-wrap gap-2">
            {fragments.length === 0 ? (
              <span className="font-term text-[10px] text-subink/60">
                断片を集められませんでした
              </span>
            ) : (
              fragments.map((f, i) => <MemoryFragmentCard key={`${f}-${i}`} label={f} />)
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <NeonButton
            onClick={() => guess.trim() && onSubmit(guess.trim())}
            disabled={!guess.trim() || isLoading}
            className="text-base"
          >
            {isLoading ? "照合中..." : "▸ 記憶を照合する"}
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
