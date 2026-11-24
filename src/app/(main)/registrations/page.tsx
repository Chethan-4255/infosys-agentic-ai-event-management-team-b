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
  // TODO: replace mock data with the real API (e.g. a useRegistrations() hook)
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

  const count = (status: string) => items.filter((r) => r.status === status).length;

  const stats = [
    { label: "Total registrations", value: items.length, note: "Across all events", valueClass: "text-gray-900", noteClass: "text-blue-600" },
    { label: "Confirmed", value: count("Confirmed"), note: "Successfully registered", valueClass: "text-green-600", noteClass: "text-green-600" },
    { label: "Pending", value: count("Pending"), note: "Awaiting confirmation", valueClass: "text-yellow-600", noteClass: "text-yellow-600" },
    { label: "Cancelled", value: count("Cancelled"), note: "Cancelled registrations", valueClass: "text-red-600", noteClass: "text-red-600" },
  ];

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    // TODO: call the cancel-registration API here, then update the list
    setItems((prev) =>
      prev.map((r) =>
        r.id === cancelTarget.id ? { ...r, status: "Cancelled" } : r
      )
    );
    setCancelTarget(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Registrations</h1>
        <p className="mt-2 text-gray-500">
          Events you have registered for. Cancel a registration if your plans change.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <h2 className={`mt-2 text-3xl font-bold ${s.valueClass}`}>{s.value}</h2>
            <p className={`mt-2 text-sm ${s.noteClass}`}>{s.note}</p>
          </div>
        ))}
      </div>

      {/* Search, filter and table */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            aria-label="Search registrations"
            placeholder="Search by event or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:max-w-md"
          />

          <select
            aria-label="Filter by status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Venue</th>
                <th className="px-4 py-3 font-medium">Event date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{item.event}</td>
                  <td className="px-4 py-4 text-gray-700">{item.venue}</td>
                  <td className="px-4 py-4 text-gray-500">{formatDate(item.eventDate)}</td>
                  <td className="px-4 py-4">
                    <RegistrationStatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4">
                    {item.status === "Cancelled" ? (
                      <span className="text-gray-400">&mdash;</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCancelTarget(item)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    {items.length === 0 ? (
                      <>
                        You haven&apos;t registered for any events yet.{" "}
                        <Link href="/events" className="font-medium text-blue-600 hover:underline">
                          Browse events
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

        <p className="mt-4 text-sm text-gray-500">
          Showing {filtered.length} of {items.length} registrations
        </p>
      </div>

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