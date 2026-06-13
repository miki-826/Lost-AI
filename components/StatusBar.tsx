"use client";

function Gauge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-[110px]">
      <div className="flex justify-between font-term text-[10px] text-subink">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="gauge-track h-1.5 w-full rounded">
        <div
          className="h-full rounded transition-all duration-700"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function StatusBar({
  remaining,
  noise,
  stability,
}: {
  remaining: number;
  noise: number;
  stability: number;
}) {
  return (
    <div className="panel flex flex-wrap items-center justify-between gap-4 rounded-md px-4 py-2.5">
      <div className="flex items-center gap-3">
        <span className="font-title text-lg tracking-widest text-glow glow-text">
          Lost<span className="text-accent">AI</span>
        </span>
        <span className="font-term text-[11px] text-subink">
          残り呼び出し{" "}
          <span className="text-warn glow-text text-sm">{remaining}</span>
          <span className="text-subink"> / 5</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Gauge label="記憶ノイズ" value={noise} color="#FF4D6D" />
        <Gauge label="記憶安定率" value={stability} color="#38F8C8" />
      </div>
    </div>
  );
}
