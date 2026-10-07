import { i as __toESM } from "../_runtime.mjs";
import { X as require_jsx_runtime, Y as require_react, b as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as buildDispatchCard, c as identifyClient, d as parseAndNormalizeMaterials, f as quoteFreight, i as buildCustomerReply, l as isContainerOrder, r as assignResources, s as findDestination, t as Badge, u as isFridayContainerBlocked } from "./engine-DYsQdUZV.mjs";
import { n as useNoaStore } from "./router-D9LtMLn5.mjs";
import { t as Button } from "./button-1o6U2jBw.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-CIkMX6et.mjs";
import { n as Textarea, t as Input } from "./input-DeMEkb3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parse-C9JqJ2EC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLES = [
	"2 בלות חול ו-40 שק מלט אפור למוצקין 22 רעננה",
	"דחוף: 3 בלות חול, בלת סומסום ו-12 ניצבים 50/300 ללוחמי גליפולי 8 אביחיל",
	"מכולה 8 קוב לשמוליק סגל 4 תל אביב",
	"6 לוחות גבס לבן 280 ו-2 שפכטל אמריקאי להתלמיד, הוד השרון"
];
var parseRoute = getRouteApi("/parse");
function ParserView() {
	const search = parseRoute.useSearch();
	const [text, setText] = (0, import_react.useState)(search.draft || SAMPLES[0]);
	const [name, setName] = (0, import_react.useState)(search.name || "");
	const [phone, setPhone] = (0, import_react.useState)(search.phone || "");
	const enqueueOrder = useNoaStore((s) => s.enqueueOrder);
	const nextId = useNoaStore((s) => s.nextInquiryId);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [queued, setQueued] = (0, import_react.useState)(false);
	const result = (0, import_react.useMemo)(() => {
		const normalized = parseAndNormalizeMaterials(text);
		const client = identifyClient(text, phone, name);
		const assignment = assignResources(text, normalized);
		const dest = findDestination(client.projectSite, client.customerNumber);
		const freight = quoteFreight(client.projectSite, assignment, dest);
		const container = isContainerOrder(text);
		return {
			normalized,
			client,
			assignment,
			dest,
			freight,
			container,
			fridayBlock: container && isFridayContainerBlocked(),
			card: buildDispatchCard({
				orderNumber: String(6200 + nextId),
				customerName: client.customerName,
				customerNumber: client.customerNumber,
				address: client.projectSite,
				rawText: text,
				items: normalized.items,
				deposits: normalized.deposits,
				totalWeightTons: normalized.totalWeightTons,
				assignment
			}),
			reply: buildCustomerReply(client, nextId, normalized)
		};
	}, [
		text,
		name,
		phone,
		nextId
	]);
	function queue() {
		const order = {
			id: "ord-" + Date.now(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			customerName: result.client.customerName,
			customerNumber: result.client.customerNumber,
			phone,
			address: result.client.projectSite,
			rawText: text,
			items: result.normalized.items,
			deposits: result.normalized.deposits,
			totalWeightTons: result.normalized.totalWeightTons,
			assignment: result.assignment,
			freight: result.freight,
			source: "parser",
			status: "pending",
			urgency: /דחוף/.test(text) ? "urgent" : "normal",
			notes: result.client.siteNotes || ""
		};
		enqueueOrder(order);
		setQueued(true);
		setTimeout(() => setQueued(false), 1800);
	}
	async function copy(which) {
		const value = which === "card" ? result.card : result.reply;
		try {
			await navigator.clipboard.writeText(value);
			setCopied(which);
			setTimeout(() => setCopied(null), 1400);
		} catch {}
	}
	const { normalized, client, assignment, dest, freight } = result;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "וואטסאפ ⇄ קומקס ⇄ מילון"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "מפענח הזמנות"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "הדביקו הודעת לקוח. נועה מנרמלת מק״טים, פקדונות 1:1, שיבוץ נהג ומחסן, וכרטיס לקבוצת הסידור."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SAMPLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => setText(s),
					children: [s.slice(0, 28), "…"]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "שם שולח (אופציונלי)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					placeholder: "טלפון (אופציונלי)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "הודעת וואטסאפ חופשית…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: queue,
						children: queued ? "נשלח לתור ראמי" : "שלח לאישור ראמי"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => copy("card"),
						children: copied === "card" ? "הועתק" : "העתק כרטיס שידור"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => copy("reply"),
						children: copied === "reply" ? "הועתק" : "העתק מענה ללקוח"
					})
				]
			}),
			result.fridayBlock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-danger/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: "אין לשבץ החלפת מכולה בימי שישי אחרי 11:00."
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "חשבון"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mt-1",
						children: client.customerName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
						"#",
						client.customerNumber,
						" · ",
						client.projectSite
					] }),
					client.contactPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: ["איש קשר: ", client.contactPerson]
					}) : null,
					client.siteNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: client.siteNotes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [client.isKnown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "ok",
							children: "לקוח מוכר"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warn",
							children: "טרם שויך"
						}), result.container ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: "מכולה 8 קוב"
						}) : null]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "שיבוץ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mt-1",
						children: assignment.driverLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
						assignment.warehouseLabel,
						" · ליקוט ",
						assignment.picker
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"הובלה ",
							freight.sku,
							" · ",
							freight.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [
							freight.totalIls,
							" ₪",
							freight.extraKm ? ` (בסיס ${freight.baseIls} + ${freight.extraKm} ק״מ)` : ""
						]
					}),
					dest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							dest.distanceKm,
							" ק״מ · מנוף ",
							dest.craneUnloadMin,
							" דק׳ · פלטה ",
							dest.flatbedUnloadMin,
							" דק׳"
						]
					}) : null,
					assignment.overload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "danger",
						className: "mt-3",
						children: "חריגת עומס חכמת"
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "נרמול חומרים" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "accent",
							children: [normalized.totalWeightTons, " טון"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [normalized.deposits.bigBags, " בלות 60002"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [normalized.deposits.woodPallets, " משטח סבן 60060"] }),
						normalized.deposits.blockPallets > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [normalized.deposits.blockPallets, " משטח בלוקים 60006"] }) : null
					]
				})]
			}), normalized.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "לא זוהו מק״טים. נועה תבקש מהלקוח אתר וכמויות."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "מק״ט"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "פריט"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "כמות"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "משקל"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: normalized.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 tabular-nums text-muted",
								children: it.sku
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: it.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 tabular-nums",
								children: [
									it.quantity,
									" ",
									it.unit
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 tabular-nums text-muted",
								children: [it.weightTon, " ט׳"]
							})
						]
					}, it.sku)) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs text-muted",
						children: "כרטיס שידור לקבוצה"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap font-sans text-xs leading-relaxed",
						children: result.card
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs text-muted",
						children: "מענה ללקוח — בלי התחייבות למחיר או מועד"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap font-sans text-sm leading-relaxed",
						children: result.reply
					})]
				})]
			})
		]
	});
}
var SplitComponent = ParserView;
//#endregion
export { SplitComponent as component };
