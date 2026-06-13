"use client";

import NeonButton from "./NeonButton";

const rules = [
  { icon: "❓", text: "AIに質問できるのは5回まで" },
  { icon: "🚫", text: "AIは正体を直接答えられません" },
  { icon: "🧩", text: "AIは聞かれたことにだけ断片的に答えます" },
  { icon: "🔍", text: "最後に「何のAIだったか」を推理します" },
  { icon: "⚡", text: "正解なら記憶復元、不正解なら記憶崩壊" },
];

export default function HowToPlayScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl fade-in">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-title text-2xl tracking-widest text-glow glow-text">
            HOW TO PLAY
          </h2>
          <div className="panel rounded px-3 py-1 font-term text-xs text-warn">
            残り <span className="text-lg glow-text">5</span> 回
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((r, i) => (
            <div
              key={i}
              className="panel flex items-center gap-4 rounded-md px-4 py-3 transition-all hover:border-glow/60 hover:shadow-glow"
            >
              <span className="font-term text-accent text-lg">0{i + 1}</span>
              <span className="text-xl">{r.icon}</span>
              <span className="text-sm text-ink sm:text-base">{r.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <NeonButton onClick={onStart} className="text-base">
            ▸ ゲーム開始
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
