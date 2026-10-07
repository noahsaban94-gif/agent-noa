import { cn } from "@/lib/utils";

const tones = {
  mute: "bg-elevated text-muted border-border",
  accent: "bg-accent/15 text-accent border-accent/25",
  ok: "bg-ok/15 text-ok border-ok/25",
  warn: "bg-warn/15 text-warn border-warn/25",
  danger: "bg-danger/15 text-danger border-danger/25",
  info: "bg-info/15 text-info border-info/25",
} as const;

export function Badge({
  className,
  tone = "mute",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
