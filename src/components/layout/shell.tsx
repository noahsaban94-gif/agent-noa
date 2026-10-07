import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Inbox,
  LayoutDashboard,
  ScanLine,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNoaStore } from "@/lib/noa/store";

const NAV = [
  { to: "/", label: "לוח פיקוד", icon: LayoutDashboard },
  { to: "/inbox", label: "פניות", icon: Inbox },
  { to: "/parse", label: "מפענח", icon: ScanLine },
  { to: "/fleet", label: "צי ומחסנים", icon: Truck },
  { to: "/clients", label: "לקוחות", icon: Users },
  { to: "/knowledge", label: "ידע DNA", icon: BookOpen },
  { to: "/calendar", label: "יומן", icon: Calendar },
] as const;

function jerusalemNow() {
  return new Date().toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const commandMode = useNoaStore((s) => s.commandMode);
  const pending = useNoaStore((s) => s.orders.filter((o) => o.status === "pending").length);
  const [clock, setClock] = useState(jerusalemNow);

  useEffect(() => {
    const t = setInterval(() => setClock(jerusalemNow()), 15_000);
    return () => clearInterval(t);
  }, []);

  const modeLabel =
    commandMode === "manual_on" ? "פיקוד פעיל" : commandMode === "scheduled" ? "לפי שעות" : "סדרנית צל";
  const modeTone = commandMode === "manual_on" ? "ok" : commandMode === "scheduled" ? "warn" : "mute";

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg" dir="rtl">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-elevated font-display text-lg text-accent">
              נ
            </div>
            <div className="min-w-0">
              <p className="font-display text-xl leading-tight tracking-tight">נועה</p>
              <p className="truncate text-xs text-muted">מרכז הסידור · ח. סבן חומרי בניין</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <Link to="/knowledge" className="flex size-11 items-center justify-center rounded-md text-muted hover:text-fg">
              <BookOpen className="size-5" />
            </Link>
            <Link to="/calendar" className="flex size-11 items-center justify-center rounded-md text-muted hover:text-fg">
              <Calendar className="size-5" />
            </Link>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="tabular-nums text-xs text-muted">{clock}</span>
            <Badge tone={modeTone}>{modeLabel}</Badge>
            {pending > 0 ? <Badge tone="warn">{pending} לאישור</Badge> : null}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] w-52 shrink-0 border-l border-border p-3 md:block">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors",
                    active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                  {item.to === "/inbox" && pending > 0 ? (
                    <span className="ms-auto tabular-nums text-xs text-warn">{pending}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <p className="mt-6 px-3 text-[11px] leading-relaxed text-subtle">
            ראמי מסארווה · ורד והראל אידלסון
            <br />
            החרש 10, הוד השרון
          </p>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 pb-24 md:pb-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5">
          {NAV.slice(0, 5).map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[11px]",
                  active ? "text-fg" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
