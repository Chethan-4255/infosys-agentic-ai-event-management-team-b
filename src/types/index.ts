export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: "HACKATHON" | "AI & ML" | "IDEATHON" | "COMPETITION";
  price: number; // 0 = FREE
  date: string;
  venue: string;
  seatsLeft: number;
  totalSeats: number;
  status: "UPCOMING" | "COMPLETED";
  source?: "Unstop" | "Devpost" | "Internal";
}

export interface VenueItem {
  id: string;
  name: string;
  city: string;
  state: "Tamil Nadu" | "Karnataka" | "Maharashtra" | "Telangana" | "Kerala";
  address: string;
  capacity: number;
  rating: number;
  reviewCount: number;
  foodQuality: "Excellent (4.8★)" | "Very Good (4.5★)" | "Good (4.2★)" | "Catering Optional";
  topReview: string;
  reviewerName: string;
  facilities: string[];
  imageUrl: string;
  mapUrl: string;
  upcomingEventsCount: number;
}


export interface RegistrationItem {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  userId: string;
  userName: string;
  ticketsCount: number;
  status: "CONFIRMED" | "CANCELLED";
  registeredAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  sources?: string[]; // RAG document citations
  timestamp: string;
}

export interface AgentLog {
  id: string;
  action: string;
  toolUsed: string;
  status: "SUCCESS" | "FAILED";
  latencyMs: number;
  timestamp: string;
}
