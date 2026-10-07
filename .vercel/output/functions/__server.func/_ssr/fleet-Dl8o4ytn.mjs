import { X as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./engine-DYsQdUZV.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fleet-Dl8o4ytn.js
var import_jsx_runtime = require_jsx_runtime();
function FleetView() {
	const orders = useNoaStore((s) => s.orders.filter((o) => o.status !== "pending"));
	const hakmatLoad = orders.filter((o) => o.assignment.driver === "hakmat").reduce((s, o) => s + o.totalWeightTons, 0);
	const aliLoad = orders.filter((o) => o.assignment.driver === "ali").reduce((s, o) => s + o.totalWeightTons, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "מוצא קבוע · החרש 10 הוד השרון"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "צי ומחסנים"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "615-41-002"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "חכמת · מרצדס מנוף" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "12 טון מורשה · מחסן 4" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: hakmatLoad > 12 ? "danger" : "ok",
						children: [hakmatLoad.toFixed(2), " טון היום"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "צריכה"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: "3.2 ק״מ/ל׳"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "PTO לפריקה"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: "2.7 ל׳ · 35 דק׳"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "מטען"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "בלות, מלט, בלוקים, ברזל, מכולות" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "מגבלת סבב"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "עד 12 טון · עד 18 בלות" })] })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "651-51-701"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "עלי · איסוזו פלטה" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "5.5 טון · מחסן 1 · בלי מנוף" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "info",
						children: [aliLoad.toFixed(2), " טון היום"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "צריכה"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: "6.0 ק״מ/ל׳"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "PTO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "אין" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "מטען"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "גבס, פרופילים, שקים בודדים עד 2 טון" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "כוננות"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "חלוקה קלה והשלמות" })] })
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "מחסן כבד"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "4 · החרש 10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "הוד השרון · אורן" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "אגרגטים בבלות ותפזורת, מלט, טיט, דבקים, בלוקים, ברזל ומכולות. מוצא למשאית מנוף חכמת ולרמסע."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "מחסן קל וגמר"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "1 · התלמיד 6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "הוד השרון · תמיר ודורון" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "לוחות גבס, פרופילים, צבעים, שפכטל, בידוד, כלי עבודה ופרזול. מוצא לעלי."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-2xl",
				children: "תמחור הובלה ממוצא החרש 10"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-elevated text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "אזור"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "מנוף"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "קלה"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "ק״מ חורג"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						[
							"הוד השרון",
							"18050 · 280 ₪",
							"818050 · 200 ₪",
							"12 / 8 ₪"
						],
						[
							"כפר סבא–רעננה",
							"18055 · 320 ₪",
							"818055 · 230 ₪",
							"12 / 8 ₪"
						],
						[
							"הרצליה–רמה\"ש",
							"18060 · 350 ₪",
							"818060 · 250 ₪",
							"12 / 8 ₪"
						]
					].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-t border-border",
						children: row.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: c
						}, c))
					}, row[0])) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "פקדונות 1:1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "60002 בלה — יחס 1:1 על חול 11501, סומסום 11511, מצע 11540, טיט 11551, חמרה 11570" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "60060 משטח סבן — כל 40 שקי מלט/דבק/טיח = משטח אחד" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "60006 משטח בלוקים — כל 75 בלוקים 20/20/40 = משטח" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "פטור: הובלה ללא פריקה 818050–818118" })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "מכולות ופרופילים"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "מכולת פסולת 8 קוב בלבד, מילוי עד קו דפנות. גישה פנויה לרמסע." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "אין החלפת מכולה בשישי אחרי 11:00" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "חבילת ניצבים/מסלולים 0.6 = תמיד 10 יחידות" })
					]
				})] })]
			})
		]
	});
}
var SplitComponent = FleetView;
//#endregion
export { SplitComponent as component };
