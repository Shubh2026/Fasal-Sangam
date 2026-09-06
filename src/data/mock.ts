/* ── Fasal Sangam · curated prototype dataset (Punjab belt) ─────────────── */

export type CropId = "tomato" | "onion" | "potato" | "wheat" | "maize" | "apple";

export interface CropInfo {
  id: CropId;
  name: string;
  hindi: string;
  image: string;
  tint: string; // tailwind bg class for chips
  text: string;
}

export const crops: CropInfo[] = [
  { id: "tomato", name: "Tomato", hindi: "टमाटर", image: "/images/crops/tomato.jpg", tint: "bg-red-50", text: "text-red-700" },
  { id: "onion", name: "Onion", hindi: "प्याज़", image: "/images/crops/onion.jpg", tint: "bg-fuchsia-50", text: "text-fuchsia-700" },
  { id: "potato", name: "Potato", hindi: "आलू", image: "/images/crops/potato.jpg", tint: "bg-amber-50", text: "text-amber-800" },
  { id: "wheat", name: "Wheat", hindi: "गेहूं", image: "/images/crops/wheat.jpg", tint: "bg-yellow-50", text: "text-yellow-800" },
  { id: "maize", name: "Maize", hindi: "मक्की", image: "/images/crops/maize.jpg", tint: "bg-lime-50", text: "text-lime-700" },
  { id: "apple", name: "Apple", hindi: "सेब", image: "/images/crops/apple.jpg", tint: "bg-rose-50", text: "text-rose-700" },
];

export const cropById = Object.fromEntries(crops.map((c) => [c.id, c])) as Record<CropId, CropInfo>;

/* ── Identities ─────────────────────────────────────────────────────────── */
export const farmerIdentity = {
  name: "Gurpreet Singh",
  org: "GreenField Farm, Rajpura",
  location: "Rajpura, Patiala · Punjab",
};
export const buyerIdentity = { name: "Aditya Mehra", org: "FreshMart Wholesale", location: "Chandigarh" };
export const adminIdentity = { name: "Platform Operations", org: "Fasal Sangam Network" };

/* ── Farmer produce listings ────────────────────────────────────────────── */
export type ListingStatus = "listed" | "matched" | "in-order" | "delivered";
export interface ProduceListing {
  id: string;
  crop: CropId;
  qty: number;
  harvest: string;
  harvestIn: string;
  grade: "A" | "B";
  price: number; // ₹ per kg expected
  location: string;
  status: ListingStatus;
  matchedQty?: number;
  potentialBuyers?: number;
  addedByUser?: boolean;
}

export const farmerListings: ProduceListing[] = [
  { id: "L-3081", crop: "tomato", qty: 750, harvest: "12–15 Sep", harvestIn: "2–4 days", grade: "A", price: 30, location: "Rajpura, Patiala", status: "matched", matchedQty: 350, potentialBuyers: 3 },
  { id: "L-3076", crop: "onion", qty: 500, harvest: "18 Sep", harvestIn: "7 days", grade: "A", price: 22, location: "Rajpura, Patiala", status: "listed", potentialBuyers: 2 },
  { id: "L-3059", crop: "potato", qty: 600, harvest: "20 Sep", harvestIn: "9 days", grade: "B", price: 16, location: "Rajpura, Patiala", status: "listed" },
];

/* ── Farmer dashboard recent orders ─────────────────────────────────────── */
export const farmerRecentOrders = [
  { id: "FS-1024", crop: "tomato", qty: 350, amount: 10500, buyer: "FreshMart Wholesale", status: "In Transit", date: "12 Sep" },
  { id: "FS-1017", crop: "potato", qty: 400, amount: 6400, buyer: "CityFresh Retail", status: "Delivered", date: "6 Sep" },
  { id: "FS-1009", crop: "onion", qty: 300, amount: 6600, buyer: "Regional Distributor", status: "Delivered", date: "28 Aug" },
  { id: "FS-0998", crop: "wheat", qty: 1200, amount: 27000, buyer: "Punjab Grain Corp", status: "Delivered", date: "18 Aug" },
];

/* ── Smart buyer matches (farmer view) ──────────────────────────────────── */
export interface BuyerMatch {
  id: string;
  crop: CropId;
  buyer: string;
  buyerType: "Wholesale" | "Retail" | "Distributor";
  required: number;
  networkAvailable: number;
  yourShare: number;
  distance: number; // km
  harvestWindow: string;
  grade: "A" | "B";
  score: number;
  price: number;
  logistics: number;
  deliveryBy: string;
}

export const farmerMatches: BuyerMatch[] = [
  { id: "M-01", crop: "tomato", buyer: "FreshMart Wholesale", buyerType: "Wholesale", required: 1000, networkAvailable: 1050, yourShare: 350, distance: 32, harvestWindow: "12–15 Sep", grade: "A", score: 94, price: 30, logistics: 2, deliveryBy: "15 Sep" },
  { id: "M-02", crop: "tomato", buyer: "CityFresh Retail", buyerType: "Retail", required: 500, networkAvailable: 520, yourShare: 200, distance: 41, harvestWindow: "12–14 Sep", grade: "A", score: 87, price: 29, logistics: 2, deliveryBy: "14 Sep" },
  { id: "M-03", crop: "onion", buyer: "Regional Distributor", buyerType: "Distributor", required: 700, networkAvailable: 760, yourShare: 300, distance: 55, harvestWindow: "18–20 Sep", grade: "A", score: 81, price: 21, logistics: 3, deliveryBy: "19 Sep" },
];

/* ── Buyer requirements & marketplace ───────────────────────────────────── */
export interface BuyerRequirement {
  id: string;
  crop: CropId;
  qty: number;
  delivery: string;
  maxPrice: number;
  matchedPct: number;
  status: "Matched" | "Matching" | "Finding suppliers";
  quality: string;
}

export const buyerRequirements: BuyerRequirement[] = [
  { id: "R-201", crop: "tomato", qty: 1000, delivery: "15 Sep", maxPrice: 34, matchedPct: 92, status: "Matched", quality: "Grade A" },
  { id: "R-204", crop: "onion", qty: 750, delivery: "18 Sep", maxPrice: 26, matchedPct: 78, status: "Matching", quality: "Grade A" },
  { id: "R-207", crop: "potato", qty: 1500, delivery: "20 Sep", maxPrice: 20, matchedPct: 0, status: "Finding suppliers", quality: "Grade B" },
];

export interface AggregateSupply {
  id: string;
  crop: CropId;
  avgPrice: number;
  priceTrend: number;
  available: number;
  sources: string;
  farmerCount: number;
  fpoCount: number;
  location: string;
  distance: number;
  harvest: string;
  grade: string;
}

export const marketplaceSupply: AggregateSupply[] = [
  { id: "S-T1", crop: "tomato", avgPrice: 30, priceTrend: 6, available: 1250, sources: "3 farmers + 1 FPO", farmerCount: 3, fpoCount: 1, location: "Patiala", distance: 42, harvest: "12–15 Sep", grade: "A" },
  { id: "S-O1", crop: "onion", avgPrice: 22, priceTrend: 4, available: 2100, sources: "5 farmers + 2 FPO", farmerCount: 5, fpoCount: 2, location: "Ludhiana", distance: 96, harvest: "18–20 Sep", grade: "A" },
  { id: "S-P1", crop: "potato", avgPrice: 16, priceTrend: -3, available: 3400, sources: "6 farmers + 1 FPO", farmerCount: 6, fpoCount: 1, location: "Jalandhar", distance: 110, harvest: "20–24 Sep", grade: "B" },
  { id: "S-W1", crop: "wheat", avgPrice: 24, priceTrend: 9, available: 8400, sources: "12 farmers + 3 FPO", farmerCount: 12, fpoCount: 3, location: "Mohali", distance: 24, harvest: "Ready stock", grade: "A" },
  { id: "S-M1", crop: "maize", avgPrice: 19, priceTrend: 5, available: 1600, sources: "4 farmers", farmerCount: 4, fpoCount: 0, location: "Kharar", distance: 18, harvest: "16–18 Sep", grade: "A" },
  { id: "S-A1", crop: "apple", avgPrice: 68, priceTrend: 12, available: 900, sources: "2 farmers + 1 FPO", farmerCount: 2, fpoCount: 1, location: "Kharar", distance: 22, harvest: "14–17 Sep", grade: "A" },
];

export const supplyBreakdown: Record<string, { name: string; type: string; qty: number; grade: string; distance: number; location: string }[]> = {
  "S-T1": [
    { name: "Gurpreet Singh", type: "Farmer", qty: 350, grade: "A", distance: 32, location: "Rajpura" },
    { name: "Simran Kaur", type: "Farmer", qty: 250, grade: "A", distance: 41, location: "Mohali" },
    { name: "Patiala FPO", type: "FPO", qty: 400, grade: "A", distance: 38, location: "Patiala" },
    { name: "Harpal Brar", type: "Farmer", qty: 250, grade: "B", distance: 47, location: "Nabha" },
  ],
  "S-O1": [
    { name: "Ludhiana Greens FPO", type: "FPO", qty: 900, grade: "A", distance: 96, location: "Ludhiana" },
    { name: "Kulwinder Singh", type: "Farmer", qty: 600, grade: "A", distance: 88, location: "Khanna" },
    { name: "Satnam Deol", type: "Farmer", qty: 600, grade: "B", distance: 92, location: "Samrala" },
  ],
};

/* ── Canonical hero order FS-1024 ───────────────────────────────────────── */
export interface SupplierShare {
  name: string;
  type: "Farmer" | "FPO";
  qty: number;
  amount: number;
  location: string;
  distance: number;
}
export interface OrderTimelineEvent {
  label: string;
  time: string;
  done: boolean;
}
export interface FSOrder {
  id: string;
  crop: CropId;
  qty: number;
  grade: string;
  buyer: string;
  buyerLocation: string;
  value: number;
  farmerPayout: number;
  logistics: number;
  status: "Confirmed" | "Preparing" | "Pickup Scheduled" | "In Transit" | "Delivered";
  suppliers: SupplierShare[];
  timeline: OrderTimelineEvent[];
  route: { stops: string[]; distance: number; optimized: number; eta: string; vehicle: string; driver: string };
  matchScore: number;
  deliveryDate: string;
}

export const heroOrder: FSOrder = {
  id: "FS-1024",
  crop: "tomato",
  qty: 1000,
  grade: "Grade A",
  buyer: "FreshMart Wholesale",
  buyerLocation: "Chandigarh",
  value: 32000,
  farmerPayout: 30000,
  logistics: 2000,
  status: "In Transit",
  matchScore: 94,
  deliveryDate: "15 Sep",
  suppliers: [
    { name: "Gurpreet Singh", type: "Farmer", qty: 350, amount: 10500, location: "GreenField Farm, Rajpura", distance: 32 },
    { name: "Simran Kaur", type: "Farmer", qty: 250, amount: 7500, location: "Sector 82 Farm, Mohali", distance: 41 },
    { name: "Patiala FPO", type: "FPO", qty: 400, amount: 12000, location: "FPO Collection Centre, Patiala", distance: 38 },
  ],
  timeline: [
    { label: "Order placed", time: "12 Sep, 8:40 AM", done: true },
    { label: "Farmers matched", time: "12 Sep, 9:05 AM", done: true },
    { label: "Produce being prepared", time: "12 Sep, 4:30 PM", done: true },
    { label: "Pickup scheduled", time: "13 Sep, 6:00 AM", done: true },
    { label: "In transit", time: "13 Sep, 12:10 PM", done: true },
    { label: "Delivered", time: "ETA 3:30 PM", done: false },
  ],
  route: {
    stops: ["GreenField Farm, Rajpura", "Sector 82 Farm, Mohali", "Patiala FPO Centre", "FreshMart DC, Chandigarh"],
    distance: 86,
    optimized: 68,
    eta: "15 Sep, 3:30 PM",
    vehicle: "PB-11-C-1234",
    driver: "Harjeet Singh",
  },
};

export const buyerOrders: FSOrder[] = [
  heroOrder,
  {
    id: "FS-1018",
    crop: "onion",
    qty: 600,
    grade: "Grade A",
    buyer: "FreshMart Wholesale",
    buyerLocation: "Chandigarh",
    value: 14400,
    farmerPayout: 13200,
    logistics: 1200,
    status: "Preparing",
    matchScore: 89,
    deliveryDate: "18 Sep",
    suppliers: [
      { name: "Ludhiana Greens FPO", type: "FPO", qty: 400, amount: 8800, location: "Ludhiana", distance: 96 },
      { name: "Kulwinder Singh", type: "Farmer", qty: 200, amount: 4400, location: "Khanna", distance: 88 },
    ],
    timeline: [
      { label: "Order placed", time: "11 Sep, 10:12 AM", done: true },
      { label: "Farmers matched", time: "11 Sep, 10:34 AM", done: true },
      { label: "Produce being prepared", time: "12 Sep, 9:00 AM", done: true },
      { label: "Pickup scheduled", time: "16 Sep, 7:00 AM", done: false },
      { label: "In transit", time: "—", done: false },
      { label: "Delivered", time: "ETA 18 Sep", done: false },
    ],
    route: { stops: ["Ludhiana Greens FPO", "Khanna cluster", "FreshMart DC, Chandigarh"], distance: 118, optimized: 96, eta: "18 Sep, 2:00 PM", vehicle: "PB-08-G-5521", driver: "Gurmail Singh" },
  },
  {
    id: "FS-1004",
    crop: "potato",
    qty: 800,
    grade: "Grade B",
    buyer: "FreshMart Wholesale",
    buyerLocation: "Chandigarh",
    value: 14400,
    farmerPayout: 12800,
    logistics: 1600,
    status: "Delivered",
    matchScore: 91,
    deliveryDate: "6 Sep",
    suppliers: [
      { name: "Harjeet Farms", type: "Farmer", qty: 500, amount: 8000, location: "Jalandhar", distance: 110 },
      { name: "Doaba FPO", type: "FPO", qty: 300, amount: 4800, location: "Kapurthala", distance: 102 },
    ],
    timeline: [
      { label: "Order placed", time: "3 Sep, 9:00 AM", done: true },
      { label: "Farmers matched", time: "3 Sep, 9:22 AM", done: true },
      { label: "Produce being prepared", time: "4 Sep, 8:00 AM", done: true },
      { label: "Pickup scheduled", time: "5 Sep, 6:30 AM", done: true },
      { label: "In transit", time: "5 Sep, 1:40 PM", done: true },
      { label: "Delivered", time: "6 Sep, 11:20 AM", done: true },
    ],
    route: { stops: ["Harjeet Farms, Jalandhar", "Doaba FPO, Kapurthala", "FreshMart DC, Chandigarh"], distance: 124, optimized: 104, eta: "Delivered 6 Sep, 11:20 AM", vehicle: "PB-10-T-7720", driver: "Balwinder Singh" },
  },
];

/* ── Demand forecasts (prototype datasets) ──────────────────────────────── */
export interface CropForecast {
  crop: CropId;
  current: number;
  forecast: number;
  trend: number;
  confidence: "High" | "Medium";
  history: { label: string; value: number }[];
  future: { label: string; value: number }[];
  recommendation: string;
  regionalDemand: string;
  suggestedPrice: string;
  potentialBuyers: number;
}

export const forecasts: Record<CropId, CropForecast> = {
  tomato: {
    crop: "tomato", current: 820, forecast: 1050, trend: 28, confidence: "High",
    history: [ { label: "12 Aug", value: 520 }, { label: "19 Aug", value: 610 }, { label: "26 Aug", value: 660 }, { label: "2 Sep", value: 720 }, { label: "9 Sep", value: 780 }, { label: "This week", value: 820 } ],
    future: [ { label: "Next week", value: 940 }, { label: "Week 8", value: 1050 } ],
    recommendation: "Demand is trending upward as restaurant and retail orders rise in Chandigarh region. Farmers within 50 km may consider listing upcoming tomato harvests.",
    regionalDemand: "High", suggestedPrice: "₹28–32/kg", potentialBuyers: 7,
  },
  onion: {
    crop: "onion", current: 1200, forecast: 1340, trend: 12, confidence: "High",
    history: [ { label: "12 Aug", value: 980 }, { label: "19 Aug", value: 1020 }, { label: "26 Aug", value: 1060 }, { label: "2 Sep", value: 1110 }, { label: "9 Sep", value: 1160 }, { label: "This week", value: 1200 } ],
    future: [ { label: "Next week", value: 1280 }, { label: "Week 8", value: 1340 } ],
    recommendation: "Steady rise driven by wholesale demand from Ludhiana. Early listings around 18 Sep are likely to match quickly.",
    regionalDemand: "Medium-High", suggestedPrice: "₹20–23/kg", potentialBuyers: 5,
  },
  potato: {
    crop: "potato", current: 950, forecast: 870, trend: -8, confidence: "Medium",
    history: [ { label: "12 Aug", value: 1080 }, { label: "19 Aug", value: 1060 }, { label: "26 Aug", value: 1030 }, { label: "2 Sep", value: 1000 }, { label: "9 Sep", value: 970 }, { label: "This week", value: 950 } ],
    future: [ { label: "Next week", value: 910 }, { label: "Week 8", value: 870 } ],
    recommendation: "Supply is expected to tighten slightly, but demand is easing. Price-sensitive buyers may wait — list early to lock volumes.",
    regionalDemand: "Moderate", suggestedPrice: "₹15–18/kg", potentialBuyers: 4,
  },
  wheat: {
    crop: "wheat", current: 2100, forecast: 2440, trend: 16, confidence: "High",
    history: [ { label: "12 Aug", value: 1700 }, { label: "19 Aug", value: 1780 }, { label: "26 Aug", value: 1860 }, { label: "2 Sep", value: 1940 }, { label: "9 Sep", value: 2030 }, { label: "This week", value: 2100 } ],
    future: [ { label: "Next week", value: 2260 }, { label: "Week 8", value: 2440 } ],
    recommendation: "Institutional buyers in Mohali are stock-building. Ready-stock wheat is matching within 24 hours.",
    regionalDemand: "High", suggestedPrice: "₹23–25/kg", potentialBuyers: 9,
  },
  maize: {
    crop: "maize", current: 640, forecast: 690, trend: 8, confidence: "Medium",
    history: [ { label: "12 Aug", value: 520 }, { label: "19 Aug", value: 560 }, { label: "26 Aug", value: 580 }, { label: "2 Sep", value: 600 }, { label: "9 Sep", value: 620 }, { label: "This week", value: 640 } ],
    future: [ { label: "Next week", value: 665 }, { label: "Week 8", value: 690 } ],
    recommendation: "Poultry-feed demand from Kharar cluster is stable. Expect quick matches for Grade A lots.",
    regionalDemand: "Medium", suggestedPrice: "₹18–20/kg", potentialBuyers: 3,
  },
  apple: {
    crop: "apple", current: 380, forecast: 460, trend: 21, confidence: "Medium",
    history: [ { label: "12 Aug", value: 260 }, { label: "19 Aug", value: 290 }, { label: "26 Aug", value: 310 }, { label: "2 Sep", value: 330 }, { label: "9 Sep", value: 355 }, { label: "This week", value: 380 } ],
    future: [ { label: "Next week", value: 420 }, { label: "Week 8", value: 460 } ],
    recommendation: "Retail demand rising ahead of the festive season. Cold-storage ready lots fetch the best price.",
    regionalDemand: "Rising", suggestedPrice: "₹64–72/kg", potentialBuyers: 6,
  },
};

/* ── Admin network data ─────────────────────────────────────────────────── */
export const networkKpis = {
  farmers: 1284, buyers: 186, listedKg: 42850, ordersThisMonth: 328, gmv: "₹18.4 L",
};

export const supplyDemandSeries = [
  { crop: "Tomato", supply: 12100, demand: 15300 },
  { crop: "Onion", supply: 18400, demand: 16900 },
  { crop: "Potato", supply: 22600, demand: 19800 },
  { crop: "Wheat", supply: 31400, demand: 29700 },
  { crop: "Maize", supply: 9800, demand: 11200 },
  { crop: "Apple", supply: 4600, demand: 5400 },
];

export const matchPerformance = { total: 328, matched: 284, partial: 31, unmatched: 13, rate: 86.6 };

export const logisticsKpis = { activeRoutes: 24, optimized: 18, avgDistance: 64, avgDelivery: 1.4 };

export const adminRoutes = [
  { id: "RT-1042", order: "FS-1024", crop: "tomato", stops: 4, qty: 1000, distance: 68, eta: "3:30 PM", status: "In Transit", driver: "Harjeet Singh", vehicle: "PB-11-C-1234", progress: 0.62 },
  { id: "RT-1039", order: "FS-1018", crop: "onion", stops: 3, qty: 600, distance: 96, eta: "18 Sep", status: "Scheduled", driver: "Gurmail Singh", vehicle: "PB-08-G-5521", progress: 0 },
  { id: "RT-1036", order: "FS-1012", crop: "wheat", stops: 5, qty: 2400, distance: 74, eta: "1:15 PM", status: "In Transit", driver: "Jasbir Singh", vehicle: "PB-11-B-0876", progress: 0.81 },
  { id: "RT-1031", order: "FS-1009", crop: "maize", stops: 3, qty: 900, distance: 42, eta: "Completed", status: "Completed", driver: "Sukhdev Singh", vehicle: "PB-65-K-3412", progress: 1 },
];

export const adminOrdersTable = [
  { id: "FS-1024", crop: "tomato", qty: 1000, buyer: "FreshMart Wholesale", value: 32000, status: "In Transit", match: 94, date: "15 Sep" },
  { id: "FS-1023", crop: "apple", qty: 300, buyer: "CityFresh Retail", value: 21300, status: "Pickup Scheduled", match: 91, date: "15 Sep" },
  { id: "FS-1021", crop: "wheat", qty: 2400, buyer: "Punjab Grain Corp", value: 57600, status: "In Transit", match: 96, date: "14 Sep" },
  { id: "FS-1018", crop: "onion", qty: 600, buyer: "FreshMart Wholesale", value: 14400, status: "Preparing", match: 89, date: "18 Sep" },
  { id: "FS-1016", crop: "maize", qty: 900, buyer: "FeedWorks Punjab", value: 18000, status: "Confirmed", match: 85, date: "17 Sep" },
  { id: "FS-1012", crop: "wheat", qty: 1200, buyer: "Ambala Flour Mills", value: 28800, status: "In Transit", match: 93, date: "14 Sep" },
  { id: "FS-1009", crop: "maize", qty: 750, buyer: "FeedWorks Punjab", value: 15000, status: "In Transit", match: 88, date: "13 Sep" },
  { id: "FS-1004", crop: "potato", qty: 800, buyer: "FreshMart Wholesale", value: 14400, status: "Delivered", match: 91, date: "6 Sep" },
];

export const supplyPool = [
  { name: "Gurpreet Singh", type: "Farmer", crop: "tomato", qty: 350, distance: 32, grade: "A" },
  { name: "Simran Kaur", type: "Farmer", crop: "tomato", qty: 250, distance: 41, grade: "A" },
  { name: "Patiala FPO", type: "FPO", crop: "tomato", qty: 400, distance: 38, grade: "A" },
  { name: "Harpal Brar", type: "Farmer", crop: "tomato", qty: 250, distance: 47, grade: "B" },
  { name: "Nabha Agro FPO", type: "FPO", crop: "tomato", qty: 300, distance: 52, grade: "A" },
  { name: "Rajvir Singh", type: "Farmer", crop: "onion", qty: 200, distance: 60, grade: "A" },
  { name: "Kharar Farms", type: "Farmer", crop: "tomato", qty: 150, distance: 33, grade: "B" },
  { name: "Manpreet Gill", type: "Farmer", crop: "tomato", qty: 180, distance: 58, grade: "A" },
  { name: "Amritsar Mandi FPO", type: "FPO", crop: "potato", qty: 500, distance: 140, grade: "B" },
  { name: "Sarabjit Kaur", type: "Farmer", crop: "tomato", qty: 120, distance: 44, grade: "A" },
  { name: "Doaba Valley FPO", type: "FPO", crop: "onion", qty: 350, distance: 105, grade: "A" },
  { name: "Kuldeep Sidhu", type: "Farmer", crop: "tomato", qty: 200, distance: 66, grade: "B" },
];

/* ── Notifications ──────────────────────────────────────────────────────── */
export type NotifIcon = "match" | "demand" | "pickup" | "order" | "route" | "price";
export interface FSNotification {
  id: string;
  text: string;
  time: string;
  icon: NotifIcon;
  unread: boolean;
}
export const seedNotifications: Record<"farmer" | "buyer" | "admin", FSNotification[]> = {
  farmer: [
    { id: "n-f1", text: "Your tomato produce matched with FreshMart Wholesale — order FS-1024.", time: "2h ago", icon: "match", unread: true },
    { id: "n-f2", text: "Demand for onions increased by 12% this week in your region.", time: "5h ago", icon: "demand", unread: true },
    { id: "n-f3", text: "Pickup scheduled for 15 Sep, 9:00 AM at GreenField Farm.", time: "Yesterday", icon: "pickup", unread: false },
  ],
  buyer: [
    { id: "n-b1", text: "Your tomato requirement (1,000 kg) is 92% matched.", time: "1h ago", icon: "match", unread: true },
    { id: "n-b2", text: "3 suppliers aggregated to fulfil order FS-1024.", time: "3h ago", icon: "order", unread: true },
    { id: "n-b3", text: "Delivery FS-1024 estimated arrival 3:30 PM today.", time: "20m ago", icon: "route", unread: true },
  ],
  admin: [
    { id: "n-a1", text: "24 routes active · 18 optimized by routing engine.", time: "10m ago", icon: "route", unread: true },
    { id: "n-a2", text: "Network match rate improved to 86.6% this week.", time: "1h ago", icon: "match", unread: true },
    { id: "n-a3", text: "New FPO onboarded: Ludhiana Greens Collective.", time: "Yesterday", icon: "order", unread: false },
  ],
};

/* ── Global search index ────────────────────────────────────────────────── */
export interface SearchEntry { label: string; sub?: string; type: "Crop" | "Order" | "Buyer" | "Farmer" | "FPO" | "Page"; href: string }
export const searchIndex: SearchEntry[] = [
  { label: "Tomato Supply", sub: "1,250 kg · Patiala cluster", type: "Crop", href: "/buyer/product/S-T1" },
  { label: "Onion Supply", sub: "2,100 kg · Ludhiana cluster", type: "Crop", href: "/buyer/marketplace?crop=onion" },
  { label: "Tomato Demand Forecast", sub: "+28% next week", type: "Page", href: "/admin/demand?crop=tomato" },
  { label: "Order FS-1024", sub: "Tomato · 1,000 kg · In Transit", type: "Order", href: "/buyer/tracking" },
  { label: "FreshMart Wholesale", sub: "Buyer · Chandigarh", type: "Buyer", href: "/buyer/dashboard" },
  { label: "Gurpreet Singh", sub: "Farmer · Rajpura, Patiala", type: "Farmer", href: "/farmer/profile" },
  { label: "Patiala FPO", sub: "Farmer Producer Organisation", type: "FPO", href: "/admin/supply" },
  { label: "Matching Center", sub: "Run the matching engine", type: "Page", href: "/admin/matching" },
  { label: "Create Requirement", sub: "Buyer flow", type: "Page", href: "/buyer/create-request" },
  { label: "List Produce", sub: "Farmer flow", type: "Page", href: "/farmer/produce/new" },
];

export const cropList = ["Tomato", "Onion", "Potato", "Wheat", "Rice", "Maize", "Apple"];
export const locationList = ["Rajpura, Patiala", "Patiala", "Mohali", "Kharar", "Chandigarh", "Ludhiana", "Khanna", "Amritsar"];
