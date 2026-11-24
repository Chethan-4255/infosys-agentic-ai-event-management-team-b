
"use client";

import { useState } from "react";
import Link from "next/link";
import { Registration } from "../../../types/registration";
import { mockRegistrations } from "../../../mocks/registrations";
import RegistrationStatusBadge from "../../../components/registrations/RegistrationStatusBadge";
import CancelDialog from "../../../components/registrations/CancelDialog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function RegistrationsPage() {
  const [items, setItems] = useState<Registration[]>(mockRegistrations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [cancelTarget, setCancelTarget] = useState<Registration | null>(null);

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();

    const matchesSearch =
      item.event.toLowerCase().includes(q) ||
      item.venue.toLowerCase().includes(q);

    const matchesStatus = filter === "All" || item.status === filter;

    return matchesSearch && matchesStatus;
  });

  const count = (status: string) =>
    items.filter((r) => r.status === status).length;

  // Statistics
  const stats = [
    {
      label: "Total Registrations",
      value: items.length,
      note: "Across all events",
      icon: "🎟️",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      accent: "from-blue-500 to-cyan-400",
    },
    {
      label: "Confirmed",
      value: count("Confirmed"),
      note: "Successfully registered",
      icon: "✓",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      accent: "from-emerald-500 to-green-400",
    },
    {
      label: "Pending",
      value: count("Pending"),
      note: "Awaiting confirmation",
      icon: "⏳",
      color: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-200",
      accent: "from-amber-500 to-orange-400",
    },
    {
      label: "Cancelled",
      value: count("Cancelled"),
      note: "Cancelled registrations",
      icon: "✕",
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      accent: "from-rose-500 to-pink-400",
    },
  ];

  // Cancel registration
  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    setItems((prev) =>
      prev.map((r) =>
        r.id === cancelTarget.id
          ? { ...r, status: "Cancelled" }
          : r
      )
    );

    setCancelTarget(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-fuchsia-50 p-5 md:p-8">

      {/* PAGE HEADER */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 p-7 text-white shadow-xl md:p-9">

        {/* Decorative background */}
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-blue-300/20 blur-2xl" />

        <div className="relative z-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            ✨ EventAI Portal
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            My Registrations
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-purple-100 md:text-base">
            Manage your event registrations, track confirmation status,
            and stay updated with your upcoming events.
          </p>

          {/* HEADER STATS */}
          <div className="mt-6 flex flex-wrap gap-3">

            <div className="rounded-xl border border-white/25 bg-white/20 px-5 py-3 backdrop-blur-md">
              <p className="text-xs text-white/90">Total Events</p>
              <p className="mt-1 text-2xl font-bold">{items.length}</p>
            </div>

            <div className="rounded-xl border border-white/25 bg-white/20 px-5 py-3 backdrop-blur-md">
              <p className="text-xs text-white/90">Confirmed</p>
              <p className="mt-1 text-2xl font-bold">{count("Confirmed")}</p>
            </div>

            <div className="rounded-xl border border-white/25 bg-white/20 px-5 py-3 backdrop-blur-md">
              <p className="text-xs text-white/90">Pending</p>
              <p className="mt-1 text-2xl font-bold">{count("Pending")}</p>
            </div>

          </div>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((s) => (
          <div
            key={s.label}
            className={`group overflow-hidden rounded-2xl border ${s.border} ${s.bg} shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >

            {/* Bright accent strip */}
            <div className={`h-1.5 bg-gradient-to-r ${s.accent}`} />

            <div className="p-5">

              <div className="flex items-center justify-between">

                <p className="text-sm font-semibold text-slate-600">
                  {s.label}
                </p>

                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm ${s.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  {s.icon}
                </span>

              </div>

              <h2 className={`mt-4 text-4xl font-extrabold ${s.color}`}>
                {s.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {s.note}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* REGISTRATION HISTORY */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-lg">

        {/* SECTION HEADING */}
        <div className="border-b border-violet-100 bg-gradient-to-r from-fuchsia-100 via-purple-100 to-blue-100 p-5 md:p-6">

          <h2 className="text-xl font-bold text-violet-950">
            📋 Registration History
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            View and manage all your registered events.
          </p>

        </div>

        <div className="p-5 md:p-6">

          {/* SEARCH AND FILTER */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Search */}
            <div className="w-full md:max-w-md">
              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500">
                  🔍
                </span>

                <input
                  type="text"
                  aria-label="Search registrations"
                  placeholder="Search by event or venue..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-violet-200 bg-violet-50/60 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
                />

              </div>
            </div>

            {/* Filter */}
            <select
              aria-label="Filter by status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 outline-none transition-all hover:bg-violet-50 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
            >
              <option value="All">All statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-violet-100">

            <table className="w-full text-left text-sm">

              {/* Table Heading */}
              <thead className="bg-gradient-to-r from-fuchsia-100 via-violet-100 to-blue-100 text-violet-950">

                <tr>
                  <th className="whitespace-nowrap px-5 py-4 font-bold">
                    Event
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 font-bold">
                    Venue
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 font-bold">
                    Event Date
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 font-bold">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 font-bold">
                    Action
                  </th>
                </tr>

              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-violet-50">

                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors duration-200 hover:bg-violet-50/70"
                  >

                    {/* Event */}
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                      {item.event}
                    </td>

                    {/* Venue */}
                    <td className="px-5 py-4 text-slate-600">
                      {item.venue}
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatDate(item.eventDate)}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <RegistrationStatusBadge status={item.status} />
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-5 py-4">

                      {item.status === "Cancelled" ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCancelTarget(item)}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 transition-all duration-200 hover:border-rose-400 hover:bg-rose-100 hover:shadow-sm"
                        >
                          Cancel
                        </button>
                      )}

                    </td>

                  </tr>
                ))}

                {/* Empty State */}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-14 text-center text-slate-500"
                    >

                      {items.length === 0 ? (
                        <>
                          <div className="mb-2 text-3xl">🎟️</div>

                          You haven&apos;t registered for any events yet.{" "}

                          <Link
                            href="/events"
                            className="font-semibold text-blue-600 hover:text-fuchsia-700 hover:underline"
                          >
                            Browse Events
                          </Link>
                        </>
                      ) : (
                        "No registrations match your search."
                      )}

                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>

          {/* FOOTER */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-fuchsia-700">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-violet-700">
                {items.length}
              </span>{" "}
              registrations
            </p>

            <span className="rounded-full border border-violet-100 bg-gradient-to-r from-fuchsia-100 to-blue-100 px-4 py-2 text-xs font-semibold text-violet-700">
              ✨ EventAI Portal
            </span>

          </div>

        </div>
      </div>

      {/* CANCEL DIALOG */}
      {cancelTarget && (
        <CancelDialog
          eventName={cancelTarget.event}
          onConfirm={handleConfirmCancel}
          onClose={() => setCancelTarget(null)}
        />
      )}

    </div>
  );
}
