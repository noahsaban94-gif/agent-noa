import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNoaStore } from "@/lib/noa/store";
import type { InquiryKind } from "@/lib/noa/types";

const FILTERS: { id: InquiryKind | "all" | "open"; label: string }[] = [
  { id: "open", label: "מבצעי" },
  { id: "order", label: "הזמנות" },
  { id: "vip", label: "הראל" },
  { id: "meeting", label: "פגישות" },
  { id: "ops", label: "תפעול" },
  { id: "credit", label: "אשראי" },
  { id: "all", label: "הכל" },
];

const KIND_TONE: Record<InquiryKind, "mute" | "accent" | "ok" | "warn" | "danger" | "info"> = {
  order: "accent",
  vip: "danger",
  meeting: "warn",
  ops: "info",
  credit: "danger",
  driver: "ok",
  internal: "mute",
  noise: "mute",
  general: "mute",
};

const KIND_LABEL: Record<InquiryKind, string> = {
  order: "הזמנה",
  vip: "מנכ״ל",
  meeting: "פגישה",
  ops: "תפעול",
  credit: "אשראי",
  driver: "נהג",
  internal: "פנימי",
  noise: "רעש",
  general: "כללי",
};

const OPERATIONAL: InquiryKind[] = ["order", "vip", "meeting", "ops", "credit"];

export function InboxView() {
  const navigate = useNavigate();
  const { inquiries, markInquiryHandled } = useNoaStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("open");

  const rows = useMemo(() => {
    return inquiries
      .filter((i) => {
        if (filter === "open") return OPERATIONAL.includes(i.kind) && !i.handled;
        if (filter === "all") return true;
        return i.kind === filter;
      })
      .filter((i) => {
        if (!q.trim()) return true;
        const hay = `${i.customerName} ${i.site} ${i.details} ${i.phone}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .slice()
      .reverse();
  }, [inquiries, filter, q]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted">תיבת וואטסאפ</p>
        <h1 className="font-display text-4xl tracking-tight">פניות</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          רעש שיווקי מסונן. הזמנות, משימות הראל, אשראי ופגישות נשארות על השולחן.
        </p>
      </div>

      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש שם, אתר, מק״ט או טלפון" />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button key={f.id} size="sm" variant={filter === f.id ? "default" : "secondary"} onClick={() => setFilter(f.id)}>
            {f.label}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted tabular-nums">{rows.length} פניות</p>

      <div className="space-y-3">
        {rows.map((i) => (
          <Card key={i.id} className={i.handled ? "opacity-60" : undefined}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{i.customerName}</CardTitle>
                <CardMeta>
                  {i.displayTime} · {i.site}
                </CardMeta>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge tone={KIND_TONE[i.kind]}>{KIND_LABEL[i.kind]}</Badge>
                {i.urgency.includes("דחוף") ? <Badge tone="danger">דחוף</Badge> : null}
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">{i.details}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {i.kind === "order" ? (
                <Button
                  size="sm"
                  onClick={() =>
                    navigate({
                      to: "/parse",
                      search: { draft: i.details, name: i.customerName, phone: i.phone },
                    })
                  }
                >
                  פתח במפענח
                </Button>
              ) : null}
              {!i.handled ? (
                <Button size="sm" variant="secondary" onClick={() => markInquiryHandled(i.id)}>
                  סמן כטופל
                </Button>
              ) : (
                <Badge tone="ok">טופל</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
