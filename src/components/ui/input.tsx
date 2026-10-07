import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-line focus:ring-2 focus:ring-accent/30",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-md border border-border bg-elevated px-3 py-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-line focus:ring-2 focus:ring-accent/30",
        className,
      )}
      {...props}
    />
  );
}
