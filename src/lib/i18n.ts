export const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
] as const;

export type Lang = (typeof languages)[number]["code"];

const en = {
  "nav.dashboard": "Dashboard",
  "nav.produce": "My Produce",
  "nav.orders": "Orders",
  "nav.matches": "Smart Matches",
  "nav.earnings": "Earnings",
  "nav.profile": "Profile",
  "nav.marketplace": "Marketplace",
  "nav.createRequest": "Create Requirement",
  "nav.tracking": "Track Orders",
  "nav.forecast": "Demand Forecast",
  "nav.network": "Network",
  "nav.supply": "Supply",
  "nav.demand": "Demand",
  "nav.matching": "Matching Center",
  "nav.logistics": "Logistics",
  "nav.insights": "AI Insights",

  "greeting.morning": "Good Morning",
  "greeting.location": "Rajpura, Patiala · Punjab",
  "search.placeholder": "Search crops, orders, buyers…",
  "common.notifications": "Notifications",
  "common.viewAll": "View all",
  "common.viewDetails": "View Details",
  "common.findBuyers": "Find Buyers",
  "common.listProduce": "List Your Produce",
  "common.acceptMatch": "Accept Match",

  "farmer.kpi.listed": "Total Produce Listed",
  "farmer.kpi.matched": "Matched",
  "farmer.kpi.pending": "Pending Orders",
  "farmer.kpi.earnings": "Estimated Earnings",
  "farmer.upcomingHarvest": "Upcoming Harvest",
  "farmer.activeMatches": "Active Matches",
  "farmer.recentOrders": "Recent Orders",
  "farmer.aiInsight": "AI Market Insight",

  "role.viewAs": "View demo as",
} as const;

export type LangKey = keyof typeof en;

const hi: Record<LangKey, string> = {
  "nav.dashboard": "डैशबोर्ड",
  "nav.produce": "मेरी उपज",
  "nav.orders": "आर्डर",
  "nav.matches": "स्मार्ट मैच",
  "nav.earnings": "कमाई",
  "nav.profile": "प्रोफ़ाइल",
  "nav.marketplace": "बाज़ार",
  "nav.createRequest": "माँग भेजें",
  "nav.tracking": "आर्डर ट्रैक करें",
  "nav.forecast": "माँग पूर्वानुमान",
  "nav.network": "नेटवर्क",
  "nav.supply": "आपूर्ति",
  "nav.demand": "माँग",
  "nav.matching": "मिलान केंद्र",
  "nav.logistics": "परिवहन",
  "nav.insights": "एआई जानकारी",

  "greeting.morning": "सुप्रभात",
  "greeting.location": "राजपुरा, पटियाला · पंजाब",
  "search.placeholder": "फसल, आर्डर, खरीदार खोजें…",
  "common.notifications": "सूचनाएं",
  "common.viewAll": "सभी देखें",
  "common.viewDetails": "विवरण देखें",
  "common.findBuyers": "खरीदार खोजें",
  "common.listProduce": "अपनी उपज सूचीबद्ध करें",
  "common.acceptMatch": "मैच स्वीकार करें",

  "farmer.kpi.listed": "सूचीबद्ध कुल उपज",
  "farmer.kpi.matched": "मैच हुई उपज",
  "farmer.kpi.pending": "लंबित आर्डर",
  "farmer.kpi.earnings": "अनुमानित कमाई",
  "farmer.upcomingHarvest": "आगामी फसल कटाई",
  "farmer.activeMatches": "सक्रिय मैच",
  "farmer.recentOrders": "हाल के आर्डर",
  "farmer.aiInsight": "एआई बाज़ार जानकारी",

  "role.viewAs": "डेमो देखें",
};

const pa: Record<LangKey, string> = {
  "nav.dashboard": "ਡੈਸ਼ਬੋਰਡ",
  "nav.produce": "ਮੇਰੀ ਫ਼ਸਲ",
  "nav.orders": "ਆਰਡਰ",
  "nav.matches": "ਸਮਾਰਟ ਮੈਚ",
  "nav.earnings": "ਕਮਾਈ",
  "nav.profile": "ਪ੍ਰੋਫ਼ਾਈਲ",
  "nav.marketplace": "ਮੰਡੀ",
  "nav.createRequest": "ਮੰਗ ਭੇਜੋ",
  "nav.tracking": "ਆਰਡਰ ਟਰੈਕ ਕਰੋ",
  "nav.forecast": "ਮੰਗ ਪੂਰਵ-ਅਨੁਮਾਨ",
  "nav.network": "ਨੈੱਟਵਰਕ",
  "nav.supply": "ਸਪਲਾਈ",
  "nav.demand": "ਮੰਗ",
  "nav.matching": "ਮਿਲਾਨ ਕੇਂਦਰ",
  "nav.logistics": "ਢੋਆ-ਢੁਆਈ",
  "nav.insights": "ਏਆਈ ਜਾਣਕਾਰੀ",

  "greeting.morning": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
  "greeting.location": "ਰਾਜਪੁਰਾ, ਪਟਿਆਲਾ · ਪੰਜਾਬ",
  "search.placeholder": "ਫ਼ਸਲ, ਆਰਡਰ, ਖ਼ਰੀਦਾਰ ਲੱਭੋ…",
  "common.notifications": "ਸੂਚਨਾਵਾਂ",
  "common.viewAll": "ਸਭ ਵੇਖੋ",
  "common.viewDetails": "ਵੇਰਵਾ ਵੇਖੋ",
  "common.findBuyers": "ਖ਼ਰੀਦਾਰ ਲੱਭੋ",
  "common.listProduce": "ਆਪਣੀ ਫ਼ਸਲ ਸੂਚੀਬੱਧ ਕਰੋ",
  "common.acceptMatch": "ਮੈਚ ਸਵੀਕਾਰ ਕਰੋ",

  "farmer.kpi.listed": "ਸੂਚੀਬੱਧ ਕੁੱਲ ਫ਼ਸਲ",
  "farmer.kpi.matched": "ਮੈਚ ਹੋਈ ਫ਼ਸਲ",
  "farmer.kpi.pending": "ਬਾਕੀ ਆਰਡਰ",
  "farmer.kpi.earnings": "ਅੰਦਾਜ਼ਨ ਕਮਾਈ",
  "farmer.upcomingHarvest": "ਆਉਣ ਵਾਲੀ ਵਾਢੀ",
  "farmer.activeMatches": "ਸਰਗਰਮ ਮੈਚ",
  "farmer.recentOrders": "ਹਾਲ ਹੀ ਆਰਡਰ",
  "farmer.aiInsight": "ਏਆਈ ਮੰਡੀ ਜਾਣਕਾਰੀ",

  "role.viewAs": "ਡੈਮੋ ਵੇਖੋ",
};

export const dict: Record<Lang, Record<LangKey, string>> = { en, hi, pa };
