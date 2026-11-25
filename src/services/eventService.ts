import { EVENTS_DATA } from "../data/mockEvents";
import { VENUES_DATA } from "../data/mockVenues";
import { EventItem, VenueItem } from "../types";
// import { apiFetch } from "./apiClient";

export async function getAllEvents(): Promise<EventItem[]> {
  return EVENTS_DATA as EventItem[];
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  return (EVENTS_DATA as EventItem[]).find((event) => event.id === id);
}

export async function getAllVenues(): Promise<VenueItem[]> {
  // Backend teammate: replace with -> return apiFetch<VenueItem[]>("/venues");
  return VENUES_DATA;
}

export async function registerForEvent(payload: {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketsCount: number;
  paymentMethod: string;
}): Promise<{ success: boolean; bookingId: string }> {
  return {
    success: true,
    bookingId: `EVT-${Math.floor(100000 + Math.random() * 900000)}`,
  };
}
