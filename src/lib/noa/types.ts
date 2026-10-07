export type Product = {
  sku: string;
  name: string;
  unit: string;
  keywords: string[];
  weightTon: number;
  isBigBag: boolean;
  isPalletItem: boolean;
  isBlock: boolean;
  isMetal: boolean;
  isDrywall: boolean;
  palletThreshold: number | null;
  rules: string;
  pkg: string;
};

export type ClientRecord = {
  name: string;
  customerNumber: string;
  aliases: string[];
  contactPerson: string;
  phones: string[];
  defaultSite: string;
  zone: string;
  preferredVehicle: string;
  typicalUnloadMin: number;
  commonBasket: string[];
  siteNotes: string;
};

export type Destination = {
  customerName: string;
  customerNumber: string;
  address: string;
  city: string;
  distanceKm: number;
  craneUnloadMin: number;
  flatbedUnloadMin: number;
  ituranNotes: string;
};

export type KnowledgeItem = {
  id: string;
  category?: string;
  text: string;
  timestamp: string;
  author: string;
};

export type InquiryKind =
  | "order"
  | "meeting"
  | "vip"
  | "ops"
  | "credit"
  | "driver"
  | "internal"
  | "noise"
  | "general";

export type Inquiry = {
  id: number;
  timestamp: string;
  displayTime: string;
  customerName: string;
  phone: string;
  site: string;
  details: string;
  urgency: string;
  status: string;
  kind: InquiryKind;
  handled?: boolean;
};

export type ParsedItem = {
  sku: string;
  name: string;
  unit: string;
  quantity: number;
  isBigBag: boolean;
  weightTon: number;
  rules: string;
};

export type Deposits = {
  bigBags: number;
  pallets: number;
  woodPallets: number;
  blockPallets: number;
};

export type NormalizedOrder = {
  items: ParsedItem[];
  deposits: Deposits;
  totalWeightTons: number;
  hasBlocks: boolean;
  hasDrywall: boolean;
  hasHeavyItems: boolean;
};

export type ClientMatch = {
  customerName: string;
  customerNumber: string;
  projectSite: string;
  contactPerson: string;
  isKnown: boolean;
  siteNotes?: string;
  zone?: string;
};

export type Assignment = {
  driver: "hakmat" | "ali" | "ramsa";
  driverLabel: string;
  warehouse: "4" | "1";
  warehouseLabel: string;
  picker: string;
  overload: boolean;
};

export type FreightQuote = {
  sku: string;
  name: string;
  baseIls: number;
  extraKm: number;
  extraIls: number;
  totalIls: number;
  zone: string;
};

export type DispatchOrder = {
  id: string;
  createdAt: string;
  customerName: string;
  customerNumber: string;
  phone: string;
  address: string;
  rawText: string;
  items: ParsedItem[];
  deposits: Deposits;
  totalWeightTons: number;
  assignment: Assignment;
  freight: FreightQuote | null;
  source: "whatsapp" | "parser" | "inbox";
  status: "pending" | "approved" | "broadcast";
  urgency: "normal" | "urgent";
  notes: string;
};

export type Meeting = {
  id: string;
  requesterName: string;
  phone: string;
  meetingTimeText: string;
  targetDateIso: string;
  status: "pending" | "scheduled";
  reminderSent?: boolean;
};

export type CommandMode = "manual_on" | "manual_off" | "scheduled";
