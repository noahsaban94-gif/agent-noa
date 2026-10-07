import { X as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buildDispatchCard, t as Badge } from "./engine-DYsQdUZV.mjs";
import { i as TriangleAlert, l as Clock, o as Radio, p as ArrowLeft, t as X, u as Check } from "../_libs/lucide-react.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { t as Button } from "./button-1o6U2jBw.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B7rh10kD.js
var import_jsx_runtime = require_jsx_runtime();
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular-nums leading-none tracking-tight",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function OrderCard({ order, onApprove, onReject }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: order.customerName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
					order.address,
					" · #",
					order.customerNumber
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-end gap-1",
					children: [order.urgency === "urgent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "danger",
						children: "דחוף"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "רגילה" }), order.assignment.overload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "danger",
						children: "חריגת 12 טון"
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm",
				children: order.items.slice(0, 5).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-3 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: it.sku
							}),
							" ",
							it.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 tabular-nums text-muted",
						children: [
							it.quantity,
							" ",
							it.unit
						]
					})]
				}, it.sku))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.assignment.driverLabel }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.assignment.warehouseLabel }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [order.totalWeightTons, " טון"]
					}),
					order.deposits.bigBags > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"· ",
						order.deposits.bigBags,
						" פקדון בלה"
					] }) : null,
					order.deposits.pallets > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"· ",
						order.deposits.pallets,
						" משטחים"
					] }) : null
				]
			}),
			onApprove ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ok",
					onClick: onApprove,
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " אשר · 1"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onReject,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-ok",
				children: ["שובץ לסידור · ליקוט ", order.assignment.picker]
			})
		]
	});
}
var MODES = [
	{
		id: "manual_on",
		label: "התחילי פיקוד"
	},
	{
		id: "manual_off",
		label: "סיימי פיקוד"
	},
	{
		id: "scheduled",
		label: "חזרי לשעות"
	}
];
function CommandBoard() {
	const { commandMode, setCommandMode, orders, inquiries, meetings, approveOrder, rejectOrder } = useNoaStore();
	const pending = orders.filter((o) => o.status === "pending");
	const approved = orders.filter((o) => o.status === "approved" || o.status === "broadcast");
	const todayOrders = inquiries.filter((i) => i.kind === "order");
	const urgent = inquiries.filter((i) => i.urgency.includes("דחוף") && !i.handled);
	const nextMeeting = meetings.slice().sort((a, b) => a.targetDateIso.localeCompare(b.targetDateIso))[0];
	const latestApproved = approved[0];
	const card = latestApproved ? buildDispatchCard({
		orderNumber: latestApproved.id.replace(/\D/g, "").slice(-4) || "6210",
		customerName: latestApproved.customerName,
		customerNumber: latestApproved.customerNumber,
		address: latestApproved.address,
		rawText: latestApproved.rawText,
		items: latestApproved.items,
		deposits: latestApproved.deposits,
		totalWeightTons: latestApproved.totalWeightTons,
		assignment: latestApproved.assignment
	}) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-muted uppercase",
						children: "ח. סבן · 7.10.2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl tracking-tight",
						children: "לוח הסידור"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: "נועה עובדת כסדרנית צל. ראמי מאשר בספרה 1 — ואז ההזמנה מוזרקת לגיליון ומשודרת לקבוצת עדכונים מהסידור."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: commandMode === m.id ? "default" : "secondary",
						onClick: () => setCommandMode(m.id),
						children: m.label
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "הזמנות בתיבה",
						value: todayOrders.length,
						hint: "מתוך הפניות האחרונות"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "ממתינות לאישור",
						value: pending.length,
						hint: "הקש 1 לשיבוץ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "דחופות פתוחות",
						value: urgent.length,
						hint: "כולל אורניל אביחיל"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "פגישה הבאה",
						value: "09:00",
						hint: nextMeeting?.meetingTimeText ?? "אין ביומן"
					})
				]
			}),
			nextMeeting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-center gap-3 border-warn/30 bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-warn" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "פגישה היום במשרד · החרש 10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: nextMeeting.meetingTimeText
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "text-xs text-accent",
						children: "ליומן"
					})
				]
			}) : null,
			urgent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-start gap-3 border-danger/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-5 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "דגש מבצעי"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "אורניל / אבי לוי — אספקה הועברה להיום. אין שיבוץ החלפת מכולה אחרי 11:00 בימי שישי. מול הראל בקבוצת הסידור — העברה לראמי בלבד, בלי מענה ישיר."
				})] })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "תור אישור ראמי"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warn",
							children: pending.length
						})]
					}), pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "התור ריק. הכל משובץ בגיליון."
					}) }) : pending.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
						order: o,
						onApprove: () => approveOrder(o.id),
						onReject: () => rejectOrder(o.id)
					}, o.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "סידור מאושר"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/parse",
								className: "inline-flex items-center gap-1 text-sm text-muted hover:text-fg",
								children: ["מפענח הזמנה ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" })]
							})]
						}),
						approved.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order: o }, o.id)),
						card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5" }), " כרטיס לקבוצת עדכונים מהסידור"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "overflow-x-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-fg",
								children: card
							})]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "חכמת · 615-41-002"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mt-1",
						children: "מנוף 12 טון"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "מוצא מחסן 4 החרש 10 · אורן. מגבלת 12 טון לסבב. 3.2 ק״מ/ל׳ + 2.7 ל׳ PTO."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "עלי · 651-51-701"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mt-1",
						children: "איסוזו 5.5 טון"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "מוצא מחסן 1 התלמיד 6 · תמיר/דורון. גבס, פרופילים, שקים עד 2 טון. 6.0 ק״מ/ל׳."
					})
				] })]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandBoard, {});
}
//#endregion
export { Home as component };
