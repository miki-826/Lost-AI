"use client";

import NeonButton from "./NeonButton";
import type { JudgeResult } from "@/types/game";

function rankColor(rank: string): string {
  switch (rank) {
    case "S":
      return "#38F8C8";
    case "A":
      return "#5BE7FF";
    case "B":
      return "#00D9FF";
    case "C":
      return "#FF4D6D";
    default:
      return "#B026FF";
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel rounded-md p-4">
      <div className="mb-2 font-term text-[11px] tracking-widest text-accent glow-text">
        {title}
      </div>
      {children}
    </div>
  );
}

export default function AnalysisScreen({
  result,
  onBackToTitle,
}: {
  result: JudgeResult;
  onBackToTitle: () => void;
}) {
  const rc = rankColor(result.rank);

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
      <div className="mb-6 text-center fade-in">
        <h2 className="font-title text-3xl tracking-widest text-glow glow-text">
          ANALYSIS REPORT
        </h2>
        <p className="font-term text-sm text-subink">総合評価</p>
      </div>

      {/* スコアパネル */}
      <div className="panel mb-4 grid grid-cols-1 gap-4 rounded-md p-6 sm:grid-cols-[1fr_auto] fade-in">
        <div className="space-y-3">
          <div>
            <div className="font-term text-[10px] text-subink">正体</div>
            <div className="text-lg text-ink glow-text">{result.trueIdentity}</div>
          </div>
          <div>
            <div className="font-term text-[10px] text-subink">あなたの回答</div>
            <div className="text-base text-glow">{result.playerGuess || "（未入力）"}</div>
          </div>
          <div className="flex gap-6 pt-2">
            <ScoreBar label="一致率" value={result.matchRate} color="#00D9FF" />
            <ScoreBar label="記憶回復率" value={result.memoryRecovery} color="#38F8C8" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="font-term text-[10px] tracking-widest text-subink">RANK</div>
          <div
            className="font-title text-7xl font-black leading-none"
            style={{ color: rc, textShadow: `0 0 24px ${rc}` }}
          >
            {result.rank}
          </div>
          <div
            className="mt-1 font-term text-xs"
            style={{ color: result.isSuccess ? "#38F8C8" : "#B026FF" }}
          >
            {result.isSuccess ? "MEMORY RESTORED" : "MEMORY LOST"}
          </div>
        </div>
      </div>

      <div className="space-y-4 fade-in">
        <Section title="良かった質問">
          <ul className="space-y-1 text-sm text-ink">
            {result.goodQuestions.map((q, i) => (
              <li key={i}>
                <span className="text-success">▸</span> {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="良かった言葉">
          <div className="flex flex-wrap gap-2">
            {result.goodWords.map((w, i) => (
              <span
                key={i}
                className="rounded border border-success/40 bg-[rgba(56,248,200,0.08)] px-2.5 py-1 font-term text-xs text-success"
              >
                {w}
              </span>
            ))}
          </div>
        </Section>

        {result.unnecessaryQuestions.length > 0 && (
          <Section title="必要なかった質問">
            <ul className="space-y-2 text-sm">
              {result.unnecessaryQuestions.map((u, i) => (
                <li key={i}>
                  <div className="text-warn">▸ {u.question}</div>
                  <div className="mt-0.5 font-term text-[11px] text-subink">{u.reason}</div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="改善アドバイス">
          <p className="text-sm leading-relaxed text-ink">{result.advice}</p>
        </Section>

        <Section title="その後のAI">
          <p className="text-sm leading-relaxed text-subink">{result.afterStory}</p>
        </Section>
      </div>

      <div className="mt-8 flex justify-center">
        <NeonButton onClick={onBackToTitle} className="text-base">
          ◂ タイトルへ戻る
        </NeonButton>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="min-w-[120px] flex-1">
      <div className="flex justify-between font-term text-[10px] text-subink">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="gauge-track mt-1 h-2 w-full rounded">
        <div
          className="h-full rounded transition-all duration-1000"
          style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}
