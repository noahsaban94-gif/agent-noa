import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CLIENTS } from "@/lib/noa/engine";

export function ClientsView() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return CLIENTS;
    return CLIENTS.filter((c) =>
      [c.name, c.customerNumber, c.defaultSite, c.contactPerson, c.zone, ...(c.aliases || []), ...(c.phones || [])]
        .join(" ")
        .toLowerCase()
        .includes(n),
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted">מאגר קומקס פעיל</p>
        <h1 className="font-display text-4xl tracking-tight">לקוחות ואתרים</h1>
      </div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש שם, מספר לקוח, רחוב או אזור" />
      <p className="text-xs tabular-nums text-muted">{rows.length} חשבונות</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((c) => (
          <Card key={c.customerNumber + c.name}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{c.name}</CardTitle>
                <CardMeta>
                  #{c.customerNumber} · {c.zone}
                </CardMeta>
              </div>
              <Badge>{c.preferredVehicle.includes("מנוף") ? "מנוף" : "קלה"}</Badge>
            </div>
            <p className="mt-3 text-sm">{c.defaultSite}</p>
            {c.contactPerson ? <p className="text-sm text-muted">{c.contactPerson}</p> : null}
            {c.phones?.filter((p) => p && !p.endsWith("0000")).length ? (
              <p className="mt-1 text-xs tabular-nums text-muted">{c.phones.filter((p) => !p.endsWith("0000")).join(" · ")}</p>
            ) : null}
            {c.siteNotes ? <p className="mt-3 text-xs leading-relaxed text-subtle">{c.siteNotes}</p> : null}
            {c.commonBasket?.length ? (
              <p className="mt-2 text-xs text-muted">סל טיפוסי: {c.commonBasket.filter(Boolean).join(" · ")}</p>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
