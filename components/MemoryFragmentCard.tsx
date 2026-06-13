"use client";

export default function MemoryFragmentCard({ label }: { label: string }) {
  return (
    <div className="fade-in group relative inline-flex items-center gap-1 rounded border border-accent/40 bg-[rgba(0,217,255,0.06)] px-2.5 py-1 font-term text-xs text-glow transition-all hover:border-glow hover:bg-[rgba(0,217,255,0.14)] hover:shadow-glow">
      <span className="text-accent/70">◈</span>
      <span className="glow-text">{label}</span>
    </div>
  );
}
