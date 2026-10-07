import { i as __toESM } from "../_runtime.mjs";
import { X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CLIENTS, t as Badge } from "./engine-DYsQdUZV.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
import { t as Input } from "./input-DeMEkb3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-BrUyR0xM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientsView() {
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		if (!n) return CLIENTS;
		return CLIENTS.filter((c) => [
			c.name,
			c.customerNumber,
			c.defaultSite,
			c.contactPerson,
			c.zone,
			...c.aliases || [],
			...c.phones || []
		].join(" ").toLowerCase().includes(n));
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "מאגר קומקס פעיל"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "לקוחות ואתרים"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "חיפוש שם, מספר לקוח, רחוב או אזור"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs tabular-nums text-muted",
				children: [rows.length, " חשבונות"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
							"#",
							c.customerNumber,
							" · ",
							c.zone
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: c.preferredVehicle.includes("מנוף") ? "מנוף" : "קלה" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: c.defaultSite
					}),
					c.contactPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: c.contactPerson
					}) : null,
					c.phones?.filter((p) => p && !p.endsWith("0000")).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs tabular-nums text-muted",
						children: c.phones.filter((p) => !p.endsWith("0000")).join(" · ")
					}) : null,
					c.siteNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-subtle",
						children: c.siteNotes
					}) : null,
					c.commonBasket?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["סל טיפוסי: ", c.commonBasket.filter(Boolean).join(" · ")]
					}) : null
				] }, c.customerNumber + c.name))
			})
		]
	});
}
var SplitComponent = ClientsView;
//#endregion
export { SplitComponent as component };
