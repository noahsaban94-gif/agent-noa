import { useMemo, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import {
  assignResources,
  buildCustomerReply,
  buildDispatchCard,
  findDestination,
  identifyClient,
  isContainerOrder,
  isFridayContainerBlocked,
  parseAndNormalizeMaterials,
  quoteFreight,
} from "@/lib/noa/engine";
import { useNoaStore } from "@/lib/noa/store";
import type { DispatchOrder } from "@/lib/noa/types";

const SAMPLES = [
  "2 בלות חול ו-40 שק מלט אפור למוצקין 22 רעננה",
  "דחוף: 3 בלות חול, בלת סומסום ו-12 ניצבים 50/300 ללוחמי גליפולי 8 אביחיל",
  "מכולה 8 קוב לשמוליק סגל 4 תל אביב",
  "6 לוחות גבס לבן 280 ו-2 שפכטל אמריקאי להתלמיד, הוד השרון",
];

const parseRoute = getRouteApi("/parse");

export function ParserView() {
  const search = parseRoute.useSearch();
  const [text, setText] = useState(search.draft || SAMPLES[0]);
  const [name, setName] = useState(search.name || "");
  const [phone, setPhone] = useState(search.phone || "");
  const enqueueOrder = useNoaStore((s) => s.enqueueOrder);
  const nextId = useNoaStore((s) => s.nextInquiryId);
  const [copied, setCopied] = useState<"card" | "reply" | null>(null);
  const [queued, setQueued] = useState(false);

  const result = useMemo(() => {
    const normalized = parseAndNormalizeMaterials(text);
    const client = identifyClient(text, phone, name);
    const assignment = assignResources(text, normalized);
    const dest = findDestination(client.projectSite, client.customerNumber);
    const freight = quoteFreight(client.projectSite, assignment, dest);
    const container = isContainerOrder(text);
    const fridayBlock = container && isFridayContainerBlocked();
    const card = buildDispatchCard({
      orderNumber: String(6200 + nextId),
      customerName: client.customerName,
      customerNumber: client.customerNumber,
      address: client.projectSite,
      rawText: text,
      items: normalized.items,
      deposits: normalized.deposits,
      totalWeightTons: normalized.totalWeightTons,
      assignment,
    });
    const reply = buildCustomerReply(client, nextId, normalized);
    return { normalized, client, assignment, dest, freight, container, fridayBlock, card, reply };
  }, [text, name, phone, nextId]);

  function queue() {
    const order: DispatchOrder = {
      id: "ord-" + Date.now(),
      createdAt: new Date().toISOString(),
      customerName: result.client.customerName,
      customerNumber: result.client.customerNumber,
      phone,
      address: result.client.projectSite,
      rawText: text,
      items: result.normalized.items,
      deposits: result.normalized.deposits,
      totalWeightTons: result.normalized.totalWeightTons,
      assignment: result.assignment,
      freight: result.freight,
      source: "parser",
      status: "pending",
      urgency: /דחוף/.test(text) ? "urgent" : "normal",
      notes: result.client.siteNotes || "",
    };
    enqueueOrder(order);
    setQueued(true);
    setTimeout(() => setQueued(false), 1800);
  }

  async function copy(which: "card" | "reply") {
    const value = which === "card" ? result.card : result.reply;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* ignore */
    }
  }

  const { normalized, client, assignment, dest, freight } = result;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted">וואטסאפ ⇄ קומקס ⇄ מילון</p>
        <h1 className="font-display text-4xl tracking-tight">מפענח הזמנות</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          הדביקו הודעת לקוח. נועה מנרמלת מק״טים, פקדונות 1:1, שיבוץ נהג ומחסן, וכרטיס לקבוצת הסידור.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s) => (
          <Button key={s} size="sm" variant="secondary" onClick={() => setText(s)}>
            {s.slice(0, 28)}…
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="שם שולח (אופציונלי)" />
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="טלפון (אופציונלי)" />
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="הודעת וואטסאפ חופשית…" />

      <div className="flex flex-wrap gap-2">
        <Button onClick={queue}>{queued ? "נשלח לתור ראמי" : "שלח לאישור ראמי"}</Button>
        <Button variant="secondary" onClick={() => copy("card")}>
          {copied === "card" ? "הועתק" : "העתק כרטיס שידור"}
        </Button>
        <Button variant="ghost" onClick={() => copy("reply")}>
          {copied === "reply" ? "הועתק" : "העתק מענה ללקוח"}
        </Button>
      </div>

      {result.fridayBlock ? (
        <Card className="border-danger/40">
          <p className="text-sm text-danger">אין לשבץ החלפת מכולה בימי שישי אחרי 11:00.</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-xs text-muted">חשבון</p>
          <CardTitle className="mt-1">{client.customerName}</CardTitle>
          <CardMeta>
            #{client.customerNumber} · {client.projectSite}
          </CardMeta>
          {client.contactPerson ? <p className="mt-2 text-sm">איש קשר: {client.contactPerson}</p> : null}
          {client.siteNotes ? <p className="mt-2 text-sm text-muted">{client.siteNotes}</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {client.isKnown ? <Badge tone="ok">לקוח מוכר</Badge> : <Badge tone="warn">טרם שויך</Badge>}
            {result.container ? <Badge tone="info">מכולה 8 קוב</Badge> : null}
          </div>
        </Card>

        <Card>
          <p className="text-xs text-muted">שיבוץ</p>
          <CardTitle className="mt-1">{assignment.driverLabel}</CardTitle>
          <CardMeta>
            {assignment.warehouseLabel} · ליקוט {assignment.picker}
          </CardMeta>
          <p className="mt-3 text-sm">
            הובלה {freight.sku} · {freight.name}
          </p>
          <p className="text-sm tabular-nums text-muted">
            {freight.totalIls} ₪
            {freight.extraKm ? ` (בסיס ${freight.baseIls} + ${freight.extraKm} ק״מ)` : ""}
          </p>
          {dest ? (
            <p className="mt-2 text-xs text-muted">
              {dest.distanceKm} ק״מ · מנוף {dest.craneUnloadMin} דק׳ · פלטה {dest.flatbedUnloadMin} דק׳
            </p>
          ) : null}
          {assignment.overload ? <Badge tone="danger" className="mt-3">חריגת עומס חכמת</Badge> : null}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <CardTitle>נרמול חומרים</CardTitle>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge tone="accent">{normalized.totalWeightTons} טון</Badge>
            <Badge>{normalized.deposits.bigBags} בלות 60002</Badge>
            <Badge>{normalized.deposits.woodPallets} משטח סבן 60060</Badge>
            {normalized.deposits.blockPallets > 0 ? (
              <Badge>{normalized.deposits.blockPallets} משטח בלוקים 60006</Badge>
            ) : null}
          </div>
        </div>
        {normalized.items.length === 0 ? (
          <p className="text-sm text-muted">לא זוהו מק״טים. נועה תבקש מהלקוח אתר וכמויות.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted">
                <tr className="border-b border-border text-right">
                  <th className="py-2 font-medium">מק״ט</th>
                  <th className="py-2 font-medium">פריט</th>
                  <th className="py-2 font-medium">כמות</th>
                  <th className="py-2 font-medium">משקל</th>
                </tr>
              </thead>
              <tbody>
                {normalized.items.map((it) => (
                  <tr key={it.sku} className="border-b border-border/70">
                    <td className="py-2 tabular-nums text-muted">{it.sku}</td>
                    <td className="py-2">{it.name}</td>
                    <td className="py-2 tabular-nums">
                      {it.quantity} {it.unit}
                    </td>
                    <td className="py-2 tabular-nums text-muted">{it.weightTon} ט׳</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-elevated">
          <p className="mb-2 text-xs text-muted">כרטיס שידור לקבוצה</p>
          <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all font-sans text-xs leading-relaxed">{result.card}</pre>
        </Card>
        <Card className="bg-elevated">
          <p className="mb-2 text-xs text-muted">מענה ללקוח — בלי התחייבות למחיר או מועד</p>
          <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all font-sans text-sm leading-relaxed">{result.reply}</pre>
        </Card>
      </div>
    </div>
  );
}
