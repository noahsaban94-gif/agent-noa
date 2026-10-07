import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./engine-DYsQdUZV.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { t as Button } from "./button-1o6U2jBw.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
import { t as Input } from "./input-DeMEkb3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-Dz7UALEl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "open",
		label: "מבצעי"
	},
	{
		id: "order",
		label: "הזמנות"
	},
	{
		id: "vip",
		label: "הראל"
	},
	{
		id: "meeting",
		label: "פגישות"
	},
	{
		id: "ops",
		label: "תפעול"
	},
	{
		id: "credit",
		label: "אשראי"
	},
	{
		id: "all",
		label: "הכל"
	}
];
var KIND_TONE = {
	order: "accent",
	vip: "danger",
	meeting: "warn",
	ops: "info",
	credit: "danger",
	driver: "ok",
	internal: "mute",
	noise: "mute",
	general: "mute"
};
var KIND_LABEL = {
	order: "הזמנה",
	vip: "מנכ״ל",
	meeting: "פגישה",
	ops: "תפעול",
	credit: "אשראי",
	driver: "נהג",
	internal: "פנימי",
	noise: "רעש",
	general: "כללי"
};
var OPERATIONAL = [
	"order",
	"vip",
	"meeting",
	"ops",
	"credit"
];
function InboxView() {
	const navigate = useNavigate();
	const { inquiries, markInquiryHandled } = useNoaStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("open");
	const rows = (0, import_react.useMemo)(() => {
		return inquiries.filter((i) => {
			if (filter === "open") return OPERATIONAL.includes(i.kind) && !i.handled;
			if (filter === "all") return true;
			return i.kind === filter;
		}).filter((i) => {
			if (!q.trim()) return true;
			return `${i.customerName} ${i.site} ${i.details} ${i.phone}`.toLowerCase().includes(q.trim().toLowerCase());
		}).slice().reverse();
	}, [
		inquiries,
		filter,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "תיבת וואטסאפ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "פניות"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "רעש שיווקי מסונן. הזמנות, משימות הראל, אשראי ופגישות נשארות על השולחן."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "חיפוש שם, אתר, מק״ט או טלפון"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: filter === f.id ? "default" : "secondary",
					onClick: () => setFilter(f.id),
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted tabular-nums",
				children: [rows.length, " פניות"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: rows.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: i.handled ? "opacity-60" : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-base",
								children: i.customerName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
								i.displayTime,
								" · ",
								i.site
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: KIND_TONE[i.kind],
									children: KIND_LABEL[i.kind]
								}), i.urgency.includes("דחוף") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "danger",
									children: "דחוף"
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: i.details
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [i.kind === "order" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => navigate({
									to: "/parse",
									search: {
										draft: i.details,
										name: i.customerName,
										phone: i.phone
									}
								}),
								children: "פתח במפענח"
							}) : null, !i.handled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => markInquiryHandled(i.id),
								children: "סמן כטופל"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "ok",
								children: "טופל"
							})]
						})
					]
				}, i.id))
			})
		]
	});
}
var SplitComponent = InboxView;
//#endregion
export { SplitComponent as component };
