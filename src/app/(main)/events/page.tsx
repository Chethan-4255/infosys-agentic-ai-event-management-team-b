"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal, RotateCcw, CalendarDays } from "lucide-react";
import { EventItem } from "../../../types";
import { getAllEvents } from "../../../services/eventService";
import EventCard from "../../../components/events/EventCard";

const CATEGORIES = ["ALL", "HACKATHON", "AI & ML", "IDEATHON", "COMPETITION"];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [priceFilter, setPriceFilter] = useState<"ALL" | "FREE" | "PAID">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UPCOMING" | "COMPLETED">("ALL");
  const [sortBy, setSortBy] = useState<"DEFAULT" | "PRICE_LOW" | "SEATS_HIGH">("DEFAULT");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    const list = events.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
      const matchCat = category === "ALL" || e.category === category;
      const matchPrice =
        priceFilter === "ALL" ||
        (priceFilter === "FREE" && e.price === 0) ||
        (priceFilter === "PAID" && e.price > 0);
      const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
      return matchSearch && matchCat && matchPrice && matchStatus;
    });

    if (sortBy === "PRICE_LOW") return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "SEATS_HIGH") return [...list].sort((a, b) => b.seatsLeft - a.seatsLeft);
    return list;
  }, [events, search, category, priceFilter, statusFilter, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setPriceFilter("ALL");
    setStatusFilter("ALL");
    setSortBy("DEFAULT");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Events Directory</h1>
          <p className="text-sm text-slate-500">Filter hackathons, AI challenges, and workshops by category, price, or availability.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
          <CalendarDays className="h-4 w-4" /> Showing {filteredEvents.length} of {events.length} events
        </span>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by event name or city..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none" />
          </div>

          <div className="md:col-span-2">
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value as "ALL" | "FREE" | "PAID")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none">
              <option value="ALL">All Prices</option>
              <option value="FREE">Free Only</option>
              <option value="PAID">Paid Only</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "ALL" | "UPCOMING" | "COMPLETED")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none">
              <option value="ALL">All Statuses</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "DEFAULT" | "PRICE_LOW" | "SEATS_HIGH")} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none">
              <option value="DEFAULT">Sort: Recommended</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="SEATS_HIGH">Seats: Most Available</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="mr-1 h-4 w-4 text-slate-400" />
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${category === cat ? "bg-indigo-600 text-white" : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>
          <button onClick={resetFilters} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600">
            <RotateCcw className="h-3.5 w-3.5" /> Reset All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-500">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-base font-bold text-slate-800">No events match your filters</p>
          <p className="mt-1 text-xs text-slate-500">Try clearing one of your active filters above.</p>
          <button onClick={resetFilters} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </div>
  );
}
