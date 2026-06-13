"use client";

type Variant = "default" | "success" | "fail";

export default function NeonButton({
  children,
  onClick,
  disabled,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
}) {
  const colors: Record<Variant, string> = {
    default:
      "border-accent/60 text-ink hover:border-glow hover:shadow-glow-lg hover:text-glow",
    success:
      "border-success/60 text-success hover:border-success hover:shadow-[0_0_24px_rgba(56,248,200,0.6)]",
    fail: "border-fail/60 text-fail hover:border-fail hover:shadow-[0_0_24px_rgba(176,38,255,0.6)]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative rounded-md border bg-[rgba(10,20,35,0.7)] px-6 py-3 font-term tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${colors[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(91,231,255,0.12),transparent_70%)]" />
    </button>
  );
}
