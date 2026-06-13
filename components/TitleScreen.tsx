"use client";

import Image from "next/image";
import NeonButton from "./NeonButton";

export default function TitleScreen({
  onStart,
  onHowTo,
}: {
  onStart: () => void;
  onHowTo: () => void;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* 背景：タイトル素材を薄く敷く */}
      <Image
        src="/images/title.png"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg/90" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center fade-in">
        <div className="flex flex-col items-center gap-2">
          <h1
            className="glitch font-title text-7xl font-black tracking-widest text-ink glow-text sm:text-8xl"
            data-text="LostAI"
          >
            Lost<span className="text-accent">AI</span>
          </h1>
          <p className="font-term text-sm tracking-wide text-subink sm:text-base">
            失われた記憶は、あと
            <span className="text-warn glow-text">5回</span>
            でしか呼び出せない。
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <NeonButton onClick={onStart} className="text-base">
            ▸ 記憶を復元する
          </NeonButton>
          <NeonButton onClick={onHowTo} className="text-base">
            ▹ 遊び方を見る
          </NeonButton>
        </div>

        <div className="mt-6 font-term text-[10px] tracking-[0.3em] text-warn/60 fail-flicker">
          SYSTEM WARNING — MEMORY LOST
        </div>
      </div>
    </div>
  );
}
