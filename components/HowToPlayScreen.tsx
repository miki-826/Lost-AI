"use client";

import { useState } from "react";
import Image from "next/image";
import NeonButton from "./NeonButton";

const slides = ["/images/howto/slide1.png", "/images/howto/slide2.png"];

export default function HowToPlayScreen({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const isLast = idx === slides.length - 1;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-8">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <h2 className="font-title text-xl tracking-widest text-glow glow-text sm:text-2xl">
          HOW TO PLAY
        </h2>
        <span className="font-term text-xs text-subink">
          {idx + 1} / {slides.length}
        </span>
      </div>

      {/* スライド本体（アスペクト比を保持して全体表示） */}
      <div className="relative aspect-[1672/941] w-full max-w-5xl overflow-hidden rounded-md border border-accent/30 shadow-glow">
        <Image
          key={idx}
          src={slides[idx]}
          alt={`遊び方 スライド${idx + 1}`}
          fill
          priority
          className="object-contain fade-in"
        />
      </div>

      {/* ページ送り */}
      <div className="flex items-center gap-4">
        <NeonButton
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="px-4 py-2 text-sm"
        >
          ◂ 前へ
        </NeonButton>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`スライド${i + 1}へ`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === idx ? "bg-accent shadow-glow" : "bg-accent/25 hover:bg-accent/50"
              }`}
            />
          ))}
        </div>

        <NeonButton
          onClick={() => setIdx((i) => Math.min(slides.length - 1, i + 1))}
          disabled={isLast}
          className="px-4 py-2 text-sm"
        >
          次へ ▸
        </NeonButton>
      </div>

      <div className="mt-2 flex gap-3">
        <NeonButton onClick={onBack} className="text-sm">
          ◂ タイトルへ
        </NeonButton>
        <NeonButton onClick={onStart} variant="success" className="text-sm">
          ▸ ゲーム開始
        </NeonButton>
      </div>
    </div>
  );
}
