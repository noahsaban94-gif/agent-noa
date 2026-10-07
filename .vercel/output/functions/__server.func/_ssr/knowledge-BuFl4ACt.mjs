import { i as __toESM } from "../_runtime.mjs";
import { X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./engine-DYsQdUZV.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { t as Button } from "./button-1o6U2jBw.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
import { n as Textarea, t as Input } from "./input-DeMEkb3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-BuFl4ACt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KnowledgeView() {
	const { knowledge, addKnowledge, resetDemo } = useNoaStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		if (!n) return knowledge;
		return knowledge.filter((k) => `${k.category || ""} ${k.text} ${k.author}`.toLowerCase().includes(n));
	}, [knowledge, q]);
	const cats = Array.from(new Set(knowledge.map((k) => k.category).filter(Boolean)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "זיכרון מבצעי"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "ידע DNA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "מה שראמי אומר «תזכרי ש» נשמר כאן ומשפיע על שיבוץ, פקדונות ומענה ללקוחות."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "נועה, תזכרי ש…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-1",
					children: "הוראה חדשה מראמי נכנסת מיד למאגר."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3 min-h-24",
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "למשל: אין לפרוק באתר ביל״ו אחרי 14:00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							addKnowledge(note);
							setNote("");
						},
						children: "שמור בזיכרון"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: resetDemo,
						children: "איפוס הדגמה"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "חיפוש כלל, מחסן, נהג או פקדון"
			}),
			cats.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => setQ(c),
					children: c
				}, c))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: rows.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: k.id }),
						k.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: k.category
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								k.author,
								" · ",
								new Date(k.timestamp).toLocaleDateString("he-IL")
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed",
					children: k.text
				})] }, k.id))
			})
		]
	});
}
var SplitComponent = KnowledgeView;
//#endregion
export { SplitComponent as component };
