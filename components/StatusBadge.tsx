"use client";

import { useEffect, useState } from "react";

type LinkState = "checking" | "online" | "offline";

const VIEW: Record<LinkState, { dot: string; text: string }> = {
  checking: { dot: "#8FA7B8", text: "記憶野へ接続中…" },
  online: { dot: "#38F8C8", text: "記憶野に接続できています" },
  offline: { dot: "#FF4D6D", text: "ローカル記憶のみで応答中" },
};

export default function StatusBadge() {
  const [state, setState] = useState<LinkState>("checking");

  useEffect(() => {
    let alive = true;
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setState(d.connected ? "online" : "offline");
      })
      .catch(() => {
        if (alive) setState("offline");
      });
    return () => {
      alive = false;
    };
  }, []);

  const v = VIEW[state];

  return (
    <div className="fixed bottom-3 left-3 z-[60] flex items-center gap-2 panel rounded-md px-3 py-1.5 font-term text-[10px] tracking-wide">
      <span
        className={`h-2 w-2 rounded-full ${state === "checking" ? "animate-pulse" : ""}`}
        style={{ background: v.dot, boxShadow: `0 0 8px ${v.dot}` }}
      />
      <span className="text-subink">DEEP MEMORY LINK</span>
      <span className="hidden sm:inline" style={{ color: v.dot }}>
        {v.text}
      </span>
    </div>
  );
}
