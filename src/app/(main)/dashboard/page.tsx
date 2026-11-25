"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, MapPin, Bot, ShieldCheck, Calendar, Flame } from "lucide-react";
import { EventItem } from "../../../types";
import { getAllEvents } from "../../../services/eventService";
import EventCard from "../../../components/events/EventCard";

const FEATURES = [
  { title: "One-Click Booking", desc: "Instant seat reservation with digital passes and zero queue friction.", icon: Zap, accent: "bg-teal-50 text-teal-600" },
  { title: "Live Venue Radar", desc: "Real-time seat capacity tracking across top tech parks and campuses.", icon: MapPin, accent: "bg-emerald-50 text-emerald-600" },
  { title: "AI Event Copilot", desc: "Ask our RAG assistant about schedules, rules, or eligibility anytime.", icon: Bot, accent: "bg-cyan-50 text-cyan-700" },
  { title: "Verified Passes", desc: "Tamper-proof booking IDs and transparent payment receipts.", icon: ShieldCheck, accent: "bg-amber-50 text-amber-600" },
];

export default function DashboardPage() {
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);
  const [hottestEvent, setHottestEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    getAllEvents().then((all) => {
      const upcoming = all.filter((e) => e.status === "UPCOMING");
      setFeaturedEvents(upcoming.slice(0, 4));
      const highestDemand = [...upcoming].sort(
        (a, b) => a.seatsLeft / a.totalSeats - b.seatsLeft / b.totalSeats
      );
      setHottestEvent(highestDemand[0] || null);
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-8">
      {/* 1. Deep Emerald & Midnight Teal Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-16">
        {/* Ambient Emerald/Cyan Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 mx-auto max-w-3xl space-y-6">
          {/* Dynamic High-Demand Pill */}
          {hottestEvent ? (
            <Link
              href={`/events/${hottestEvent.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md transition hover:bg-emerald-400/20"
            >
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span>Trending Now: {hottestEvent.title} ({hottestEvent.seatsLeft} seats left)</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-3.5 py-1 text-xs font-semibold text-teal-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Next-Gen Event &amp; Hackathon Hub
            </span>
          )}

          {/* Catchy Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:leading-[1.15]">
            Where Big Ideas Meet{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Unforgettable Stages
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            From national hackathons to hands-on AI summits — discover curated experiences, book seats in seconds, and get instant answers from your AI Copilot.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-400 hover:to-teal-500"
            >
              Explore All Events <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Bot className="h-4 w-4 text-emerald-300" /> Ask AI Assistant
            </Link>
          </div>

          {/* Updated Glass Stat Cards */}
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
            {[
              { value: "4.8K+", label: "Active Builders" },
              { value: "120+", label: "Events Hosted" },
              { value: "28+", label: "Partner Venues" },
              { value: "< 2s", label: "AI Response" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
              >
                <p className="text-xl font-extrabold text-white sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] font-medium text-slate-300/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Platform Features Grid */}
      <section className="space-y-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Built For Speed</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Everything you need, in one platform</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md">
                <div className={`inline-flex rounded-xl p-3 ${feat.accent}`}><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Upcoming Events */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Featured</p>
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
          </div>
          <Link href="/events" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-teal-300 hover:text-teal-700">
            View All Events <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="border-t border-slate-200 pt-8 text-xs text-slate-500">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Calendar className="h-5 w-5 text-teal-600" />
            <span>EventAI Portal</span>
          </div>
          <div className="flex flex-wrap gap-6 font-medium">
            <Link href="/dashboard" className="hover:text-teal-600">Home</Link>
            <Link href="/events" className="hover:text-teal-600">All Events</Link>
            <Link href="/venues" className="hover:text-teal-600">Venues</Link>
            <Link href="/ai-assistant" className="hover:text-teal-600">AI Assistant</Link>
            <Link href="/registrations" className="hover:text-teal-600">My Registrations</Link>
          </div>
          <p className="text-slate-400">© 2026 EventAI Portal. Infosys Internship Project.</p>
        </div>
      </footer>
    </div>
  );
}
