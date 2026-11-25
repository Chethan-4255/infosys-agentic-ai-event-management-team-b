"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, ShieldCheck, Sparkles } from "lucide-react";
import { EventItem } from "../../../../types";
import { getEventById } from "../../../../services/eventService";
import { useAuth } from "../../../../context/AuthContext";
import RegistrationForm from "../../../../components/events/RegistrationForm";

function EventDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      const data = await getEventById(eventId);
      setEvent(data || null);
      setLoading(false);
    }
    loadEvent();
  }, [eventId]);

  if (loading) {
    return <div className="py-16 text-center text-sm text-slate-500">Loading event details...</div>;
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-lg font-bold text-slate-900">Event Not Found</h2>
        <Link href="/dashboard" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </button>

      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">{event.category}</span>
          {event.source && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-200">
              <Sparkles className="h-3 w-3" /> Hosted via {event.source}
            </span>
          )}
        </div>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{event.title}</h1>
        <div className="mt-5 flex flex-wrap gap-6 text-sm text-indigo-100">
          <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-amber-300" /> {event.date}</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-rose-300" /> {event.venue}</span>
          <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-emerald-300" /> {event.seatsLeft} / {event.totalSeats} seats left</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">About This Event</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.description}</p>
          </div>
          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-slate-900">Key Highlights & Guidelines</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600" /> Instant e-ticket confirmation in My Registrations</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600" /> Bring a valid college or corporate ID for check-in</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600" /> Ask the AI Assistant anytime for venue or schedule help</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <RegistrationForm
            event={event}
            defaultName={user?.name}
            defaultEmail={user?.email}
            onSuccess={(booked) => setEvent({ ...event, seatsLeft: Math.max(0, event.seatsLeft - booked) })}
          />
        </div>
      </div>
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-slate-500">Loading event...</div>}>
      <EventDetailsContent />
    </Suspense>
  );
}
