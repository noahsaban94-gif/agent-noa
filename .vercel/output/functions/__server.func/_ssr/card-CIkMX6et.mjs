import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as cn } from "./engine-DYsQdUZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CIkMX6et.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface p-4 shadow-soft", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function CardMeta({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted", className),
		...props
	});
}
//#endregion
export { CardMeta as n, CardTitle as r, Card as t };
