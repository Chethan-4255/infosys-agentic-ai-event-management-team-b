"use client";

import { useState } from "react";

type AgentRun = {
  id: number;
  runId: string;
  query: string;
  intent: string;
  tool: string;
  duration: number;
  status: "Success" | "Failed";
  time: string;
  response: string;
};

export default function AgentActivityPage() {
  const [runs] = useState<AgentRun[]>([
    {
      id: 1,
      runId: "RUN-001",
      query: "Find technology events near me",
      intent: "Event Search",
      tool: "Event Search Tool",
      duration: 1200,
      status: "Success",
      time: "10:30 AM",
      response: "Found 5 technology events near your location.",
    },
    {
      id: 2,
      runId: "RUN-002",
      query: "Register me for a workshop",
      intent: "Event Registration",
      tool: "Registration Tool",
      duration: 2100,
      status: "Success",
      time: "10:35 AM",
      response: "Registration completed successfully.",
    },
    {
      id: 3,
      runId: "RUN-003",
      query: "Find available venues",
      intent: "Venue Search",
      tool: "Venue Tool",
      duration: 3500,
      status: "Failed",
      time: "10:40 AM",
      response: "Unable to retrieve available venues.",
    },
    {
      id: 4,
      runId: "RUN-004",
      query: "Suggest events for AI students",
      intent: "Event Recommendation",
      tool: "Recommendation Tool",
      duration: 1500,
      status: "Success",
      time: "10:45 AM",
      response: "Found relevant AI and ML events.",
    },
    {
      id: 5,
      runId: "RUN-005",
      query: "Cancel my event registration",
      intent: "Registration Cancellation",
      tool: "Registration Tool",
      duration: 2800,
      status: "Failed",
      time: "10:50 AM",
      response: "Registration cancellation could not be completed.",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRun, setSelectedRun] = useState<AgentRun | null>(null);

  const successfulRuns = runs.filter((r) => r.status === "Success").length;
  const failedRuns = runs.filter((r) => r.status === "Failed").length;

  const averageTime =
    runs.reduce((total, r) => total + r.duration, 0) / runs.length;

  const filteredRuns = runs.filter((run) => {
    const term = search.toLowerCase();

    const matchesSearch =
      run.runId.toLowerCase().includes(term) ||
      run.query.toLowerCase().includes(term) ||
      run.intent.toLowerCase().includes(term) ||
      run.tool.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "All" || run.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const cardStyle =
    "min-w-0 rounded-2xl border p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5";

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden bg-linear-to-br from-violet-50 via-sky-50 to-pink-50 px-3 py-4 text-gray-800 sm:px-5 sm:py-5">

      {/* Content width similar to AI Assistant */}
      <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5">

        {/* Page Header */}
        <section className="w-full min-w-0 rounded-2xl border border-white bg-white/85 p-5 shadow-sm sm:p-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
            AI Agent Monitoring
          </div>

          <h1 className="break-words text-2xl font-extrabold text-violet-700 sm:text-3xl">
            Agent Activity
          </h1>

          <p className="mt-2 break-words text-sm leading-6 text-gray-600">
            Monitor AI agent executions, performance, tool usage and activity logs.
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Total */}
          <div className={`${cardStyle} border-violet-200 bg-gradient-to-br from-violet-50 to-purple-100`}>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-xl bg-violet-200 p-2.5 text-xl">🤖</span>
              <span className="text-xs font-bold text-violet-600">ALL RUNS</span>
            </div>
            <p className="mt-4 text-sm text-violet-700">Total Agent Runs</p>
            <h2 className="mt-1 text-3xl font-extrabold text-violet-900">{runs.length}</h2>
            <div className="mt-4 h-1.5 rounded-full bg-violet-200">
              <div className="h-full w-full rounded-full bg-violet-500" />
            </div>
          </div>

          {/* Success */}
          <div className={`${cardStyle} border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100`}>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-xl bg-emerald-200 p-2.5 text-xl">✅</span>
              <span className="text-xs font-bold text-emerald-600">COMPLETED</span>
            </div>
            <p className="mt-4 text-sm text-emerald-700">Successful Runs</p>
            <h2 className="mt-1 text-3xl font-extrabold text-emerald-900">{successfulRuns}</h2>
            <div className="mt-4 h-1.5 rounded-full bg-emerald-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${(successfulRuns / runs.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Failed */}
          <div className={`${cardStyle} border-rose-200 bg-gradient-to-br from-rose-50 to-pink-100`}>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-xl bg-rose-200 p-2.5 text-xl">⚠️</span>
              <span className="text-xs font-bold text-rose-600">ERRORS</span>
            </div>
            <p className="mt-4 text-sm text-rose-700">Failed Runs</p>
            <h2 className="mt-1 text-3xl font-extrabold text-rose-900">{failedRuns}</h2>
            <div className="mt-4 h-1.5 rounded-full bg-rose-200">
              <div
                className="h-full rounded-full bg-rose-500"
                style={{ width: `${(failedRuns / runs.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Average */}
          <div className={`${cardStyle} border-sky-200 bg-gradient-to-br from-sky-50 to-blue-100`}>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-xl bg-sky-200 p-2.5 text-xl">⚡</span>
              <span className="text-xs font-bold text-sky-600">PERFORMANCE</span>
            </div>
            <p className="mt-4 text-sm text-sky-700">Average Response Time</p>
            <h2 className="mt-1 text-3xl font-extrabold text-sky-900">
              {Math.round(averageTime)} <span className="text-base">ms</span>
            </h2>
            <div className="mt-4 h-1.5 rounded-full bg-sky-200">
              <div className="h-full w-3/4 rounded-full bg-sky-500" />
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="w-full min-w-0 rounded-2xl border border-white bg-white/85 p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-base font-bold text-gray-800">
            🔎 Search & Filter Activity
          </h2>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search run ID, query, intent or tool..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 flex-1 rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 outline-none focus:ring-2 focus:ring-sky-100 sm:w-auto sm:min-w-[170px]"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </section>

        {/* Execution History */}
        <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-white bg-white/90 shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-sky-50 p-4 sm:p-5">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-violet-900">Execution History</h2>
              <p className="mt-1 text-sm text-gray-500">
                Showing <span className="font-semibold text-violet-700">{filteredRuns.length}</span> agent runs
              </p>
            </div>
            <span className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
              📋 Activity Logs
            </span>
          </div>

          {/* Only table scrolls horizontally */}
          <div className="w-full min-w-0 overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-left">
              <colgroup>
                <col className="w-[110px]" />
                <col className="w-[210px]" />
                <col className="w-[170px]" />
                <col className="w-[180px]" />
                <col className="w-[120px]" />
                <col className="w-[120px]" />
                <col className="w-[140px]" />
              </colgroup>

              <thead className="bg-linear-to-br from-violet-100 to-sky-100 text-xs font-bold text-violet-900">
                <tr>
                  <th className="whitespace-nowrap px-3 py-4">Run ID</th>
                  <th className="whitespace-nowrap px-3 py-4">User Query</th>
                  <th className="whitespace-nowrap px-3 py-4">Intent</th>
                  <th className="whitespace-nowrap px-3 py-4">Tool Used</th>
                  <th className="whitespace-nowrap px-3 py-4">Duration</th>
                  <th className="whitespace-nowrap px-3 py-4">Status</th>
                  <th className="whitespace-nowrap px-3 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRuns.map((run) => (
                  <tr key={run.id} className="border-t border-violet-100 hover:bg-violet-50/60">

                    <td className="whitespace-nowrap px-3 py-4">
                      <span className="rounded-lg bg-violet-50 px-2 py-1.5 text-xs font-bold text-violet-700">
                        {run.runId}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <p className="break-words text-sm font-semibold leading-5 text-gray-800">
                        {run.query}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="inline-block whitespace-normal break-words rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">
                        {run.intent}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <p className="break-words text-sm text-gray-700">{run.tool}</p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-sky-700">
                      ⚡ {run.duration} ms
                    </td>

                    <td className="whitespace-nowrap px-3 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold ${
                        run.status === "Success"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          run.status === "Success" ? "bg-emerald-500" : "bg-rose-500"
                        }`} />
                        {run.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4">
                      <button
                        onClick={() => setSelectedRun(run)}
                        className="whitespace-nowrap rounded-lg border border-violet-200 bg-violet-100 px-3 py-2 text-xs font-bold text-violet-800 transition hover:bg-violet-200"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredRuns.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="mb-2 text-3xl">🔍</div>
                      <p className="font-semibold text-gray-700">No agent activity found</p>
                      <p className="mt-1 text-sm text-gray-400">Try another search or filter.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {/* Details Modal */}
      {selectedRun && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-violet-950/40 p-3 backdrop-blur-sm"
          onClick={() => setSelectedRun(null)}
        >
          <div
            className="my-auto w-full min-w-0 max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 bg-linear-to-br from-violet-600 to-blue-600 p-5 text-white">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/80">AI Monitoring</p>
                <h2 className="mt-1 text-xl font-bold">Agent Run Details</h2>
              </div>
              <button
                onClick={() => setSelectedRun(null)}
                className="rounded-lg bg-white/20 px-3 py-1.5 text-xl hover:bg-white/30"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[65vh] space-y-3 overflow-y-auto p-4">

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0 rounded-xl bg-violet-50 p-3">
                  <p className="text-xs font-semibold text-violet-500">Run ID</p>
                  <p className="mt-1 break-words font-bold text-violet-900">{selectedRun.runId}</p>
                </div>
                <div className={`min-w-0 rounded-xl p-3 ${
                  selectedRun.status === "Success" ? "bg-emerald-50" : "bg-rose-50"
                }`}>
                  <p className="text-xs font-semibold text-gray-500">Status</p>
                  <p className={`mt-1 font-bold ${
                    selectedRun.status === "Success" ? "text-emerald-700" : "text-rose-700"
                  }`}>{selectedRun.status}</p>
                </div>
              </div>

              <div className="rounded-xl bg-sky-50 p-3">
                <p className="text-xs font-semibold text-sky-600">User Query</p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-800">{selectedRun.query}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0 rounded-xl bg-blue-50 p-3">
                  <p className="text-xs font-semibold text-blue-600">Intent</p>
                  <p className="mt-1 break-words font-bold text-blue-900">{selectedRun.intent}</p>
                </div>
                <div className="min-w-0 rounded-xl bg-cyan-50 p-3">
                  <p className="text-xs font-semibold text-cyan-600">Tool Used</p>
                  <p className="mt-1 break-words font-bold text-cyan-900">{selectedRun.tool}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-amber-50 p-3">
                  <p className="text-xs font-semibold text-amber-600">Duration</p>
                  <p className="mt-1 font-bold text-amber-900">⚡ {selectedRun.duration} ms</p>
                </div>
                <div className="rounded-xl bg-pink-50 p-3">
                  <p className="text-xs font-semibold text-pink-600">Execution Time</p>
                  <p className="mt-1 font-bold text-pink-900">🕒 {selectedRun.time}</p>
                </div>
              </div>

              <div className="rounded-xl bg-purple-50 p-3">
                <p className="mb-2 text-xs font-semibold text-purple-600">Agent Response</p>
                <p className="break-words rounded-lg bg-white p-3 text-sm leading-6 text-gray-700">
                  {selectedRun.response}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-violet-100 bg-violet-50 p-4">
              <button
                onClick={() => setSelectedRun(null)}
                className="w-full rounded-xl bg-linear-to-br from-violet-600 to-blue-600 py-3 font-bold text-white transition hover:from-violet-700 hover:to-blue-700"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}