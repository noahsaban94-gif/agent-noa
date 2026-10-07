import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as cn } from "./engine-DYsQdUZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DeMEkb3Q.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-line focus:ring-2 focus:ring-accent/30", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-36 w-full rounded-md border border-border bg-elevated px-3 py-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-line focus:ring-2 focus:ring-accent/30", className),
		...props
	});
}
//#endregion
export { Textarea as n, Input as t };
