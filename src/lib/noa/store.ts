import { create } from "zustand";
import inquiriesSeed from "@/data/inquiries.json";
import knowledgeSeed from "@/data/knowledge.json";
import meetingsSeed from "@/data/meetings.json";
import {
  assignResources,
  identifyClient,
  parseAndNormalizeMaterials,
  quoteFreight,
  findDestination,
} from "./engine";
import type {
  CommandMode,
  DispatchOrder,
  Inquiry,
  KnowledgeItem,
  Meeting,
} from "./types";

const SEED_TEXTS: { customerName: string; phone: string; text: string; urgency: "normal" | "urgent" }[] = [
  {
    customerName: "meged מגד שיפוצים",
    phone: "0549644335",
    text: "80 שק סומסום, 20 שק טיט מוכן, 7 שק דבק 109 לקרני שומרון. תוסיף 5 קילו רובה טמבור 120",
    urgency: "normal",
  },
  {
    customerName: "אורניל / אבי לוי",
    phone: "0545998111",
    text: "דחוף: 12 ניצבים 50/300, 2 שק חול, 3 בלות חול, בלת סומסום ללוחמי גליפולי 8 אביחיל",
    urgency: "urgent",
  },
  {
    customerName: "אלנבי על הים",
    phone: "0546677112",
    text: "10 שק בטון מוכן ו-3 סיקה טופ 107 לשמוליק סגל 4 תל אביב",
    urgency: "normal",
  },
];

function makeOrder(
  seed: (typeof SEED_TEXTS)[number],
  idx: number,
  status: DispatchOrder["status"],
): DispatchOrder {
  const normalized = parseAndNormalizeMaterials(seed.text);
  const client = identifyClient(seed.text, seed.phone, seed.customerName);
  const assignment = assignResources(seed.text, normalized);
  const dest = findDestination(client.projectSite, client.customerNumber);
  return {
    id: `seed-${idx}`,
    createdAt: new Date(Date.now() - (3 - idx) * 36e5).toISOString(),
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
    notes: client.siteNotes || "",
  };
}

const seedOrders = SEED_TEXTS.map((s, i) => makeOrder(s, i, i === 2 ? "approved" : "pending"));

type MeetingSeed = {
  pending: Array<{
    id: string;
    requesterName: string;
    phone: string;
    meetingTimeText: string;
    targetDateIso: string;
  }>;
  scheduled: Array<{
    id: string;
    requesterName: string;
    phone: string;
    meetingTimeText: string;
    targetDateIso: string;
    reminderSent?: boolean;
  }>;
};

const meetingsRaw = meetingsSeed as MeetingSeed;

const seedMeetings: Meeting[] = [
  ...meetingsRaw.pending.map((m) => ({
    id: m.id,
    requesterName: m.requesterName,
    phone: m.phone,
    meetingTimeText: m.meetingTimeText || "היום 09:00",
    targetDateIso: m.targetDateIso,
    status: "pending" as const,
  })),
  ...meetingsRaw.scheduled.map((m) => ({
    id: m.id,
    requesterName: m.requesterName,
    phone: m.phone,
    meetingTimeText: m.meetingTimeText,
    targetDateIso: m.targetDateIso,
    status: "scheduled" as const,
    reminderSent: m.reminderSent,
  })),
  {
    id: "meet-rami-0900",
    requesterName: "ראמי / הנהלה",
    phone: "0508860896",
    meetingTimeText: "היום (רביעי, 7.10) בשעה 09:00",
    targetDateIso: "2026-10-07T06:00:00.000Z",
    status: "scheduled",
  },
];

type NoaState = {
  commandMode: CommandMode;
  inquiries: Inquiry[];
  knowledge: KnowledgeItem[];
  meetings: Meeting[];
  orders: DispatchOrder[];
  nextInquiryId: number;
  setCommandMode: (mode: CommandMode) => void;
  markInquiryHandled: (id: number) => void;
  addKnowledge: (text: string) => void;
  confirmMeeting: (id: string) => void;
  enqueueOrder: (order: DispatchOrder) => void;
  approveOrder: (id: string) => void;
  rejectOrder: (id: string) => void;
  resetDemo: () => void;
};

const initial = {
  commandMode: "manual_off" as CommandMode,
  inquiries: inquiriesSeed as Inquiry[],
  knowledge: knowledgeSeed as KnowledgeItem[],
  meetings: seedMeetings,
  orders: seedOrders,
  nextInquiryId: ((inquiriesSeed as Inquiry[]).at(-1)?.id ?? 61) + 1,
};

export const useNoaStore = create<NoaState>()((set, get) => ({
  ...initial,
  setCommandMode: (commandMode) => set({ commandMode }),
  markInquiryHandled: (id) =>
    set({
      inquiries: get().inquiries.map((i) => (i.id === id ? { ...i, handled: true, status: "טופל" } : i)),
    }),
  addKnowledge: (text) => {
    const note = text.trim();
    if (!note) return;
    const item: KnowledgeItem = {
      id: "k-" + (get().knowledge.length + 1),
      text: note,
      timestamp: new Date().toISOString(),
      author: "ראמי",
      category: "הוראה חדשה",
    };
    set({ knowledge: [...get().knowledge, item] });
  },
  confirmMeeting: (id) =>
    set({
      meetings: get().meetings.map((m) => (m.id === id ? { ...m, status: "scheduled" } : m)),
    }),
  enqueueOrder: (order) => set({ orders: [...get().orders, order] }),
  approveOrder: (id) =>
    set({
      orders: get().orders.map((o) => (o.id === id ? { ...o, status: "approved" } : o)),
    }),
  rejectOrder: (id) => set({ orders: get().orders.filter((o) => o.id !== id) }),
  resetDemo: () => set({ ...initial }),
}));

