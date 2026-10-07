import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Radio, TriangleAlert, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { buildDispatchCard } from "@/lib/noa/engine";
import { useNoaStore } from "@/lib/noa/store";
import type { CommandMode, DispatchOrder } from "@/lib/noa/types";

function Kpi({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums leading-none tracking-tight">{value}</p>
      {hint ? <p className="mt-2 text-xs text-subtle">{hint}</p> : null}
    </Card>
  );
}

function OrderCard({ order, onApprove, onReject }: { order: DispatchOrder; onApprove?: () => void; onReject?: () => void }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base">{order.customerName}</CardTitle>
          <CardMeta>
            {order.address} · #{order.customerNumber}
          </CardMeta>
        </div>
        <div className="flex flex-col items-end gap-1">
          {order.urgency === "urgent" ? <Badge tone="danger">דחוף</Badge> : <Badge>רגילה</Badge>}
          {order.assignment.overload ? <Badge tone="danger">חריגת 12 טון</Badge> : null}
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        {order.items.slice(0, 5).map((it) => (
          <li key={it.sku} className="flex justify-between gap-3 text-fg">
            <span className="truncate">
              <span className="tabular-nums text-muted">{it.sku}</span> {it.name}
            </span>
            <span className="shrink-0 tabular-nums text-muted">
              {it.quantity} {it.unit}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 text-xs text-muted">
        <span>{order.assignment.driverLabel}</span>
        <span>·</span>
        <span>{order.assignment.warehouseLabel}</span>
        <span>·</span>
        <span className="tabular-nums">{order.totalWeightTons} טון</span>
        {order.deposits.bigBags > 0 ? <span>· {order.deposits.bigBags} פקדון בלה</span> : null}
        {order.deposits.pallets > 0 ? <span>· {order.deposits.pallets} משטחים</span> : null}
      </div>
      {onApprove ? (
        <div className="flex gap-2">
          <Button size="sm" variant="ok" onClick={onApprove} className="flex-1">
            <Check className="size-4" /> אשר · 1
          </Button>
          <Button size="sm" variant="ghost" onClick={onReject}>
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <p className="text-xs text-ok">שובץ לסידור · ליקוט {order.assignment.picker}</p>
      )}
    </Card>
  );
}

const MODES: { id: CommandMode; label: string }[] = [
  { id: "manual_on", label: "התחילי פיקוד" },
  { id: "manual_off", label: "סיימי פיקוד" },
  { id: "scheduled", label: "חזרי לשעות" },
];

export function CommandBoard() {
  const { commandMode, setCommandMode, orders, inquiries, meetings, approveOrder, rejectOrder } = useNoaStore();
  const pending = orders.filter((o) => o.status === "pending");
  const approved = orders.filter((o) => o.status === "approved" || o.status === "broadcast");
  const todayOrders = inquiries.filter((i) => i.kind === "order");
  const urgent = inquiries.filter((i) => i.urgency.includes("דחוף") && !i.handled);
  const nextMeeting = meetings
    .slice()
    .sort((a, b) => a.targetDateIso.localeCompare(b.targetDateIso))[0];

  const latestApproved = approved[0];
  const card = latestApproved
    ? buildDispatchCard({
        orderNumber: latestApproved.id.replace(/\D/g, "").slice(-4) || "6210",
        customerName: latestApproved.customerName,
        customerNumber: latestApproved.customerNumber,
        address: latestApproved.address,
        rawText: latestApproved.rawText,
        items: latestApproved.items,
        deposits: latestApproved.deposits,
        totalWeightTons: latestApproved.totalWeightTons,
        assignment: latestApproved.assignment,
      })
    : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">ח. סבן · 7.10.2026</p>
          <h1 className="mt-1 font-display text-4xl tracking-tight">לוח הסידור</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            נועה עובדת כסדרנית צל. ראמי מאשר בספרה 1 — ואז ההזמנה מוזרקת לגיליון ומשודרת לקבוצת עדכונים מהסידור.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <Button
              key={m.id}
              size="sm"
              variant={commandMode === m.id ? "default" : "secondary"}
              onClick={() => setCommandMode(m.id)}
            >
              {m.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="הזמנות בתיבה" value={todayOrders.length} hint="מתוך הפניות האחרונות" />
        <Kpi label="ממתינות לאישור" value={pending.length} hint="הקש 1 לשיבוץ" />
        <Kpi label="דחופות פתוחות" value={urgent.length} hint="כולל אורניל אביחיל" />
        <Kpi
          label="פגישה הבאה"
          value="09:00"
          hint={nextMeeting?.meetingTimeText ?? "אין ביומן"}
        />
      </div>

      {nextMeeting ? (
        <Card className="flex items-center gap-3 border-warn/30 bg-elevated">
          <Clock className="size-5 text-warn" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">פגישה היום במשרד · החרש 10</p>
            <p className="text-xs text-muted">{nextMeeting.meetingTimeText}</p>
          </div>
          <Link to="/calendar" className="text-xs text-accent">
            ליומן
          </Link>
        </Card>
      ) : null}

      {urgent.length > 0 ? (
        <Card className="flex items-start gap-3 border-danger/30">
          <TriangleAlert className="mt-0.5 size-5 text-danger" />
          <div>
            <p className="text-sm font-medium">דגש מבצעי</p>
            <p className="mt-1 text-sm text-muted">
              אורניל / אבי לוי — אספקה הועברה להיום. אין שיבוץ החלפת מכולה אחרי 11:00 בימי שישי. מול הראל בקבוצת הסידור — העברה לראמי בלבד, בלי מענה ישיר.
            </p>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">תור אישור ראמי</h2>
            <Badge tone="warn">{pending.length}</Badge>
          </div>
          {pending.length === 0 ? (
            <Card>
              <p className="text-sm text-muted">התור ריק. הכל משובץ בגיליון.</p>
            </Card>
          ) : (
            pending.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                onApprove={() => approveOrder(o.id)}
                onReject={() => rejectOrder(o.id)}
              />
            ))
          )}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">סידור מאושר</h2>
            <Link to="/parse" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
              מפענח הזמנה <ArrowLeft className="size-3.5" />
            </Link>
          </div>
          {approved.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
          {card ? (
            <Card className="bg-elevated">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                <Radio className="size-3.5" /> כרטיס לקבוצת עדכונים מהסידור
              </div>
              <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all font-sans text-xs leading-relaxed text-fg">{card}</pre>
            </Card>
          ) : null}
        </section>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <Card>
          <p className="text-xs text-muted">חכמת · 615-41-002</p>
          <CardTitle className="mt-1">מנוף 12 טון</CardTitle>
          <p className="mt-2 text-sm text-muted">מוצא מחסן 4 החרש 10 · אורן. מגבלת 12 טון לסבב. 3.2 ק״מ/ל׳ + 2.7 ל׳ PTO.</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">עלי · 651-51-701</p>
          <CardTitle className="mt-1">איסוזו 5.5 טון</CardTitle>
          <p className="mt-2 text-sm text-muted">מוצא מחסן 1 התלמיד 6 · תמיר/דורון. גבס, פרופילים, שקים עד 2 טון. 6.0 ק״מ/ל׳.</p>
        </Card>
      </section>
    </div>
  );
}
