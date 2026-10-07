import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { useNoaStore } from "@/lib/noa/store";

function hourLabel(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("he-IL", {
      timeZone: "Asia/Jerusalem",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function CalendarView() {
  const { meetings, confirmMeeting } = useNoaStore();
  const sorted = meetings.slice().sort((a, b) => a.targetDateIso.localeCompare(b.targetDateIso));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-muted">משרדי סבן · החרש 10</p>
        <h1 className="font-display text-4xl tracking-tight">יומן ראמי</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          תזכורת וואטסאפ רבע שעה לפני. אישור פגישה משגר ללקוח כתובת המשרד ולא מתחייב בשם ראמי על חומרים.
        </p>
      </div>

      <Card className="border-warn/30 bg-elevated">
        <CardTitle className="text-base">היום · רביעי 7.10</CardTitle>
        <p className="mt-2 text-sm text-muted">09:00 פגישת עבודה במשרד — עודכנה ע״י ראמי. 10:00 פגישות ממתינות מתואמות מאתמול.</p>
      </Card>

      <div className="space-y-3">
        {sorted.map((m) => (
          <Card key={m.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-3xl tabular-nums leading-none">{hourLabel(m.targetDateIso) || "—"}</p>
                <CardTitle className="mt-2 text-base">{m.requesterName}</CardTitle>
                <CardMeta>{m.meetingTimeText}</CardMeta>
                <p className="mt-2 text-xs text-muted">{m.phone}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge tone={m.status === "scheduled" ? "ok" : "warn"}>
                  {m.status === "scheduled" ? "משובצת" : "ממתינה"}
                </Badge>
                {m.status === "pending" ? (
                  <Button size="sm" onClick={() => confirmMeeting(m.id)}>
                    אשר פגישה
                  </Button>
                ) : (
                  <p className="text-xs text-muted">תזכורת 08:45 / רבע שעה לפני</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
