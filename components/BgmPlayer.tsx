"use client";

import { useEffect, useRef, useState } from "react";

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/bgm.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // 最初から再生を試みる
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          // ブラウザの自動再生制限。最初の操作で再生する
          setNeedsGesture(true);
        });
    };
    tryPlay();

    const onFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
            setNeedsGesture(false);
          })
          .catch(() => {});
      }
    };
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const toggleMute = () => setMuted((m) => !m);

  return (
    <div className="fixed top-3 right-3 z-[60] flex items-center gap-2 panel rounded-md px-3 py-2 text-xs font-term">
      <button
        onClick={toggleMute}
        className="text-accent hover:text-glow transition-colors"
        aria-label={muted ? "ミュート解除" : "ミュート"}
        title={muted ? "ミュート解除" : "ミュート"}
      >
        {muted || volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : "🔊"}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={(e) => {
          setVolume(Number(e.target.value));
          if (muted) setMuted(false);
        }}
        className="w-20 sm:w-28 accent-accent cursor-pointer"
        aria-label="音量"
      />
      <span className="hidden sm:inline text-subink w-8 text-right">
        {Math.round((muted ? 0 : volume) * 100)}
      </span>
      {needsGesture && !playing && (
        <span className="text-warn animate-pulse hidden sm:inline">▶ 画面をクリックで再生</span>
      )}
    </div>
  );
}
