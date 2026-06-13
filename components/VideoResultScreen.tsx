"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoResultScreen({
  isSuccess,
  onFinish,
}: {
  isSuccess: boolean;
  onFinish: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      videoRef.current?.play().catch(() => {});
    } else {
      // 不正解は演出を一定時間見せてから自動遷移
      const t = setTimeout(onFinish, 5200);
      return () => clearTimeout(t);
    }
    const labelTimer = setTimeout(() => setShowLabel(false), 2600);
    return () => clearTimeout(labelTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      {isSuccess ? (
        <video
          ref={videoRef}
          src="/videos/success.mp4"
          className="h-full max-h-screen w-full object-contain"
          autoPlay
          muted
          playsInline
          onEnded={onFinish}
        />
      ) : (
        <FailureAnimation />
      )}

      {/* 中央ラベル */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        {isSuccess ? (
          <div className="text-center">
            <div className="font-title text-5xl tracking-widest text-success glow-text sm:text-6xl">
              MEMORY RESTORED
            </div>
            <div className="mt-2 font-term text-sm tracking-[0.3em] text-success/80">
              記憶復元成功
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div
              className="glitch fail-flicker font-title text-5xl tracking-widest text-fail sm:text-6xl"
              data-text="MEMORY LOST"
              style={{ color: "#B026FF", textShadow: "0 0 16px rgba(176,38,255,0.7)" }}
            >
              MEMORY LOST
            </div>
            <div className="mt-2 font-term text-sm tracking-[0.3em] text-fail/80">
              記憶復元失敗
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onFinish}
        className="absolute bottom-5 right-5 z-10 rounded border border-ink/30 bg-black/40 px-4 py-1.5 font-term text-xs text-subink transition-colors hover:border-ink/70 hover:text-ink"
      >
        SKIP ▸
      </button>
    </div>
  );
}

function FailureAnimation() {
  return (
    <div className="noise-bg relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0010] via-black to-[#10000a]" />
      {/* 崩壊するデータ断片 */}
      <div className="absolute inset-0 overflow-hidden font-term text-[10px] text-fail/40">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute fail-flicker whitespace-nowrap"
            style={{
              top: `${(i * 7) % 100}%`,
              left: `${(i * 13) % 90}%`,
              animationDelay: `${i * 0.13}s`,
            }}
          >
            {"> ERROR 0x" + (i * 7841).toString(16).toUpperCase() + " MEMORY CORRUPTED"}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(176,38,255,0.06)_3px)]" />
    </div>
  );
}
