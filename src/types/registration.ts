export type RegistrationStatus = "Confirmed" | "Pending" | "Cancelled";

export interface Registration {
  id: number;
  event: string;
  venue: string;
  eventDate: string; // ISO date, e.g. "2026-11-26"
  status: RegistrationStatus;
}