import "../_runtime.mjs";
import { X as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./engine-DYsQdUZV.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-elevated text-fg border border-border hover:border-line",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			danger: "bg-danger text-fg hover:bg-danger/90",
			ok: "bg-ok text-fg hover:bg-ok/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
