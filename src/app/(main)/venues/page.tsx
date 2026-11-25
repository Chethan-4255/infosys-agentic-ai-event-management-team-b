"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Building2, Utensils, X, ExternalLink } from "lucide-react";
import { VenueItem } from "../../../types";
import { getAllVenues } from "../../../services/eventService";
import VenueCard from "../../../components/venues/VenueCard";

const STATES = ["All States", "Tamil Nadu", "Karnataka", "Maharashtra", "Telangana", "Kerala"];

export default function VenuesPage() {
  const [venues, setVenues] = useState<VenueItem[]>([]);
  const [selectedState, setSelectedState] = useState("All States");
  const [search, setSearch] = useState("");
  const [foodFilter, setFoodFilter] = useState("ALL");
  const [activeMapVenue, setActiveMapVenue] = useState<VenueItem | null>(null);

  useEffect(() => {
    getAllVenues().then(setVenues);
  }, []);

  const filteredVenues = useMemo(() => {
    const q = search.toLowerCase();
    return venues.filter((v) => {
      const matchState = selectedState === "All States" || v.state === selectedState;
      const matchSearch =
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q);
      const matchFood =
        foodFilter === "ALL" || v.foodQuality.toLowerCase().includes(foodFilter.toLowerCase());
      return matchState && matchSearch && matchFood;
    });
  }, [venues, selectedState, search, foodFilter]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Partner Venues &amp; Convention Centers</h1>
          <p className="text-sm text-slate-500">
            Explore state-wise event venues with capacity, food quality ratings, attendee reviews, and Google Maps.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
          <Building2 className="h-4 w-4" /> Showing {filteredVenues.length} Venues
        </span>
      </div>

      {/* State Filter Pills + Search & Food Filter */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap gap-2">
          {STATES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                selectedState === st
                  ? "bg-teal-600 text-white shadow-xs"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-3">
          <div className="relative sm:col-span-2">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by venue name, city (e.g., Chennai, Erode, Bengaluru)..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="relative">
            <Utensils className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={foodFilter}
              onChange={(e) => setFoodFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-700 focus:border-teal-500 focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Food Ratings</option>
              <option value="Excellent">Excellent Food (4.8★)</option>
              <option value="Very Good">Very Good Food (4.5★)</option>
              <option value="Good">Good Food (4.2★)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} onPreviewMap={setActiveMapVenue} />
        ))}
      </div>

      {/* Interactive Google Maps Preview Modal */}
      {activeMapVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeMapVenue.name}</h3>
                <p className="text-xs text-slate-500">{activeMapVenue.address}, {activeMapVenue.city}</p>
              </div>
              <button onClick={() => setActiveMapVenue(null)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-80 w-full bg-slate-100">
              <iframe
                title={activeMapVenue.name}
                width="100%"
                height="100%"
                loading="lazy"
                src={"https://google.com" + encodeURIComponent(activeMapVenue.name + ", " + activeMapVenue.city + ", " + activeMapVenue.state) + "&t=&z=14&ie=UTF8&iwloc=&output=embed"}


              />
            </div>

            <div className="flex items-center justify-between bg-slate-50 px-5 py-3">
              <span className="text-xs font-medium text-slate-600">Food Rating: <strong>{activeMapVenue.foodQuality}</strong></span>
              <a href={activeMapVenue.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700">
                Open Full Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
