import catalog from "@/data/catalog.json";
import clients from "@/data/clients.json";
import destinations from "@/data/destinations.json";
import type {
  Assignment,
  ClientMatch,
  ClientRecord,
  Destination,
  FreightQuote,
  NormalizedOrder,
  ParsedItem,
  Product,
} from "./types";

const PRODUCTS = catalog as Product[];
const CLIENTS = clients as ClientRecord[];
const DESTINATIONS = destinations as Destination[];

const RULES = PRODUCTS.flatMap((product) =>
  product.keywords
    .filter((kw) => kw.length >= 2)
    .map((kw) => ({ length: kw.length, keyword: kw.toLowerCase(), product })),
).sort((a, b) => b.length - a.length);

const CITIES = [
  "הוד השרון",
  "כפר סבא",
  "רעננה",
  "תל אביב",
  'ת"א',
  "הרצליה",
  "רמת השרון",
  "פתח תקווה",
  'פ"ת',
  "רעות",
  "מודיעין",
  "אביחיל",
  "רמת גן",
  "קרני שומרון",
];

export function extractAddress(text: string | null | undefined): string | null {
  if (!text) return null;
  let clean = text.replace(/[\r\n]+/g, " ");
  clean = clean.replace(/ר[״"']ג\b/g, "רמת גן");
  clean = clean.replace(/ת[״"']א\b/g, "תל אביב");
  clean = clean.replace(/פ[״"']ת\b/g, "פתח תקווה");
  clean = clean.replace(/כ[״"']ס\b/g, "כפר סבא");
  clean = clean.replace(/מחולה\b/g, "מכולה");

  if (clean.includes("רייכמן") || clean.includes("בינתחומי")) {
    return "אוניברסיטת רייכמן, הרצליה";
  }
  const numbered = (
    token: string,
    fallback: string,
    city: string,
    extra?: string,
  ) => {
    const re = extra
      ? new RegExp(`(?:${extra}|${token})\\s+(\\d+)\\b`, "i")
      : new RegExp(`${token}\\s+(\\d+)\\b`, "i");
    const m = clean.match(re);
    return `${token === "סגל" ? "שמוליק סגל" : token} ${m?.[1] ?? fallback}, ${city}`;
  };

  if (clean.includes("חורגין")) return numbered("חורגין", "22", "רמת גן");
  if (clean.includes("שמוליק סגל") || clean.includes("סגל")) {
    const m = clean.match(/(?:שמוליק\s*סגל|סגל)\s+(\d+)\b/i);
    return `שמוליק סגל ${m?.[1] ?? "4"}, תל אביב`;
  }
  if (clean.includes("ציפמן")) return numbered("ציפמן", "50", "רעננה");
  if (clean.includes("אוסטושינסקי") || clean.includes("אוסטשינסקי")) {
    const m = clean.match(/אוסט[ו]?שינסקי\s+(\d+)\b/i);
    return `אוסטושינסקי ${m?.[1] ?? "5"}, כפר סבא`;
  }
  if (clean.includes("הנרייטה") || clean.includes("סולד")) {
    const m = clean.match(/(?:הנרייטה\s*סולד|סולד)\s+(\d+)\b/i);
    return `הנרייטה סולד ${m?.[1] ?? "20"}, הוד השרון`;
  }
  if (clean.includes("גליפולי") || clean.includes("גלופולי")) {
    return "לוחמי גליפולי 8, אביחיל";
  }
  if (clean.includes("אביחיל") || clean.includes("אבחיל")) {
    if (clean.includes("העצמאות")) return "רחוב העצמאות, אביחיל";
    if (clean.includes("קפלן")) return "משפחת קפלן, רחוב העצמאות, אביחיל";
    if (clean.includes("דינטי")) return "לוחמי גליפולי 8, אביחיל";
    return "אביחיל";
  }
  if (/\b(?:ביל"ו|בילו)\b/i.test(clean) && !clean.includes("חבילה")) {
    const m = clean.match(/\b(?:ביל"ו|בילו)\b\s*(\d+)?/i);
    const num = m?.[1] || "53";
    const city = clean.includes("רעננה") ? "רעננה" : "תל אביב";
    return `ביל"ו ${num}, ${city}`;
  }
  if (clean.includes("מוצקין")) return numbered("מוצקין", "22", "רעננה");
  if (clean.includes("פעמונית")) return numbered("פעמונית", "47", "הוד השרון");
  if (clean.includes("הסחלב") || clean.includes("סחלב")) return numbered("הסחלב", "8", "רעות");
  if (clean.includes("שחף")) return numbered("שחף", "9", "הוד השרון");
  if (clean.includes("חוחית")) return numbered("חוחית", "8", "הוד השרון");
  if (clean.includes("משאבים")) return "משאבים 45, הוד השרון";
  if (clean.includes("סטרומה")) return numbered("סטרומה", "4", "הרצליה");
  if (clean.includes("קרני שומרון") || clean.includes("עוגב")) {
    return "עוגב 15, קרני שומרון";
  }

  const cleanAddrText = clean
    .replace(
      /^(?:\d+:\s*)?(?:נא\s+(?:לשלוח|להוביל|לספק)\s*(?:ל|ב)?|לשלוח\s*(?:ל|ב)?|להוביל\s*(?:ל|ב)?|צריכים\s*(?:ל|ב)?|דחוף\s*|בדחיפות\s*|הזמנה\s*(?:ל|ב)?|בוקר\s*טוב\s*|צהריים\s*טובים\s*|ערב\s*טוב\s*|לאתר\s*(?:ב|ב-)?)+/i,
      "",
    )
    .trim();

  const m = cleanAddrText.match(
    /([-א-ת"'.]+(?:\s+[-א-ת"'.]+)*)\s+(\d+)\b(?!\s*(?:שק|שקים|בלה|בלות|מלט|חול|טיט|חמרה|סומסום|לוח|חבילה))(?:\s+(?:ב|ב-|עיר:?\s*)?([-א-ת"'.]+(?:\s+[-א-ת"'.]+)*))?/,
  );
  if (m) {
    const street = m[1].replace(/^[בל](?=[א-ת])/, "").trim();
    const blacklist = ["מחר", "אתמול", "היום", "שעה", "בשעה", "בבוקר", "בערב", "בצהריים", "דקות", "שעות", "פגישה", "למחר"];
    if (blacklist.some((b) => street.includes(b))) return null;
    const num = m[2];
    let cityCand = (m[3] || "").replace(/^(?:ב|ב-)/, "").trim();
    for (const mat of ["שק", "שקים", "מלט", "חול", "בלה", "טיט", "תודה", "בברכה"]) {
      cityCand = cityCand.replace(new RegExp("\\b" + mat + "\\b.*$", "i"), "").trim();
    }
    if (street.length >= 3) {
      return cityCand ? `${street} ${num}, ${cityCand}` : `${street} ${num}`;
    }
  }
  return null;
}

export function parseAndNormalizeMaterials(text: string): NormalizedOrder {
  const empty: NormalizedOrder = {
    items: [],
    deposits: { bigBags: 0, pallets: 0, woodPallets: 0, blockPallets: 0 },
    totalWeightTons: 0,
    hasBlocks: false,
    hasDrywall: false,
    hasHeavyItems: false,
  };
  if (!text) return empty;

  let cleanText = text.replace(/107\s*\+\s*תוסף/gi, "107_עם_תוסף");
  const detectedAddr = extractAddress(text);
  if (detectedAddr) {
    const streetPart = detectedAddr.split(",")[0].trim();
    cleanText = cleanText.replace(streetPart, " ");
  }
  for (const city of CITIES) {
    cleanText = cleanText.replace(new RegExp(city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), " ");
  }
  cleanText = cleanText.replace(/(?:תודה|בברכה|יום טוב|תודה רבה)[\s,]+.*$/gi, "").trim();
  if (cleanText.includes(":")) {
    const parts = cleanText.split(":");
    if (parts.length > 1 && parts.slice(1).join(":").trim().length > 0) {
      cleanText = parts.slice(1).join(":").trim();
    }
  }

  const lines = cleanText
    .split(
      /[\n,;:]|\s+ו[-–—]?(?=\d)|\s+ועוד\s+|\s*\+\s*(?=\d)|\s+(?=\d+\s*(?:בלה|בלות|שק|שקים|מלט|חול|סומסום|שומשום|טיט|לוח|בלוק|דבק|טיח|פלטה|קלקל|קלקר|ניצב|מסלול))/,
    )
    .map((l) => l.trim())
    .filter(Boolean);

  const items: ParsedItem[] = [];
  let totalBigBags = 0;
  let totalPalletBags = 0;
  let totalBlocks = 0;
  let totalDrywall = 0;
  let totalWeightTons = 0;

  for (const line of lines) {
    const cleanLine = line.toLowerCase();
    let matched: Product | null = null;
    let matchedKw = "";
    for (const rule of RULES) {
      if (cleanLine.includes(rule.keyword)) {
        matched = rule.product;
        matchedKw = rule.keyword;
        break;
      }
    }
    if (!matched) continue;

    const remainingLine = cleanLine.replace(matchedKw, "").trim();
    const qtyMatch = remainingLine.match(/(\d+)/);
    let quantity = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
    if (cleanLine.includes("משטח") && matched.isPalletItem && !matched.isBlock) {
      quantity = 40;
    }
    if (matched.isMetal && /חבילה|חבילות|\bחב\b/.test(cleanLine)) {
      quantity *= 10;
    }
    if (matched.sku === "50002" && /חבילה|חבילות/.test(cleanLine)) {
      quantity *= 24;
    }

    const key = matched.sku;
    const existing = items.find((it) => it.sku === key);
    const itemWeight = (matched.weightTon || 0.025) * quantity;
    totalWeightTons += itemWeight;
    if (matched.isBigBag) totalBigBags += quantity;
    if (matched.isPalletItem) {
      if (!(matched.palletThreshold && quantity < matched.palletThreshold)) {
        totalPalletBags += quantity;
      }
    }
    if (matched.isBlock) totalBlocks += quantity;
    if (matched.isDrywall) totalDrywall += quantity;

    if (existing) {
      existing.quantity += quantity;
      existing.weightTon = Math.round((existing.weightTon + itemWeight) * 100) / 100;
    } else {
      items.push({
        sku: matched.sku,
        name: matched.name,
        unit: matched.unit,
        quantity,
        isBigBag: !!matched.isBigBag,
        weightTon: Math.round(itemWeight * 100) / 100,
        rules: matched.rules,
      });
    }
  }

  const woodPalletsDeposit = Math.ceil(totalPalletBags / 40);
  const blockPalletsDeposit = Math.ceil(totalBlocks / 75);
  return {
    items,
    deposits: {
      bigBags: totalBigBags,
      pallets: woodPalletsDeposit + blockPalletsDeposit,
      woodPallets: woodPalletsDeposit,
      blockPallets: blockPalletsDeposit,
    },
    totalWeightTons: Math.round(totalWeightTons * 100) / 100,
    hasBlocks: totalBlocks > 0,
    hasDrywall: totalDrywall > 0,
    hasHeavyItems: totalBigBags > 0 || totalWeightTons > 2.0,
  };
}

export function identifyClient(text: string, phone = "", senderName = ""): ClientMatch {
  const cleanText = (text || "").toLowerCase();
  const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
  const addr = extractAddress(text);

  if (
    cleanText.includes("תחסין") ||
    cleanText.includes("אורניל") ||
    cleanText.includes("קפלן") ||
    cleanText.includes("דינטי") ||
    cleanPhone.includes("525354552") ||
    senderName.includes("תחסין") ||
    senderName.includes("אורניל")
  ) {
    let site = "לוחמי גליפולי 8, אביחיל";
    if (cleanText.includes("קפלן") || cleanText.includes("העצמאות")) {
      site = "משפחת קפלן, רחוב העצמאות, אביחיל";
    }
    return {
      customerName: "אורניל / אבי לוי",
      customerNumber: "601992",
      projectSite: site,
      contactPerson: "תחסין (052-5354552)",
      isKnown: true,
      zone: "השרון",
      siteNotes: "אתר אביחיל — גישה לרמסע ולמנוף",
    };
  }

  for (const client of CLIENTS) {
    const phoneMatch =
      !!cleanPhone && client.phones.some((p) => p.includes(cleanPhone) || cleanPhone.includes(p.replace(/[^0-9]/g, "")));
    const nameMatch =
      (client.aliases || []).some((alias) => cleanText.includes(alias.toLowerCase())) ||
      (senderName && (client.aliases || []).some((alias) => senderName.toLowerCase().includes(alias.toLowerCase())));
    const siteStreet = client.defaultSite ? client.defaultSite.split(",")[0].toLowerCase().trim() : "";
    const siteMatch = siteStreet.length >= 4 && cleanText.includes(siteStreet);
    if (phoneMatch || nameMatch || siteMatch) {
      return {
        customerName: client.name,
        customerNumber: client.customerNumber,
        projectSite: addr || client.defaultSite,
        contactPerson: client.contactPerson || senderName,
        isKnown: true,
        zone: client.zone,
        siteNotes: client.siteNotes,
      };
    }
  }

  if (addr && (addr.includes('ביל"ו') || addr.includes("בילו"))) {
    return {
      customerName: 'זבולון-עדירן (אתר ביל"ו)',
      customerNumber: "612603",
      projectSite: addr,
      contactPerson: 'מנהל אתר ביל"ו',
      isKnown: true,
      zone: "תל אביב וגוש דן",
    };
  }

  return {
    customerName: senderName && senderName !== "לקוח" ? senderName : "לקוח ח. סבן",
    customerNumber: "טרם שויך",
    projectSite: addr || "לפי תיאום באתר",
    contactPerson: senderName,
    isKnown: false,
  };
}

export function isContainerOrder(text: string): boolean {
  return /מכולה|מחולה|רמסע/.test(text);
}

export function assignResources(text: string, normalized: NormalizedOrder): Assignment {
  if (isContainerOrder(text)) {
    return {
      driver: "ramsa",
      driverLabel: "רמסע · מכולות 8 קוב",
      warehouse: "4",
      warehouseLabel: "מחסן 4 · החרש 10",
      picker: "אורן",
      overload: false,
    };
  }
  if (normalized.hasHeavyItems || normalized.hasBlocks || normalized.totalWeightTons > 2) {
    return {
      driver: "hakmat",
      driverLabel: "חכמת · מרצדס מנוף 12 טון",
      warehouse: "4",
      warehouseLabel: "מחסן 4 · החרש 10",
      picker: "אורן",
      overload: normalized.totalWeightTons > 12,
    };
  }
  return {
    driver: "ali",
    driverLabel: "עלי · איסוזו פלטה 5.5 טון",
    warehouse: "1",
    warehouseLabel: "מחסן 1 · התלמיד 6",
    picker: "תמיר",
    overload: false,
  };
}

function zoneFromSite(site: string): "hod" | "sharon" | "herz" | "far" {
  if (/הוד השרון/.test(site)) return "hod";
  if (/כפר סבא|רעננה/.test(site)) return "sharon";
  if (/הרצליה|רמת השרון/.test(site)) return "herz";
  return "far";
}

export function quoteFreight(site: string, assignment: Assignment, dest?: Destination | null): FreightQuote {
  const zone = zoneFromSite(site);
  const isCrane = assignment.driver === "hakmat" || assignment.driver === "ramsa";
  const table = isCrane
    ? {
        hod: { sku: "18050", name: "הובלת מנוף הוד השרון", base: 280, extra: 12 },
        sharon: { sku: "18055", name: "הובלת מנוף כפר סבא–רעננה", base: 320, extra: 12 },
        herz: { sku: "18060", name: 'הובלת מנוף הרצליה–רמה"ש', base: 350, extra: 12 },
        far: { sku: "18060", name: "הובלת מנוף + ק״מ חורג", base: 350, extra: 12 },
      }
    : {
        hod: { sku: "818050", name: "הובלה קלה הוד השרון", base: 200, extra: 8 },
        sharon: { sku: "818055", name: "הובלה קלה כפר סבא–רעננה", base: 230, extra: 8 },
        herz: { sku: "818060", name: 'הובלה קלה הרצליה–רמה"ש', base: 250, extra: 8 },
        far: { sku: "818060", name: "הובלה קלה + ק״מ חורג", base: 250, extra: 8 },
      };
  const row = table[zone];
  const extraKm = zone === "far" ? Math.max(0, Math.round((dest?.distanceKm ?? 18) - 8)) : 0;
  const extraIls = extraKm * row.extra;
  return {
    sku: row.sku,
    name: row.name,
    baseIls: row.base,
    extraKm,
    extraIls,
    totalIls: row.base + extraIls,
    zone: zone === "hod" ? "הוד השרון" : zone === "sharon" ? "כפר סבא / רעננה" : zone === "herz" ? "הרצליה / רמה״ש" : "חורג",
  };
}

export function findDestination(address: string, customerNumber?: string): Destination | null {
  const n = (customerNumber || "").replace(/\.0$/, "");
  const byNum = DESTINATIONS.find((d) => d.customerNumber === n);
  if (byNum) return byNum;
  const a = address.toLowerCase();
  return (
    DESTINATIONS.find((d) => a.includes(d.address.toLowerCase()) || d.address.toLowerCase().includes(a.split(",")[0].trim())) ||
    null
  );
}

export function buildDispatchCard(input: {
  orderNumber: string;
  customerName: string;
  customerNumber: string;
  address: string;
  rawText: string;
  items: ParsedItem[];
  deposits: NormalizedOrder["deposits"];
  totalWeightTons: number;
  assignment: Assignment;
}): string {
  const dest = findDestination(input.address, input.customerNumber);
  const itemsLines =
    input.items.length > 0
      ? input.items.map((it) => `🔹 [${it.sku}] ❯ *${it.quantity} ${it.name}*`)
      : ["🔹 ❯ *פירוט מוצרים כללי*"];
  const dep = `📦 *${input.deposits.bigBags} בלות (60002)* | 🪵 *${input.deposits.pallets} משטחים (60060/60006)* | ⚖️ *${input.totalWeightTons} טון*`;
  const warehouseTag =
    input.assignment.warehouse === "4"
      ? "🚜 @אורן: ליקוט והעמסה ברמפה מחסן 4 החרש 10."
      : "🚜 @תמיר: ליקוט והעמסה ברחבה מחסן 1 התלמיד 6.";
  const km = dest?.distanceKm ?? "—";
  const dur =
    input.assignment.driver === "hakmat"
      ? dest?.craneUnloadMin ?? 35
      : input.assignment.driver === "ali"
        ? dest?.flatbedUnloadMin ?? 15
        : 25;
  const driverTag =
    input.assignment.driver === "hakmat"
      ? `🏗️ @חכמת: הובלת מנוף (${km} ק"מ) | ⏱️ ${dur} דק'.`
      : input.assignment.driver === "ali"
        ? `🚚 @עלי: הובלת פלטה (${km} ק"מ) | פריקה ידנית | ⏱️ ${dur} דק'.`
        : `🚛 @רמסע: שינוע מכולות (${km} ק"מ) | ${input.address}.`;
  const waze = `https://waze.com/ul?q=${encodeURIComponent(input.address || "הוד השרון")}&navigate=yes`;
  return (
    `> 📢 *עדכונים מהסידור | הזמנה #${input.orderNumber}*\n` +
    `> 🏢 *${input.customerName}* (${input.customerNumber !== "טרם שויך" ? `#${input.customerNumber}` : "כללי"}) | 📍 ${input.address} | [Waze](${waze})\n` +
    `> 💬 "${input.rawText}"\n\n` +
    `*מניפסט ליקוט מהיר:*\n${itemsLines.join("\n")}\n${dep}\n\n` +
    `*ביצוע:*\n${warehouseTag}\n${driverTag}`
  );
}

export function buildCustomerReply(client: ClientMatch, inquiryId: number, normalized: NormalizedOrder): string {
  const name = client.contactPerson || client.customerName;
  if (normalized.items.length === 0) {
    return `שלום ${name}! כאן נועה, העוזרת הדיגיטלית של ראמי מח. סבן חומרי בניין.\nאשמח לקלוט את ההזמנה במדויק:\nמיקום האתר, החומרים והכמויות.\nראמי יחזור לאישור מחיר ומועד — אני לא מתחייבת על אלה ישירות.`;
  }
  const items = normalized.items.map((it, i) => `${i + 1}. מק״ט ${it.sku} | ${it.name} × ${it.quantity} ${it.unit}`).join("\n");
  return `תודה ${name}! ההזמנה נקלטה (פנייה #${inquiryId}) עבור אתר ${client.projectSite}.\n\nפירוט החומרים:\n${items}\n\nהעברתי לראמי בסידור לאישור סופי וקביעת מועד אספקה. אינני מאשרת מחירים או מועדים ישירות.`;
}

export function isFridayContainerBlocked(now = new Date()): boolean {
  const day = now.getDay();
  const hour = now.getHours();
  return day === 5 && hour >= 11;
}

export { PRODUCTS, CLIENTS, DESTINATIONS };
