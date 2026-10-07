import { Badge } from "@/components/ui/badge";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { useNoaStore } from "@/lib/noa/store";

export function FleetView() {
  const orders = useNoaStore((s) => s.orders.filter((o) => o.status !== "pending"));
  const hakmatLoad = orders.filter((o) => o.assignment.driver === "hakmat").reduce((s, o) => s + o.totalWeightTons, 0);
  const aliLoad = orders.filter((o) => o.assignment.driver === "ali").reduce((s, o) => s + o.totalWeightTons, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted">מוצא קבוע · החרש 10 הוד השרון</p>
        <h1 className="font-display text-4xl tracking-tight">צי ומחסנים</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted">615-41-002</p>
              <CardTitle>חכמת · מרצדס מנוף</CardTitle>
              <CardMeta>12 טון מורשה · מחסן 4</CardMeta>
            </div>
            <Badge tone={hakmatLoad > 12 ? "danger" : "ok"}>{hakmatLoad.toFixed(2)} טון היום</Badge>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">צריכה</dt>
              <dd className="tabular-nums">3.2 ק״מ/ל׳</dd>
            </div>
            <div>
              <dt className="text-muted">PTO לפריקה</dt>
              <dd className="tabular-nums">2.7 ל׳ · 35 דק׳</dd>
            </div>
            <div>
              <dt className="text-muted">מטען</dt>
              <dd>בלות, מלט, בלוקים, ברזל, מכולות</dd>
            </div>
            <div>
              <dt className="text-muted">מגבלת סבב</dt>
              <dd>עד 12 טון · עד 18 בלות</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted">651-51-701</p>
              <CardTitle>עלי · איסוזו פלטה</CardTitle>
              <CardMeta>5.5 טון · מחסן 1 · בלי מנוף</CardMeta>
            </div>
            <Badge tone="info">{aliLoad.toFixed(2)} טון היום</Badge>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">צריכה</dt>
              <dd className="tabular-nums">6.0 ק״מ/ל׳</dd>
            </div>
            <div>
              <dt className="text-muted">PTO</dt>
              <dd>אין</dd>
            </div>
            <div>
              <dt className="text-muted">מטען</dt>
              <dd>גבס, פרופילים, שקים בודדים עד 2 טון</dd>
            </div>
            <div>
              <dt className="text-muted">כוננות</dt>
              <dd>חלוקה קלה והשלמות</dd>
            </div>
          </dl>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-xs text-muted">מחסן כבד</p>
          <CardTitle>4 · החרש 10</CardTitle>
          <CardMeta>הוד השרון · אורן</CardMeta>
          <p className="mt-3 text-sm text-muted">
            אגרגטים בבלות ותפזורת, מלט, טיט, דבקים, בלוקים, ברזל ומכולות. מוצא למשאית מנוף חכמת ולרמסע.
          </p>
        </Card>
        <Card>
          <p className="text-xs text-muted">מחסן קל וגמר</p>
          <CardTitle>1 · התלמיד 6</CardTitle>
          <CardMeta>הוד השרון · תמיר ודורון</CardMeta>
          <p className="mt-3 text-sm text-muted">לוחות גבס, פרופילים, צבעים, שפכטל, בידוד, כלי עבודה ופרזול. מוצא לעלי.</p>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 font-display text-2xl">תמחור הובלה ממוצא החרש 10</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-elevated text-xs text-muted">
              <tr className="text-right">
                <th className="px-4 py-3 font-medium">אזור</th>
                <th className="px-4 py-3 font-medium">מנוף</th>
                <th className="px-4 py-3 font-medium">קלה</th>
                <th className="px-4 py-3 font-medium">ק״מ חורג</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["הוד השרון", "18050 · 280 ₪", "818050 · 200 ₪", "12 / 8 ₪"],
                ["כפר סבא–רעננה", "18055 · 320 ₪", "818055 · 230 ₪", "12 / 8 ₪"],
                ['הרצליה–רמה"ש', "18060 · 350 ₪", "818060 · 250 ₪", "12 / 8 ₪"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((c) => (
                    <td key={c} className="px-4 py-3 tabular-nums">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardTitle className="text-base">פקדונות 1:1</CardTitle>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>60002 בלה — יחס 1:1 על חול 11501, סומסום 11511, מצע 11540, טיט 11551, חמרה 11570</li>
            <li>60060 משטח סבן — כל 40 שקי מלט/דבק/טיח = משטח אחד</li>
            <li>60006 משטח בלוקים — כל 75 בלוקים 20/20/40 = משטח</li>
            <li>פטור: הובלה ללא פריקה 818050–818118</li>
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-base">מכולות ופרופילים</CardTitle>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>מכולת פסולת 8 קוב בלבד, מילוי עד קו דפנות. גישה פנויה לרמסע.</li>
            <li>אין החלפת מכולה בשישי אחרי 11:00</li>
            <li>חבילת ניצבים/מסלולים 0.6 = תמיד 10 יחידות</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
