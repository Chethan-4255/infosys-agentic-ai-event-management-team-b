
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

  const successfulRuns = runs.filter(
    (run) => run.status === "Success"
  ).length;

  const failedRuns = runs.filter(
    (run) => run.status === "Failed"
  ).length;

  const averageTime =
    runs.reduce((total, run) => total + run.duration, 0) /
    (runs.length || 1);

  const filteredRuns = runs.filter((run) => {
    const matchesSearch =
      run.runId.toLowerCase().includes(search.toLowerCase()) ||
      run.query.toLowerCase().includes(search.toLowerCase()) ||
      run.intent.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || run.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Agent Activity</h1>
        <p className="mt-2 text-gray-500">
          Monitor AI agent executions, performance and activity logs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Agent Runs</p>
          <h2 className="mt-2 text-3xl font-bold">{runs.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Successful Runs</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {successfulRuns}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Failed Runs</p>
          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {failedRuns}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Average Response Time</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {Math.round(averageTime)} ms
          </h2>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-wrap gap-4 rounded-xl border bg-white p-5 shadow-sm">

        <input
          type="text"
          placeholder="Search run ID, query or intent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[220px] flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border px-4 py-3"
        >
          <option value="All">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">Execution History</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing {filteredRuns.length} agent runs
          </p>
        </div>

        <table className="w-full min-w-[950px] text-left">

          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-5 py-4">Run ID</th>
              <th className="px-5 py-4">User Query</th>
              <th className="px-5 py-4">Intent</th>
              <th className="px-5 py-4">Tool Used</th>
              <th className="px-5 py-4">Duration</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRuns.map((run) => (
              <tr key={run.id} className="border-t hover:bg-gray-50">

                <td className="px-5 py-4 font-medium">
                  {run.runId}
                </td>

                <td className="max-w-[220px] px-5 py-4">
                  {run.query}
                </td>

                <td className="px-5 py-4">{run.intent}</td>

                <td className="px-5 py-4">{run.tool}</td>

                <td className="px-5 py-4">{run.duration} ms</td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      run.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {run.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => setSelectedRun(run)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>

              </tr>
            ))}

            {filteredRuns.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                  No agent activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Run Details Modal */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Agent Run Details</h2>

              <button
                onClick={() => setSelectedRun(null)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">Run ID</p>
                <p className="font-semibold">{selectedRun.runId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">User Query</p>
                <p className="font-medium">{selectedRun.query}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Detected Intent</p>
                <p className="font-medium">{selectedRun.intent}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Tool Used</p>
                <p className="font-medium">{selectedRun.tool}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Execution Duration</p>
                <p className="font-medium">{selectedRun.duration} ms</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedRun.status}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Agent Response</p>
                <p className="rounded-lg bg-gray-50 p-3">
                  {selectedRun.response}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Time: {selectedRun.time}
              </p>

            </div>

            <button
              onClick={() => setSelectedRun(null)}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

