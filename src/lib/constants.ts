export const SITE_NAME = "The Hub";
export const ORG_NAME = "United Spinal Association of Tennessee";
export const ORG_SHORT = "USAT";

export const SITE_DESCRIPTION =
  "The Hub — United Spinal Association of Tennessee's adaptive equipment closet. We collect, refurbish, and redistribute donated mobility equipment to Tennesseans at no cost.";

export const OPENING_DATE = "February 2026";

export const CONTACT = {
  // Donation Closet location is private for security — we do not publish a street address.
  locationLabel: "Nashville, Tennessee",
  serviceArea: "Serving all of Tennessee",
  phone: "(615) 669-1307",
  email: "usatnthehub@gmail.com",
  hours: {
    weekdays: "Monday – Friday: 9:00 AM – 4:00 PM",
    saturday: "Saturday: By appointment",
    sunday: "Sunday: Closed",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Inventory", href: "/inventory" },
  { label: "Request", href: "/get-equipment" },
  { label: "Donate", href: "/donate-equipment" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  about: [
    { label: "About The Hub", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Partners & Referrals", href: "/partners" },
    { label: "FAQ", href: "/faq" },
  ],
  quickLinks: [
    { label: "Request Equipment", href: "/get-equipment" },
    { label: "Donate Equipment", href: "/donate-equipment" },
    { label: "View Inventory", href: "/inventory" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Accessibility", href: "/accessibility" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Disclaimer", href: "/terms" },
  ],
} as const;

export const EQUIPMENT_CATEGORIES = [
  "Manual Wheelchair",
  "Power Wheelchair",
  "Cushion / Seating",
  "Walker / Rollator",
  "Bath / Shower Equipment",
  "Transfer Equipment",
  "Ramp / Accessibility",
  "Scooter",
  "Standing Frame",
  "Other Adaptive Equipment",
] as const;

export const EQUIPMENT_CONDITIONS = [
  "New",
  "Like New",
  "Good",
  "Fair",
] as const;

export const INVENTORY_STATUSES = [
  "Available",
  "Pending",
  "In Refurbishment",
  "Assigned",
  "Unavailable",
] as const;

export const REQUESTER_ROLES = [
  "Individual with disability",
  "Family member / Caregiver",
  "Therapist / Clinician",
  "Case manager",
  "Social worker",
  "Other",
] as const;

export const CONTACT_CATEGORIES = [
  "General question",
  "Donation inquiry",
  "Need equipment",
  "Referral partner",
  "Volunteer / Support",
  "Media inquiry",
  "Other",
] as const;

export const URGENCY_LEVELS = [
  "Low – no rush",
  "Moderate – within a few weeks",
  "High – within days",
  "Urgent – immediate need",
] as const;
