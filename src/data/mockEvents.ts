export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: "HACKATHON" | "AI & ML" | "IDEATHON" | "COMPETITION";
  price: number; // 0 = FREE (in INR)
  date: string;
  venue: string;
  seatsLeft: number;
  totalSeats: number;
  status: "UPCOMING" | "COMPLETED";
  source: "Unstop" | "Devpost";
  imageUrl?: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "1",
    title: "Protothon 2K26 — National Prototyping Challenge",
    description: "2-to-4 member hardware & software prototyping sprint hosted at Hindustan Institute of Technology and Science.",
    category: "HACKATHON",
    price: 1000,
    date: "27 Nov 2026",
    venue: "HITS Campus, Chennai, Tamil Nadu",
    seatsLeft: 42,
    totalSeats: 250,
    status: "UPCOMING",
    source: "Unstop",
  },
  {
    id: "2",
    title: "Operation Blackout — Cybersecurity & Systems Sprint",
    description: "Inter-college team challenge focused on resilient infrastructure, incident response, and live debugging.",
    category: "COMPETITION",
    price: 250,
    date: "28 Nov 2026",
    venue: "R.V. College of Engineering (RVCE), Bengaluru",
    seatsLeft: 65,
    totalSeats: 300,
    status: "UPCOMING",
    source: "Unstop",
  },
  {
    id: "3",
    title: "#BuildHybridAI 2026 Global Challenge",
    description: "Build next-gen hybrid on-device and cloud AI applications across mobile and web platforms.",
    category: "AI & ML",
    price: 0,
    date: "30 Nov 2026",
    venue: "Online · Global Developer Track",
    seatsLeft: 1015,
    totalSeats: 5000,
    status: "UPCOMING",
    source: "Devpost",
  },
  {
    id: "4",
    title: "IIT Bombay Applied AI Ideathon",
    description: "Idea-to-prototyping challenge for 2–4 member teams solving real-world enterprise and healthcare problems.",
    category: "IDEATHON",
    price: 0,
    date: "30 Nov 2026",
    venue: "IIT Bombay, Powai, Mumbai",
    seatsLeft: 88,
    totalSeats: 400,
    status: "UPCOMING",
    source: "Unstop",
  },
  {
    id: "5",
    title: "Codegeist 2026: Build with Context",
    description: "Atlassian's flagship developer hackathon focused on AI agents, developer workflows, and enterprise productivity.",
    category: "AI & ML",
    price: 0,
    date: "22 Dec 2026",
    venue: "Online · Global Developer Track",
    seatsLeft: 905,
    totalSeats: 6000,
    status: "UPCOMING",
    source: "Devpost",
  },
  {
    id: "6",
    title: "Bharat Academix Global Innovatex 2027",
    description: "Three-round innovation challenge covering Generative AI, Cloud Computing, Cybersecurity, and Full-Stack Web.",
    category: "HACKATHON",
    price: 0,
    date: "29 Dec 2026",
    venue: "Hybrid · Bengaluru & Online",
    seatsLeft: 210,
    totalSeats: 1000,
    status: "UPCOMING",
    source: "Unstop",
  },
  {
    id: "7",
    title: "Codathon — Chemical & Computational Engineering",
    description: "Individual algorithmic coding and computational modeling challenge hosted in Mumbai.",
    category: "COMPETITION",
    price: 90,
    date: "16 Dec 2026",
    venue: "Institute of Chemical Technology, Mumbai",
    seatsLeft: 112,
    totalSeats: 200,
    status: "UPCOMING",
    source: "Unstop",
  },
  {
    id: "8",
    title: "Tech Horizon 2.0 — 48-Hour National Sprint",
    description: "Completed 48-hour national hackathon featuring 14 innovation tracks including Clean Tech and Defence.",
    category: "HACKATHON",
    price: 0,
    date: "11 Nov 2026",
    venue: "GNITC Campus, Hyderabad",
    seatsLeft: 0,
    totalSeats: 500,
    status: "COMPLETED",
    source: "Unstop",
  },
    {
    id: "9",
    title: "Chennai AI & Cloud Builders Conclave",
    description: "Sold-out developer summit featuring live RAG architecture demos, microservices workshops, and startup pitches.",
    category: "AI & ML",
    price: 500,
    date: "18 Oct 2026",
    venue: "IIT Madras Research Park, Chennai",
    seatsLeft: 0,
    totalSeats: 350,
    status: "COMPLETED",
    source: "Devpost",
  },
];
