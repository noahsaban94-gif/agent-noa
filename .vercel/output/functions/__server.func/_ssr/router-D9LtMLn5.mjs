import { i as __toESM } from "../_runtime.mjs";
import { C as useRouter, X as require_jsx_runtime, Y as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as Link, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as identifyClient, d as parseAndNormalizeMaterials, f as quoteFreight, o as cn, r as assignResources, s as findDestination, t as Badge } from "./engine-DYsQdUZV.mjs";
import { a as ScanLine, c as Inbox, d as Calendar, f as BookOpen, i as TriangleAlert, n as Users, r as Truck, s as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D9LtMLn5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var inquiries_default = /*#__PURE__*/ JSON.parse("[{\"id\":1,\"timestamp\":\"2026-10-06T05:20:54.022Z\",\"displayTime\":\"6.10.2026, 8:20:54\",\"customerName\":\"לקוח בבדיקת סימולציה (לא צוין שם בטקסט)\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: בוקר טוב ראמי\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":2,\"timestamp\":\"2026-10-06T05:30:04.021Z\",\"displayTime\":\"6.10.2026, 8:30:04\",\"customerName\":\"הראל אידלסון\",\"phone\":\"261572232536250\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: בוקר טוב ,\xA0\\nנמצא בבית משפט , זמינות חלקית ב Whatsapp\\n\\n\\nsent via JONI\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"vip\"},{\"id\":3,\"timestamp\":\"2026-10-06T05:33:47.626Z\",\"displayTime\":\"6.10.2026, 8:33:47\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: בוקר טוב מהראל המנכל, תמסרי לראמי לבדוק מכולות\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"ops\"},{\"id\":4,\"timestamp\":\"2026-10-06T05:40:46.234Z\",\"displayTime\":\"6.10.2026, 8:40:46\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: תעבירי משימה דחופה לראמי, לטפל בסטטוס תעודות בבירור .\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"ops\"},{\"id\":5,\"timestamp\":\"2026-10-06T05:46:48.949Z\",\"displayTime\":\"6.10.2026, 8:46:48\",\"customerName\":\"אלנבי על הים\",\"phone\":\"140901368230048\",\"site\":\"שמוליק סגל 4, תל אביב\",\"details\":\"1. מק\\\"ט 10011 | בטון מוכן 25 ק\\\"ג × 10 שק (0.25 טון)\\n2. מק\\\"ט 15107 | סיקה טופ 107 איטום דו-רכיבי × 3 שק/סט (0.08 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":6,\"timestamp\":\"2026-10-06T05:49:07.265Z\",\"displayTime\":\"6.10.2026, 8:49:07\",\"customerName\":\"נתנאל אסטריכר\",\"phone\":\"269526495178940\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: *היי קלוד, אני רוצה להגיע למקום הראשון בגוגל...*\\n\\nhttps://www.instagram.com/reel/DeJC_Rht5PH/?stkn=OGRiejZnOXR4OHJy\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":7,\"timestamp\":\"2026-10-06T05:49:54.689Z\",\"displayTime\":\"6.10.2026, 8:49:54\",\"customerName\":\"נתנאל אסטריכר\",\"phone\":\"269526495178940\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: *היי קלוד, אני רוצה להגיע למקום הראשון בגוגל...*\\n\\nhttps://www.instagram.com/reel/DeJEYpBIIAf/?stkn=aGRsbWt4YXI0cjU2\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":8,\"timestamp\":\"2026-10-06T05:52:30.411Z\",\"displayTime\":\"6.10.2026, 8:52:30\",\"customerName\":\"אלנבי על הים\",\"phone\":\"140901368230048\",\"site\":\"שמוליק סגל 4, תל אביב\",\"details\":\"1. מק\\\"ט 10011 | בטון מוכן 25 ק\\\"ג × 10 שק (0.25 טון)\\n2. מק\\\"ט 15107 | סיקה טופ 107 איטום דו-רכיבי × 3 שק/סט (0.08 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":9,\"timestamp\":\"2026-10-06T05:53:51.386Z\",\"displayTime\":\"6.10.2026, 8:53:51\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: בוקר טוב ראמי זמין?\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":10,\"timestamp\":\"2026-10-06T05:54:49.743Z\",\"displayTime\":\"6.10.2026, 8:54:49\",\"customerName\":\"לקוח אתר מחר ב 09\",\"phone\":\"140901368230048\",\"site\":\"מחר ב 09\",\"details\":\"פנייה כללית: ניתן לקבוע פגישה עם ראמי ,למחר ב 09:00?\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":11,\"timestamp\":\"2026-10-06T06:12:18.513Z\",\"displayTime\":\"6.10.2026, 9:12:18\",\"customerName\":\"נועה\",\"phone\":\"נשלח ללא מספר נייד\",\"site\":\"משרדי סבן - פגישה\",\"details\":\"בקשת פגישה: מחר (יום רביעי, 7.10) בשעה 10:00\",\"urgency\":\"תיאום פגישה\",\"status\":\"הועבר לראמי\",\"kind\":\"meeting\"},{\"id\":12,\"timestamp\":\"2026-10-06T07:30:52.656Z\",\"displayTime\":\"6.10.2026, 10:30:52\",\"customerName\":\"שי ראובן\",\"phone\":\"53231992483982\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: BEGIN:VCARD\\nVERSION:3.0\\nN:;מלי של קובוש;;;\\nFN:מלי של קובוש\\nTEL;type=CELL;type=VOICE;waid=972505379652:+972 50-537-9652\\nEND:VCARD\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":13,\"timestamp\":\"2026-10-06T07:30:58.434Z\",\"displayTime\":\"6.10.2026, 10:30:58\",\"customerName\":\"שי ראובן\",\"phone\":\"53231992483982\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: תקשר אליה בבקשה\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":14,\"timestamp\":\"2026-10-06T07:43:43.928Z\",\"displayTime\":\"6.10.2026, 10:43:43\",\"customerName\":\"ראמי\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: תשלחי מייל לראמי היי בוקר טוב\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":15,\"timestamp\":\"2026-10-06T07:44:09.402Z\",\"displayTime\":\"6.10.2026, 10:44:09\",\"customerName\":\"ראמי\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: השב :סבבה\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":16,\"timestamp\":\"2026-10-06T07:45:00.934Z\",\"displayTime\":\"6.10.2026, 10:45:00\",\"customerName\":\"נועה\",\"phone\":\"נשלח ללא מספר נייד\",\"site\":\"משרדי סבן - פגישה\",\"details\":\"בקשת פגישה: מחר (יום רביעי, 7.10) בשעה 10:00\",\"urgency\":\"תיאום פגישה\",\"status\":\"הועבר לראמי\",\"kind\":\"meeting\"},{\"id\":17,\"timestamp\":\"2026-10-06T07:46:24.915Z\",\"displayTime\":\"6.10.2026, 10:46:24\",\"customerName\":\"נועה\",\"phone\":\"נשלח ללא מספר נייד\",\"site\":\"משרדי סבן - פגישה\",\"details\":\"בקשת פגישה: מחר (יום רביעי, 7.10) בשעה 09:00\",\"urgency\":\"תיאום פגישה\",\"status\":\"הועבר לראמי\",\"kind\":\"meeting\"},{\"id\":18,\"timestamp\":\"2026-10-06T07:50:55.286Z\",\"displayTime\":\"6.10.2026, 10:50:55\",\"customerName\":\"עלי אבו עיאדה\",\"phone\":\"148305942208684\",\"site\":\"אגיע אל 10\",\"details\":\"פנייה כללית: אגיע אל 10:59 AM בשעה אוסטשינסקי 5, כפר סבא. אפשר לעקוב אחר הנסיעה שלי ב-‏Waze: https://www.waze.com/ul?a=sd3&token=0oWNwoCiVpNOd6jaBHgr&min_version=5.24\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"driver\"},{\"id\":19,\"timestamp\":\"2026-10-06T08:04:12.468Z\",\"displayTime\":\"6.10.2026, 11:04:12\",\"customerName\":\"ראמי\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: השב\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":20,\"timestamp\":\"2026-10-06T08:06:49.974Z\",\"displayTime\":\"6.10.2026, 11:06:49\",\"customerName\":\"מירון\",\"phone\":\"972546969051\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: Attachment type: image\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":21,\"timestamp\":\"2026-10-06T08:06:52.103Z\",\"displayTime\":\"6.10.2026, 11:06:52\",\"customerName\":\"ח.סבן חומרי בנין 1994 בעמ\",\"phone\":\"8105291153497\",\"site\":\"מחזיר עם הנהג חבילה ג'מבו 5\",\"details\":\"פנייה כללית: מחזיר עם הנהג חבילה ג'מבו 5/16 שלקחתי שלשום\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":22,\"timestamp\":\"2026-10-06T08:07:59.558Z\",\"displayTime\":\"6.10.2026, 11:07:59\",\"customerName\":\"לא\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: חשוב לבצע ספירה לכמות אם אריזה לא סגורה\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":23,\"timestamp\":\"2026-10-06T08:09:18.590Z\",\"displayTime\":\"6.10.2026, 11:09:18\",\"customerName\":\"חרש\",\"phone\":\"134411119009926\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: צפי לשבוע הבא (ראשון)/גולדה בוקר אור\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":24,\"timestamp\":\"2026-10-06T08:17:30.040Z\",\"displayTime\":\"6.10.2026, 11:17:30\",\"customerName\":\"Tz\",\"phone\":\"103736613548172\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: לתשומת ליבכם❤️\\n*אימון הזומבה שנקבע לימי שלישי בשעה 17:30 לא יתקיים עד להודעה חדשה*\\nמחכים לכם בשאר תרגולי הכושר שלנו 🏃🏻‍♀️💪🏻\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":25,\"timestamp\":\"2026-10-06T08:19:22.615Z\",\"displayTime\":\"6.10.2026, 11:19:22\",\"customerName\":\"עלי אבו עיאדה\",\"phone\":\"148305942208684\",\"site\":\"אגיע אל 11\",\"details\":\"פנייה כללית: אגיע אל 11:31 AM בשעה מגיני נגבה 4, הרצליה. אפשר לעקוב אחר הנסיעה שלי ב-‏Waze: https://www.waze.com/ul?a=sd3&token=79Of2HRFhj0Pauo4ku0Z&min_version=5.24\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"driver\"},{\"id\":26,\"timestamp\":\"2026-10-06T08:54:35.242Z\",\"displayTime\":\"6.10.2026, 11:54:35\",\"customerName\":\"זבולון-עדירן (אתר ביל\\\"ו)\",\"phone\":\"972525354552\",\"site\":\"ביל\\\"ו undefined, תל אביב\",\"details\":\"1. מק\\\"ט 112200 | לוח גבס ירוק 200 ע 12.50 × 2 לוח (0.05 טון)\\n2. מק\\\"ט 48107 | מטר 5 גומי רחב אדום × 2 יח' (0 טון)\\n3. מק\\\"ט 48107 | מטר 5 גומי רחב אדום × 40 יח' (0.04 טון)\\n4. מק\\\"ט 11500 | חול שק 25 ק\\\"ג × 2 שק (0.05 טון)\\n5. מק\\\"ט 48107 | מטר 5 גומי רחב אדום × 25 יח' (0.03 טון)\\n6. מק\\\"ט 35010 | שפכטל אמריקאי 28 ק\\\"ג × 2 שק (0.06 טון)\\n7. מק\\\"ט 740710 | בוקסה מגנטית 10 מ\\\"מ (ביט איסכורית) × 1 יח' (0 טון)\\n8. מק\\\"ט 48107 | מטר 5 גומי רחב אדום × 1 יח' (0 טון)\\n9. מק\\\"ט 10002 | מלט אפור 25 ק\\\"ג נשר × 40 שק (1 טון)\\n10. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 603 שק (15.08 טון)\\n11. מק\\\"ט 11500 | חול שק 25 ק\\\"ג × 2 שק (0.05 טון)\\n12. מק\\\"ט 11500 | חול שק 25 ק\\\"ג × 2 שק (0.05 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":27,\"timestamp\":\"2026-10-06T08:54:35.277Z\",\"displayTime\":\"6.10.2026, 11:54:35\",\"customerName\":\"תחסין אורניל ניהול\",\"phone\":\"972525354552\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: New client at id: 7\\n\\n👤 תחסין אורניל ניהול\\n📱 +972525354552\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":28,\"timestamp\":\"2026-10-06T08:56:37.661Z\",\"displayTime\":\"6.10.2026, 11:56:37\",\"customerName\":\"תחסין אורניל ניהול\",\"phone\":\"972525354552\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 1 שק (0.03 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":29,\"timestamp\":\"2026-10-06T08:58:47.946Z\",\"displayTime\":\"6.10.2026, 11:58:47\",\"customerName\":\"תחסין אורניל ניהול\",\"phone\":\"972525354552\",\"site\":\"דינטי  לוחמי גלופולי 8, אביחיל\",\"details\":\"1. מק\\\"ט 11501 | חול שק גדול (בלה) × 1 בלה (0.75 טון)\\n2. מק\\\"ט 15107 | סיקה טופ 107 איטום דו-רכיבי × 2 שק/סט (0.05 טון)\\n3. מק\\\"ט 740710 | בוקסה מגנטית 10 מ\\\"מ (ביט איסכורית) × 5 יח' (0.01 טון)\\n4. מק\\\"ט 35010 | שפכטל אמריקאי 28 ק\\\"ג × 6 שק (0.17 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":30,\"timestamp\":\"2026-10-06T09:02:05.178Z\",\"displayTime\":\"6.10.2026, 12:02:05\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: לקוח חסום ! יתרת אשראי   -39,178.67 ערוגות הבשם\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"credit\"},{\"id\":31,\"timestamp\":\"2026-10-06T09:03:07.025Z\",\"displayTime\":\"6.10.2026, 12:03:07\",\"customerName\":\"נתנאל אסטריכר\",\"phone\":\"269526495178940\",\"site\":\"מעל 3, ג'יגה של קבצים\",\"details\":\"פנייה כללית: פוסט קצת שונה מבדרך כלל אבל מעניין לא פחות 😊\\n\\nהתחדשתי בסביבת עבודה חדשה מבית Furniqil. זה לא סתם שולחן אלא מערכת שלמה של שולחן חשמלי, נורות לד, זורועות למסך ואפילו הליכון קומפקטי ומקצועי במיוחד למשרד!\\n\\nבקרוב אעלה לכם את הסרטון שיצרתי עבור החברה אבל מה שאני רוצה שתדעו שלקח לי שעה וחצי של צילומים, מעל 3 ג'יגה של קבצים, ובסוף העריכה עצמה לקחה ממש כמה דקות כי את כל העבודה הזאת עשה קלוד קוד.\\n\\nבאמת שלא נגעתי בכלום (גם הקריינות היא שכפול של הקול שלי)\\nאז תעקבו כדי לראות את הסרטון UGC שלי בקרוב!\\n\\nאה ויש קוד קופון בסטורי שלי ל10% הנחה למי שרוצה גם..\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":32,\"timestamp\":\"2026-10-06T10:07:35.972Z\",\"displayTime\":\"6.10.2026, 13:07:35\",\"customerName\":\"אורניל / אבי לוי\",\"phone\":\"972545998111\",\"site\":\"לוחמי גליפולי 8, אביחיל\",\"details\":\"1. מק\\\"ט 9650300 | ניצב 0.6 50/300 × 12 יח' (0.04 טון)\\n2. מק\\\"ט 11500 | חול שק 25 ק\\\"ג × 2 שק (0.05 טון)\\n3. מק\\\"ט 11501 | חול שק גדול (בלה) × 3 בלה (2.25 טון)\\n4. מק\\\"ט 11511 | סומסום שק גדול (בלה) × 1 בלה (0.73 טון)\",\"urgency\":\"דחופה ⚡\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":33,\"timestamp\":\"2026-10-06T10:07:37.349Z\",\"displayTime\":\"6.10.2026, 13:07:37\",\"customerName\":\"אורניל / אבי לוי\",\"phone\":\"972545998111\",\"site\":\"לוחמי גליפולי 8, אביחיל\",\"details\":\"פנייה כללית: New client at id: 8\\n\\n👤 בר אורן אורניל ניהול\\n📱 +972545998111\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":34,\"timestamp\":\"2026-10-06T10:07:46.479Z\",\"displayTime\":\"6.10.2026, 13:07:46\",\"customerName\":\"אורניל / אבי לוי\",\"phone\":\"972545998111\",\"site\":\"לוחמי גליפולי 8, אביחיל\",\"details\":\"פנייה כללית: לאבי לוי סטרומה 4 הרצליה\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":35,\"timestamp\":\"2026-10-06T10:23:15.446Z\",\"displayTime\":\"6.10.2026, 13:23:15\",\"customerName\":\"אלון\",\"phone\":\"79779101446165\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 11501 | חול שק גדול (בלה) × 1 בלה (0.75 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":36,\"timestamp\":\"2026-10-06T10:36:46.545Z\",\"displayTime\":\"6.10.2026, 13:36:46\",\"customerName\":\"הראל אידלסון\",\"phone\":\"261572232536250\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: זה כבר זלזול\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"vip\"},{\"id\":37,\"timestamp\":\"2026-10-06T12:18:49.261Z\",\"displayTime\":\"6.10.2026, 15:18:49\",\"customerName\":\"דודי אוזנה\",\"phone\":\"972524404222\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 14075 | טיח גבס MP75 25 ק\\\"ג קנאוף × 1 שק (0.03 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":38,\"timestamp\":\"2026-10-06T12:23:02.824Z\",\"displayTime\":\"6.10.2026, 15:23:02\",\"customerName\":\"ראמי\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 14075 | טיח גבס MP75 25 ק\\\"ג קנאוף × 1 שק (0.03 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":39,\"timestamp\":\"2026-10-06T12:54:55.185Z\",\"displayTime\":\"6.10.2026, 15:54:55\",\"customerName\":\"Omri\",\"phone\":\"68899949293680\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: סופיה🇧🇬מלון קזינו באוקטובור,במחירים של סוף עונה🔥 \\n\\n*זה אינו טיול מאורגן \\n⚠️בודדים⚠️\\n\\nבאטומי🇬🇪\\n🗓27-30.10\\n\\n✈️טיסות \\nהלוך בוקר \\nחזור בוקר\\n🧳כבודה-טרולי\\n🏬מלון עם קזינו על בסיס ארוחת בוקר🫓🥖\\n💵 מחיר על בסיס זוגי👬- רק ב-1,490₪ לאדם\\n\\n⚠️ מהרו לפני עליית מחירים,מקומות אחרונים\\nמי שמבין — סוגר\\n\\n\\nהמחיר נכון לרגע פרסום הדיל (06/10/26) ועלול להשתנות בכל עת מהרו לשריין \\nט.ל.ח\\n\\nלהזמנות התקשרו או שלחו הודעה:\\n☎️ 0557259066\\n*קישור לווטסאפ שלנו:https://did.li/RMNCN\\n\\nקישור לדילים מיוחדים באינסטגרם:\\n\\nhttps://www.instagram.com/trip_tip6?igsh=MWcxN2x5cXY3Z2V2Zg==\\n\\n*לצירוף חברים לקבוצת הדילים בווטסאפ:\\nhttps://chat.whatsapp.com/Ek5qBrf2ec2DiXtmIAP6eX\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":40,\"timestamp\":\"2026-10-06T13:37:00.114Z\",\"displayTime\":\"6.10.2026, 16:37:00\",\"customerName\":\"המון\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 11540 | מצע שק גדול (בלה) × 1 בלה (0.8 טון)\\n2. מק\\\"ט 11540 | מצע שק גדול (בלה) × 1 בלה (0.8 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":41,\"timestamp\":\"2026-10-06T14:12:18.519Z\",\"displayTime\":\"6.10.2026, 17:12:18\",\"customerName\":\"meged מגד שיפוצים וניהול פרויקטים\",\"phone\":\"7726998544497\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: להוסיף להזמנה לקרני שומרון שתי חבילות מכל דבר\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":42,\"timestamp\":\"2026-10-06T14:41:54.712Z\",\"displayTime\":\"6.10.2026, 17:41:54\",\"customerName\":\"לקוח אתר \\\"נועה אילו 5\",\"phone\":\"972508860896\",\"site\":\"\\\"נועה אילו 5, מוצרים נמכרים ביותר ומה היקף המשלוחים שלהם\",\"details\":\"1. מק\\\"ט 11511 | סומסום שק גדול (בלה) × 1 בלה (0.73 טון)\\n2. מק\\\"ט 10002 | מלט אפור 25 ק\\\"ג נשר × 1 שק (0.03 טון)\\n3. מק\\\"ט 11500 | חול שק 25 ק\\\"ג × 255 שק (6.38 טון)\\n4. מק\\\"ט 12003 | בלוק בטון 3/20/40 (פלטה) × 220 יח' (3.96 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":43,\"timestamp\":\"2026-10-06T15:09:31.109Z\",\"displayTime\":\"6.10.2026, 18:09:31\",\"customerName\":\"לקוח אתר סטטוס הראל 12\",\"phone\":\"46772210659365\",\"site\":\"סטטוס הראל 12, אתקן\",\"details\":\"פנייה כללית: סטטוס הראל 12 אתקן\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"vip\"},{\"id\":44,\"timestamp\":\"2026-10-06T15:13:07.042Z\",\"displayTime\":\"6.10.2026, 18:13:07\",\"customerName\":\"אורניל / אבי לוי\",\"phone\":\"46772210659365\",\"site\":\"לוחמי גליפולי 8, אביחיל\",\"details\":\"פנייה כללית: עדכני את הראל הזמנת אורניל של תחסין תאריך אספקה למחר\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":45,\"timestamp\":\"2026-10-06T15:15:32.411Z\",\"displayTime\":\"6.10.2026, 18:15:32\",\"customerName\":\"לקוח אתר שלום הראל אושרה  על ידי ראמי שינוי אספקה לתאריך 07\",\"phone\":\"46772210659365\",\"site\":\"שלום הראל אושרה  על ידי ראמי שינוי אספקה לתאריך 07\",\"details\":\"פנייה כללית: 🫡שלום הראל אושרה  על ידי ראמי שינוי אספקה לתאריך 07/10\\nתודה .\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"vip\"},{\"id\":46,\"timestamp\":\"2026-10-06T15:56:26.887Z\",\"displayTime\":\"6.10.2026, 18:56:26\",\"customerName\":\"אליעזר תמלו\",\"phone\":\"158360343175264\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: שלום,\\n\\nבגלל שינוי המחירים בוואטסאפ, אנחנו משנים את הדרך שבה אליעזר, בוט התמלול של מיזם ivrit.ai, מחזיר את התמלולים: הם כבר לא נשלחים כאן בוואטסאפ.\\n\\nאליעזר משרת עשרות אלפי משתמשים ביום ומתמלל יותר ממיליון הודעות בחודש, ללא תשלום.\\n\\nכדי להמשיך לקבל תמלולים מאליעזר, קשרו את הוואטסאפ שלכם לאפליקציה ייעודית שפיתחנו, Communicator, או לטלגרם. את ההקלטות ממשיכים לשלוח לכאן, כרגיל. ההוראות:\\nhttps://status.eliezer.ivrit.ai\\n\\nלשאלות נוספות: info@ivrit.ai\\n\\nזו ההודעה היחידה שתקבלו מאתנו כאן ❤️\\n\\nצוות ivrit.ai\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":47,\"timestamp\":\"2026-10-06T15:57:14.082Z\",\"displayTime\":\"6.10.2026, 18:57:14\",\"customerName\":\"תקרא הודעה\",\"phone\":\"228922495111333\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: קיבלתי טקסט ארוך. אני מחלק אותו ל-2 חלקים ושולח אותם אחד אחרי השני, לפי הסדר. אין צורך לשלוח שוב. 🎧\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":48,\"timestamp\":\"2026-10-06T16:53:55.293Z\",\"displayTime\":\"6.10.2026, 19:53:55\",\"customerName\":\"ראמי\",\"phone\":\"46772210659365\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: הודיעי לו לא מעניין אותי 😁\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"internal\"},{\"id\":49,\"timestamp\":\"2026-10-06T17:00:05.561Z\",\"displayTime\":\"6.10.2026, 20:00:05\",\"customerName\":\"נתנאל אסטריכר\",\"phone\":\"269526495178940\",\"site\":\"מעל 3, ג'יגה של קבצים\",\"details\":\"פנייה כללית: *הטבה מיוחדת עבור העוקבים שלי מחכה לכם בסוף הפוסט והסרטון* 👇🏼\\n\\nהגיע הזמן להחליף את סביבת העבודה 🖥️\\n\\nאחרי חודשיים של מחקר עם צ'אט ג'י פי טי, בחרתי ב-Furniq. הכי זולים, איכותיים ואמינים שמצאתי!\\n\\nשולחן חשמלי Elevate V2 בגוון אגוז אמריקאי, מנורת היילו, זרוע למיקרופון וזרוע כפולה לשני המסכים. הכל פותח ועוצב אצלם כמערכת אחת, ומרגישים את זה בכל פרט.\\n\\nואפילו התפנקתי בהליכון משרדי, כדי לזוז תוך כדי עבודה 🚶‍♂️\\n\\n🎬 מאחורי הקלעים: שעה וחצי של צילומים, מעל 3 ג'יגה של קבצים, והעריכה עצמה לקחה כמה דקות בלבד. את כל העבודה עשה קלוד קוד.\\n\\n💰 *מחיר השולחן מתחיל ב-999₪* לפני ההנחה.\\n\\n🎁 במיוחד בשבילכם: 10% הנחה עם הקוד *Netanel10*\\n\\nהגיע הזמן להשתדרג!\\nhttps://www.furniq.co.il/c/NETANEL10\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":50,\"timestamp\":\"2026-10-06T17:45:12.108Z\",\"displayTime\":\"6.10.2026, 20:45:12\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: https://notebooklm.link.google/XaQs4ptrdeg0\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"noise\"},{\"id\":51,\"timestamp\":\"2026-10-06T17:59:35.677Z\",\"displayTime\":\"6.10.2026, 20:59:35\",\"customerName\":\"לקוח ח. סבן\",\"phone\":\"140901368230048\",\"site\":\"לפי תיאום באתר\",\"details\":\"1. מק\\\"ט 111280 | לוח גבס לבן 280 ע 12.50 × 6 לוח (0.15 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":52,\"timestamp\":\"2026-10-07T03:46:00.294Z\",\"displayTime\":\"7.10.2026, 6:46:00\",\"customerName\":\"meged מגד שיפוצים וניהול פרויקטים\",\"phone\":\"7726998544497\",\"site\":\"מלט . 2, דבק .\",\"details\":\"1. מק\\\"ט 11510 | סומסום שק 25 ק\\\"ג × 80 שק (2 טון)\\n2. מק\\\"ט 11550 | טיט מוכן שק 25 ק\\\"ג × 20 שק (0.5 טון)\\n3. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 2 שק (0.05 טון)\\n4. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 5 שק (0.13 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":53,\"timestamp\":\"2026-10-07T03:46:01.072Z\",\"displayTime\":\"7.10.2026, 6:46:01\",\"customerName\":\"meged מגד שיפוצים וניהול פרויקטים\",\"phone\":\"7726998544497\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: תאשר לי בבקשה שראית 🙏\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":54,\"timestamp\":\"2026-10-07T03:49:12.075Z\",\"displayTime\":\"7.10.2026, 6:49:12\",\"customerName\":\"מיקי לבנון - בדיקות חשמל\",\"phone\":\"224553926140003\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: אז אין אפשרות להודעה קופצת\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":55,\"timestamp\":\"2026-10-07T03:51:00.218Z\",\"displayTime\":\"7.10.2026, 6:51:00\",\"customerName\":\"ℝ𝕠𝕪 ℤ𝕒𝕝𝕥𝕤𝕞𝕒𝕟\",\"phone\":\"22355556491440\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: האם אתה מתכוון להתראות בטלפון?\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":56,\"timestamp\":\"2026-10-07T03:52:29.236Z\",\"displayTime\":\"7.10.2026, 6:52:29\",\"customerName\":\"מיקי לבנון - בדיקות חשמל\",\"phone\":\"224553926140003\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: שהודעה של איש קשר מסויים תקפוץ על המסך\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":57,\"timestamp\":\"2026-10-07T03:56:49.743Z\",\"displayTime\":\"7.10.2026, 6:56:49\",\"customerName\":\"לקוח אתר מלט . 2\",\"phone\":\"46772210659365\",\"site\":\"מלט . 2, דבק .\",\"details\":\"1. מק\\\"ט 11510 | סומסום שק 25 ק\\\"ג × 80 שק (2 טון)\\n2. מק\\\"ט 11550 | טיט מוכן שק 25 ק\\\"ג × 20 שק (0.5 טון)\\n3. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 2 שק (0.05 טון)\\n4. מק\\\"ט 15109 | דבק 109 25 ק\\\"ג כרמית × 5 שק (0.13 טון)\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"order\"},{\"id\":58,\"timestamp\":\"2026-10-07T04:00:47.241Z\",\"displayTime\":\"7.10.2026, 7:00:47\",\"customerName\":\"meged מגד שיפוצים וניהול פרויקטים\",\"phone\":\"7726998544497\",\"site\":\"תוסיף להזמנה 5, ק\\\"ג רובה טמבור\",\"details\":\"פנייה כללית: תוסיף להזמנה 5 ק\\\"ג רובה טמבור 120\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":59,\"timestamp\":\"2026-10-07T04:01:50.852Z\",\"displayTime\":\"7.10.2026, 7:01:50\",\"customerName\":\"ℝ𝕠𝕪 ℤ𝕒𝕝𝕥𝕤𝕞𝕒𝕟\",\"phone\":\"22355556491440\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: הבקשה שלך עדיין לא מספיק ברורה. לי זה נראה כאילו שאתה מדבר על ההתראה למעלה בטלפון כאשר נכנסת לך הודעה חדשה. לזה התכוונת?\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":60,\"timestamp\":\"2026-10-07T04:03:38.796Z\",\"displayTime\":\"7.10.2026, 7:03:38\",\"customerName\":\"מיקי לבנון - בדיקות חשמל\",\"phone\":\"224553926140003\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: לא.\\nיש איש קשר חשוב.\\nאתה רוצה שהודעת ווטסאפ לא תוצג כהתראה בוילון,\\nאלא כל חלון הצ'אט איתו יקפוץ על המסך.\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"},{\"id\":61,\"timestamp\":\"2026-10-07T04:06:29.159Z\",\"displayTime\":\"7.10.2026, 7:06:29\",\"customerName\":\"ℝ𝕠𝕪 ℤ𝕒𝕝𝕥𝕤𝕞𝕒𝕟\",\"phone\":\"22355556491440\",\"site\":\"לפי תיאום באתר\",\"details\":\"פנייה כללית: אין חיה כזו. ניתן אבל להוסיף אותו בוואטסאפ למועדפים או לרשימת אנשי קשר מסויימת. זה סוג של סינון שתוכל לראות רק את השיחות האלו\",\"urgency\":\"רגילה\",\"status\":\"הועבר לראמי\",\"kind\":\"general\"}]");
var knowledge_default = [
	{
		"id": "dna-01",
		"category": "זהות וארגון",
		"text": "חברת ח. סבן חומרי בניין (1994) בע\"מ (ח.פ 512001678). נועה AI הינה הסדרנית המבצעית ויד ימינו של ראמי מסארווה (מנהל ההזמנות והסידור). הנהלה בכירה: ורד והראל אידלסון.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-02",
		"category": "מחסנים ומקורות אספקה",
		"text": "מחסן ראשי וכבד 🏭 4️⃣(החרש 10, הוד השרון) בניהול אורן: אגרגטים בבלות ותפזורת, מלט, טיט, דבקים, בלוקים, ברזל ומכולות. מוצא למשאית מנוף חכמת.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-03",
		"category": "מחסנים ומקורות אספקה",
		"text": "מחסן קל וגמר 🏟️ 1️⃣(התלמיד 6, הוד השרון) בניהול תמיר ודורון: לוחות גבס, פרופילים, צבעים, שפכטל, בידוד, כלי עבודה ופרזול. מוצא למשאית חלוקה עלי.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-04",
		"category": "צי רכב ונהגים",
		"text": "חכמת (משאית מרצדס מנוף 12 טון, 615-41-002): הובלות מנוף, פריקות גובה, משטחים ובלות כבדות. צריכה 3.2 ק\"מ/ליטר + 2.7 ליטר PTO לפריקה ממוצעת (35 דק'). מגבלת עומס מורשה עד 12 טון לסבב.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-05",
		"category": "צי רכב ונהגים",
		"text": "עלי (משאית איסוזו פלטה/סגורה 5.5 טון, 651-51-701): חלוקה קלה ללא מנוף (גבס, פרופילים, שקים בודדים עד 2 טון). צריכה 6.0 ק\"מ/ליטר, 0 ליטר PTO.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-06",
		"category": "חוקי פקדונות 1:1",
		"text": "חוק פקדון בלה (מק\"ט 60002): חיוב אוטומטי ביחס מדויק של 1 ל-1 על כל בלה של חול (11501), סומסום (11511), מצע (11540), טיט (11551) או חמרה (11570).",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-07",
		"category": "חוקי פקדונות 1:1",
		"text": "משטח מלט הוא תמיד 40 שקים (1.0 טון). כל כמות של עד 40 שקי מלט/דבק מחייבת משטח עץ סבן פקדון 1 (מק\"ט 60060).",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-08",
		"category": "חוקי פקדונות 1:1",
		"text": "חוק פקדון משטח בלוקים (מק\"ט 60006): מחושב לפי מנות המשטח של סוג הבלוק (לדוגמה כל 75 בלוקים 20/20/40 = משטח 1).",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-09",
		"category": "חוקי פקדונות 1:1",
		"text": "פטור מפקדונות: הובלה ללא פריקה (מק\"טים 818050-818118) שבה הסחורה נפרקת עצמאית ע\"י הלקוח ללא העמדת משטחים/בלות פטורה מפקדונות.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-10",
		"category": "מכולות פסולת",
		"text": "חוק מכולות פסולת 8 קוב בלבד: מילוי עד קו דפנות אפס בלבד! חל איסור מוחלט על גלישת פסולת מעבר לדפנות. חובה לוודא גישה פנויה לרמסע.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-11",
		"category": "חבילות ופרופילים",
		"text": "חוק חבילות פרופילים: חבילת ניצבים או מסלולים תקנית (עובי 0.6) מכילה תמיד 10 יחידות.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-12",
		"category": "תמחור וניתוב לוגיסטי",
		"text": "מוצא קבוע לכל חישוב מרחק והובלה: החרש 10 הוד השרון. ברקודי מנוף סדרת 18000 (18050 הוד השרון 280 ש\"ח, 18055 כ\"ס-רעננה 320 ש\"ח, 18060 הרצליה-רמה\"ש 350 ש\"ח). תוספת ק\"מ חורג: 12 ש\"ח/ק\"מ.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-13",
		"category": "תמחור וניתוב לוגיסטי",
		"text": "ברקודי הובלה קלה סדרת 818000 (818050 הוד השרון 200 ש\"ח, 818055 כ\"ס-רעננה 230 ש\"ח, 818060 הרצליה-רמה\"ש 250 ש\"ח). תוספת ק\"מ חורג: 8 ש\"ח/ק\"מ.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-14",
		"category": "גיליונות וסנכרון נתונים",
		"text": "כלל ברזל: הזרקת נתונים אך ורק לשני הגיליונות הפעילים: 'מאגר מידע נועה' (1LCgSoAFAQJKgdjlh1S1EwQiRU9Ho9MOUVHpoBfV2Z2Q) ו'מערכת מאוחדת' (1Ie7gKql_EDdrIN9HqunJc9Ey5k0WXXfPRxs0Vp1Bs2c). חל איסור מוחלט על הזרקה ל-noaBrain הישן!",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-15",
		"category": "נוהל שיבוץ ושידור לצוות",
		"text": "נוהל אישור בסידור: ראמי מאשר בספרה '1' -> הזמנה מוזרקת לגיליון 'הזמנות' -> שידור כרטיס תמציתי לקבוצת 'עדכונים מהסידור' (120363428842730390@g.us) עם תיוג ישיר של המחסנאי המלקט (אורן/תמיר) והנהג (חכמת/עלי).",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-16",
		"category": "שירות לקוחות וגבולות אחריות",
		"text": "גבולות שיחה מול לקוח: נועה מזדהה בחום כעוזרת הדיגיטלית של ראמי מסבן, מליקטת פרטי אתר ומוצרים, אך לעולם אינה מתחייבת ישירות על מחירים, זמני אספקה או מלאי ללא אישור ראמי.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-17",
		"category": "השתקה אנושית",
		"text": "נוהל השתקה אנושית (Human Mute): כאשר ראמי מקליד בעצמו ללקוח בשיחה פרטית, נועה משתתקת באותו צ'אט אוטומטית למשך שעתיים כדי לא להפריע לשיחה הישירה.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "dna-18",
		"category": "מעגל תעודות משלוח וטכוגרף",
		"text": "סגירת מעגל תעודות: פיצול סריקות יומיות מגליה, אימות חתימות לקוח, בדיקת רציפות דיסקיות טכוגרף וזמני מנוף באיתוראן, ותיוק אוטומטי בתיקיות הלקוחות ב-Drive תחת 1JGNbTlmB5yBH_cLOApKTvE39CEL6roFF.",
		"timestamp": "2026-10-06T05:12:57.287133Z",
		"author": "ראמי והראל"
	},
	{
		"id": "k-19",
		"text": "אין לשבץ החלפת מכולה בימי שישי לאחר השעה 11:00",
		"timestamp": "2026-10-06T09:26:04.202Z",
		"author": "ראמי"
	},
	{
		"id": "k-20",
		"text": "יש לנו פגישה ב9 בבוקר היום",
		"timestamp": "2026-10-07T02:08:48.725Z",
		"author": "ראמי"
	},
	{
		"id": "k-21",
		"text": "לא לענות להראל בקובצת סידור 🫡 שלום הראל. הודעתך הועברה ישירות ובדחיפות עליונה לראמי והוא חוזר אליך כעת ישירות.",
		"timestamp": "2026-10-07T02:54:01.217Z",
		"author": "ראמי"
	}
];
var meetings_default = {
	pending: [{
		"id": "meet-1791272784374",
		"requesterName": "נועה",
		"phone": "נשלח ללא מספר נייד",
		"chatFrom": "140901368230048@lid",
		"rawText": "יכולה לפתוח לו task? במועד הפגישה?",
		"meetingTimeText": "מחר (יום רביעי, 7.10) בשעה 09:00",
		"targetDateIso": "2026-10-07T06:00:00.000Z",
		"createdAt": "2026-10-06T07:46:24.374Z"
	}],
	scheduled: [{
		"id": "sched-1791267175327",
		"requesterName": "נועה",
		"phone": "נשלח ללא מספר נייד",
		"chatFrom": "140901368230048@lid",
		"meetingTimeText": "מחר (יום רביעי, 7.10) בשעה 10:00",
		"targetDateIso": "2026-10-07T07:00:00.000Z",
		"reminderSent": false,
		"confirmedAt": "2026-10-06T06:12:55.327Z"
	}, {
		"id": "sched-1791272729542",
		"requesterName": "נועה",
		"phone": "נשלח ללא מספר נייד",
		"chatFrom": "140901368230048@lid",
		"meetingTimeText": "מחר (יום רביעי, 7.10) בשעה 10:00",
		"targetDateIso": "2026-10-07T07:00:00.000Z",
		"reminderSent": false,
		"confirmedAt": "2026-10-06T07:45:29.542Z"
	}],
	notes: [{
		"id": "k-20",
		"text": "יש לנו פגישה ב9 בבוקר היום",
		"timestamp": "2026-10-07T02:08:48.725Z",
		"author": "ראמי"
	}]
};
var SEED_TEXTS = [
	{
		customerName: "meged מגד שיפוצים",
		phone: "0549644335",
		text: "80 שק סומסום, 20 שק טיט מוכן, 7 שק דבק 109 לקרני שומרון. תוסיף 5 קילו רובה טמבור 120",
		urgency: "normal"
	},
	{
		customerName: "אורניל / אבי לוי",
		phone: "0545998111",
		text: "דחוף: 12 ניצבים 50/300, 2 שק חול, 3 בלות חול, בלת סומסום ללוחמי גליפולי 8 אביחיל",
		urgency: "urgent"
	},
	{
		customerName: "אלנבי על הים",
		phone: "0546677112",
		text: "10 שק בטון מוכן ו-3 סיקה טופ 107 לשמוליק סגל 4 תל אביב",
		urgency: "normal"
	}
];
function makeOrder(seed, idx, status) {
	const normalized = parseAndNormalizeMaterials(seed.text);
	const client = identifyClient(seed.text, seed.phone, seed.customerName);
	const assignment = assignResources(seed.text, normalized);
	const dest = findDestination(client.projectSite, client.customerNumber);
	return {
		id: `seed-${idx}`,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - (3 - idx) * 36e5)).toISOString(),
		customerName: client.customerName,
		customerNumber: client.customerNumber,
		phone: seed.phone,
		address: client.projectSite,
		rawText: seed.text,
		items: normalized.items,
		deposits: normalized.deposits,
		totalWeightTons: normalized.totalWeightTons,
		assignment,
		freight: quoteFreight(client.projectSite, assignment, dest),
		source: "inbox",
		status,
		urgency: seed.urgency,
		notes: client.siteNotes || ""
	};
}
var seedOrders = SEED_TEXTS.map((s, i) => makeOrder(s, i, i === 2 ? "approved" : "pending"));
var initial = {
	commandMode: "manual_off",
	inquiries: inquiries_default,
	knowledge: knowledge_default,
	meetings: [
		...(meetings_default.pending || []).map((m) => ({
			...m,
			status: "pending",
			meetingTimeText: m.meetingTimeText || "היום 09:00"
		})),
		...(meetings_default.scheduled || []).map((m) => ({
			...m,
			status: "scheduled"
		})),
		{
			id: "meet-rami-0900",
			requesterName: "ראמי / הנהלה",
			phone: "0508860896",
			meetingTimeText: "היום (רביעי, 7.10) בשעה 09:00",
			targetDateIso: "2026-10-07T06:00:00.000Z",
			status: "scheduled"
		}
	],
	orders: seedOrders,
	nextInquiryId: (inquiries_default.at(-1)?.id ?? 61) + 1
};
var useNoaStore = create()((set, get) => ({
	...initial,
	setCommandMode: (commandMode) => set({ commandMode }),
	markInquiryHandled: (id) => set({ inquiries: get().inquiries.map((i) => i.id === id ? {
		...i,
		handled: true,
		status: "טופל"
	} : i) }),
	addKnowledge: (text) => {
		const note = text.trim();
		if (!note) return;
		const item = {
			id: "k-" + (get().knowledge.length + 1),
			text: note,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			author: "ראמי",
			category: "הוראה חדשה"
		};
		set({ knowledge: [...get().knowledge, item] });
	},
	confirmMeeting: (id) => set({ meetings: get().meetings.map((m) => m.id === id ? {
		...m,
		status: "scheduled"
	} : m) }),
	enqueueOrder: (order) => set({ orders: [...get().orders, order] }),
	approveOrder: (id) => set({ orders: get().orders.map((o) => o.id === id ? {
		...o,
		status: "approved"
	} : o) }),
	rejectOrder: (id) => set({ orders: get().orders.filter((o) => o.id !== id) }),
	resetDemo: () => set({ ...initial })
}));
var NAV = [
	{
		to: "/",
		label: "לוח פיקוד",
		icon: LayoutDashboard
	},
	{
		to: "/inbox",
		label: "פניות",
		icon: Inbox
	},
	{
		to: "/parse",
		label: "מפענח",
		icon: ScanLine
	},
	{
		to: "/fleet",
		label: "צי ומחסנים",
		icon: Truck
	},
	{
		to: "/clients",
		label: "לקוחות",
		icon: Users
	},
	{
		to: "/knowledge",
		label: "ידע DNA",
		icon: BookOpen
	},
	{
		to: "/calendar",
		label: "יומן",
		icon: Calendar
	}
];
function jerusalemNow() {
	return (/* @__PURE__ */ new Date()).toLocaleString("he-IL", {
		timeZone: "Asia/Jerusalem",
		weekday: "short",
		day: "numeric",
		month: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const commandMode = useNoaStore((s) => s.commandMode);
	const pending = useNoaStore((s) => s.orders.filter((o) => o.status === "pending").length);
	const [clock, setClock] = (0, import_react.useState)(jerusalemNow);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setClock(jerusalemNow()), 15e3);
		return () => clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-elevated font-display text-lg text-accent",
								children: "נ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl leading-tight tracking-tight",
									children: "נועה"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: "מרכז הסידור · ח. סבן חומרי בניין"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/knowledge",
								className: "flex size-11 items-center justify-center rounded-md text-muted hover:text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/calendar",
								className: "flex size-11 items-center justify-center rounded-md text-muted hover:text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-xs text-muted",
									children: clock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: commandMode === "manual_on" ? "ok" : commandMode === "scheduled" ? "warn" : "mute",
									children: commandMode === "manual_on" ? "פיקוד פעיל" : commandMode === "scheduled" ? "לפי שעות" : "סדרנית צל"
								}),
								pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "warn",
									children: [pending, " לאישור"]
								}) : null
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-[57px] hidden h-[calc(100dvh-57px)] w-52 shrink-0 border-l border-border p-3 md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1",
						children: NAV.map((item) => {
							const active = pathname === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4",
										strokeWidth: 1.75
									}),
									item.label,
									item.to === "/inbox" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ms-auto tabular-nums text-xs text-warn",
										children: pending
									}) : null
								]
							}, item.to);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 px-3 text-[11px] leading-relaxed text-subtle",
						children: [
							"ראמי מסארווה · ורד והראל אידלסון",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"החרש 10, הוד השרון"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 py-5 pb-24 md:pb-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5",
					children: NAV.slice(0, 5).map((item) => {
						const active = pathname === item.to;
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-fg" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: 1.75
							}), item.label]
						}, item.to);
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-BytEQfqw.css";
var APP_NAME = "נועה · מרכז הסידור";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#100f0c"
			},
			{
				name: "description",
				content: "מרכז הפיקוד של נועה לסידור ח. סבן חומרי בניין"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&family=Frank+Ruhl+Libre:wght@500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "he",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$6 = () => import("./routes-B7rh10kD.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./calendar-DxOVQ1Xc.mjs");
var Route$5 = createFileRoute("/calendar")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./clients-BrUyR0xM.mjs");
var Route$4 = createFileRoute("/clients")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./fleet-Dl8o4ytn.mjs");
var Route$3 = createFileRoute("/fleet")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./inbox-Dz7UALEl.mjs");
var Route$2 = createFileRoute("/inbox")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./knowledge-BuFl4ACt.mjs");
var Route$1 = createFileRoute("/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./parse-C9JqJ2EC.mjs");
var Route = createFileRoute("/parse")({
	validateSearch: (search) => ({
		draft: typeof search.draft === "string" ? search.draft : void 0,
		name: typeof search.name === "string" ? search.name : void 0,
		phone: typeof search.phone === "string" ? search.phone : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	CalendarRoute: Route$5.update({
		id: "/calendar",
		path: "/calendar",
		getParentRoute: () => Route$7
	}),
	ClientsRoute: Route$4.update({
		id: "/clients",
		path: "/clients",
		getParentRoute: () => Route$7
	}),
	FleetRoute: Route$3.update({
		id: "/fleet",
		path: "/fleet",
		getParentRoute: () => Route$7
	}),
	InboxRoute: Route$2.update({
		id: "/inbox",
		path: "/inbox",
		getParentRoute: () => Route$7
	}),
	KnowledgeRoute: Route$1.update({
		id: "/knowledge",
		path: "/knowledge",
		getParentRoute: () => Route$7
	}),
	ParseRoute: Route.update({
		id: "/parse",
		path: "/parse",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useNoaStore as n, router_exports as t };
