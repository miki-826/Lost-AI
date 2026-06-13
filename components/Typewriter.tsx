"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 35,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  const done = shown.length >= text.length;

  return (
    <span className={`${className} ${done ? "" : "caret"}`}>{shown}</span>
  );
}
