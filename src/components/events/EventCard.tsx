"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { EventItem } from "../../types";

const BADGE_COLORS: Record<string, string> = {
  HACKATHON: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "AI & ML": "bg-violet-50 text-violet-700 border-violet-200",
  IDEATHON: "bg-emerald-50 text-emerald-700 border-emerald-200",
  COMPETITION: "bg-amber-50 text-amber-700 border-amber-200",
};

const CARD_GRADIENTS: Record<string, string> = {
  HACKATHON: "from-indigo-600 via-blue-600 to-cyan-500",
  "AI & ML": "from-violet-600 via-purple-600 to-indigo-600",
  IDEATHON: "from-emerald-600 via-teal-600 to-cyan-600",
  COMPETITION: "from-amber-500 via-orange-500 to-rose-500",
};

export default function EventCard({ event }: { event: EventItem }) {
  const isCompleted = event.status === "COMPLETED";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      <div className={`relative flex h-40 w-full items-center justify-center bg-gradient-to-br ${CARD_GRADIENTS[event.category] || "from-indigo-600 to-violet-700"}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 px-5 text-center text-white">
          <Calendar className="mx-auto mb-1.5 h-7 w-7 opacity-90" />
          <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-wider opacity-90">
            {event.source || "Internal"} · {event.venue.split(",")[0]}
          </p>
        </div>

        <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase ${BADGE_COLORS[event.category] || "bg-white text-slate-800"}`}>
          {event.category}
        </span>

        <span className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-bold ${event.price === 0 ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-900"}`}>
          {event.price === 0 ? "FREE" : `₹${event.price}`}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[11px] font-semibold ${isCompleted ? "text-slate-400" : "text-emerald-600"}`}>
              ● {event.status}
            </span>
            <span className="text-[11px] text-slate-400">{event.date}</span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-indigo-600">
            {event.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">{event.description}</p>

          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <p className="flex items-center gap-2 truncate">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" /> {event.venue}
            </p>
            <p className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
              {event.seatsLeft} / {event.totalSeats} seats available
            </p>
          </div>
        </div>

        <Link
          href={`/events/${event.id}`}
          className={`mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            isCompleted
              ? "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isCompleted ? "View Event Summary" : "View Details & Register"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
