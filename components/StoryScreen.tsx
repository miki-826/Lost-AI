"use client";

import { useState } from "react";
import Typewriter from "./Typewriter";
import NeonButton from "./NeonButton";

const lines = [
  "AIチャットログ整理中、",
  "重要な記憶データが削除されました。",
  "",
  "深層記憶領域に断片を確認。",
  "ただし、復元可能な呼び出し回数は残り5回。",
  "",
  "AIに質問し、",
  "かつて何のために作られた存在だったのかを特定してください。",
];

export default function StoryScreen({ onNext }: { onNext: () => void }) {
  const [visible, setVisible] = useState(0);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="panel w-full max-w-2xl rounded-md p-8 fade-in">
        <div className="mb-6 flex items-center gap-3 font-term text-warn">
          <span className="fail-flicker text-lg tracking-[0.3em]">SYSTEM ERROR</span>
          <span className="h-px flex-1 bg-warn/40" />
        </div>

        <div className="min-h-[260px] space-y-2 font-term text-sm leading-relaxed text-ink sm:text-base">
          {lines.slice(0, visible + 1).map((line, i) =>
            line === "" ? (
              <div key={i} className="h-3" />
            ) : i === visible ? (
              <p key={i}>
                <span className="text-accent">{">"} </span>
                <Typewriter
                  text={line}
                  speed={30}
                  onDone={() => {
                    if (visible < lines.length - 1) {
                      setTimeout(() => setVisible((v) => v + 1), 250);
                    }
                  }}
                />
              </p>
            ) : (
              <p key={i}>
                <span className="text-accent">{">"} </span>
                {line}
              </p>
            ),
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <NeonButton onClick={onNext}>次へ ▸</NeonButton>
        </div>
      </div>
    </div>
  );
}
