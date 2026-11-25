"use client";

import { MapPin, Users, Star, Utensils, ExternalLink, Map, MessageSquareQuote } from "lucide-react";
import { VenueItem } from "../../types";

interface VenueCardProps {
  venue: VenueItem;
  onPreviewMap: (venue: VenueItem) => void;
}

export default function VenueCard({ venue, onPreviewMap }: VenueCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-md">
      {/* Venue Photo + Gradient Fallback */}
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-800 via-teal-900 to-emerald-900">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
          {venue.city}, {venue.state}
        </span>

        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-extrabold text-slate-950 shadow-xs">
          <Star className="h-3.5 w-3.5 fill-slate-950" /> {venue.rating} ({venue.reviewCount})
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-slate-900 group-hover:text-teal-700">
              {venue.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />
              <span className="truncate">{venue.address}</span>
            </p>
          </div>

          {/* Capacity & Food Quality Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              <Users className="h-3.5 w-3.5 text-teal-600" /> {venue.capacity} Seats
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
              <Utensils className="h-3.5 w-3.5" /> Food: {venue.foodQuality}
            </span>
          </div>

          {/* Highlighted Attendee Review */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-600">
            <p className="flex items-start gap-1.5 italic">
              <MessageSquareQuote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
              <span>&ldquo;{venue.topReview}&rdquo;</span>
            </p>
            <p className="mt-1 text-right text-[11px] font-semibold text-slate-500">
              — {venue.reviewerName}
            </p>
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap gap-1.5">
            {venue.facilities.map((fac) => (
              <span key={fac} className="rounded-md border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {fac}
              </span>
            ))}
          </div>
        </div>

        {/* Google Maps Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onPreviewMap(venue)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
          >
            <Map className="h-3.5 w-3.5" /> Preview Map
          </button>

          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
          >
            Google Maps <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
