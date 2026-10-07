import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./engine-DYsQdUZV.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { t as Button } from "./button-1o6U2jBw.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-DxOVQ1Xc.js
var import_jsx_runtime = require_jsx_runtime();
function hourLabel(iso) {
	try {
		return new Date(iso).toLocaleTimeString("he-IL", {
			timeZone: "Asia/Jerusalem",
			hour: "2-digit",
			minute: "2-digit"
		});
	} catch {
		return "";
	}
}
function CalendarView() {
	const { meetings, confirmMeeting } = useNoaStore();
	const sorted = meetings.slice().sort((a, b) => a.targetDateIso.localeCompare(b.targetDateIso));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "משרדי סבן · החרש 10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "יומן ראמי"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "תזכורת וואטסאפ רבע שעה לפני. אישור פגישה משגר ללקוח כתובת המשרד ולא מתחייב בשם ראמי על חומרים."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-warn/30 bg-elevated",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "היום · רביעי 7.10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "09:00 פגישת עבודה במשרד — עודכנה ע״י ראמי. 10:00 פגישות ממתינות מתואמות מאתמול."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: sorted.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums leading-none",
							children: hourLabel(m.targetDateIso) || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "mt-2 text-base",
							children: m.requesterName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: m.meetingTimeText }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: m.phone
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: m.status === "scheduled" ? "ok" : "warn",
							children: m.status === "scheduled" ? "משובצת" : "ממתינה"
						}), m.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => confirmMeeting(m.id),
							children: "אשר פגישה"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "תזכורת 08:45 / רבע שעה לפני"
						})]
					})]
				}) }, m.id))
			})
		]
	});
}
var SplitComponent = CalendarView;
//#endregion
export { SplitComponent as component };
