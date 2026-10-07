import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useNoaStore } from "@/lib/noa/store";

export function KnowledgeView() {
  const { knowledge, addKnowledge, resetDemo } = useNoaStore();
  const [q, setQ] = useState("");
  const [note, setNote] = useState("");

  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return knowledge;
    return knowledge.filter((k) => `${k.category || ""} ${k.text} ${k.author}`.toLowerCase().includes(n));
  }, [knowledge, q]);

  const cats = Array.from(new Set(knowledge.map((k) => k.category).filter(Boolean))) as string[];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted">זיכרון מבצעי</p>
        <h1 className="font-display text-4xl tracking-tight">ידע DNA</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          מה שראמי אומר «תזכרי ש» נשמר כאן ומשפיע על שיבוץ, פקדונות ומענה ללקוחות.
        </p>
      </div>

      <Card>
        <CardTitle className="text-base">נועה, תזכרי ש…</CardTitle>
        <CardMeta className="mt-1">הוראה חדשה מראמי נכנסת מיד למאגר.</CardMeta>
        <Textarea className="mt-3 min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="למשל: אין לפרוק באתר ביל״ו אחרי 14:00" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            onClick={() => {
              addKnowledge(note);
              setNote("");
            }}
          >
            שמור בזיכרון
          </Button>
          <Button variant="ghost" onClick={resetDemo}>
            איפוס הדגמה
          </Button>
        </div>
      </Card>

      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש כלל, מחסן, נהג או פקדון" />

      {cats.length ? (
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <Button key={c} size="sm" variant="secondary" onClick={() => setQ(c)}>
              {c}
            </Button>
          ))}
        </div>
      ) : null}

      <div className="space-y-3">
        {rows.map((k) => (
          <Card key={k.id}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{k.id}</Badge>
              {k.category ? <Badge tone="accent">{k.category}</Badge> : null}
              <span className="text-xs text-muted">
                {k.author} · {new Date(k.timestamp).toLocaleDateString("he-IL")}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{k.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
