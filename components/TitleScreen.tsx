"use client";

import Image from "next/image";

export default function TitleScreen({
  onStart,
  onHowTo,
}: {
  onStart: () => void;
  onHowTo: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-bg">
      {/* タイトル素材をそのまま表示（アスペクト比を保持して全体を見せる） */}
      <div
        className="relative aspect-[1672/941] max-w-full"
        style={{ width: "min(100vw, calc(100vh * 1672 / 941))" }}
      >
        <Image
          src="/images/title.png"
          alt="LostAI"
          fill
          priority
          className="object-contain select-none"
        />

        {/* 背景画像内の「記憶を復元する」ボタン位置の透明ホットスポット */}
        <button
          onClick={onStart}
          aria-label="記憶を復元する"
          className="group absolute rounded-[10px] transition-all duration-200 hover:bg-[rgba(91,231,255,0.12)] hover:shadow-[0_0_22px_rgba(91,231,255,0.55)] focus:outline-none focus-visible:bg-[rgba(91,231,255,0.12)]"
          style={{ left: "31%", top: "49.5%", width: "40%", height: "12.5%" }}
        />

        {/* 背景画像内の「遊び方を見る」ボタン位置の透明ホットスポット */}
        <button
          onClick={onHowTo}
          aria-label="遊び方を見る"
          className="group absolute rounded-[10px] transition-all duration-200 hover:bg-[rgba(91,231,255,0.12)] hover:shadow-[0_0_22px_rgba(91,231,255,0.55)] focus:outline-none focus-visible:bg-[rgba(91,231,255,0.12)]"
          style={{ left: "31%", top: "67%", width: "40%", height: "13%" }}
        />
      </div>
    </div>
  );
}
