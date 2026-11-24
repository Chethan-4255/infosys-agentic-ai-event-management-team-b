
"use client";

import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "Active" | "Suspended";
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Arjun", email: "arjun@gmail.com", role: "ADMIN", status: "Active" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "USER", status: "Active" },
    { id: 3, name: "Priya", email: "priya@gmail.com", role: "USER", status: "Suspended" },
    { id: 4, name: "Arun", email: "arun@gmail.com", role: "ADMIN", status: "Active" },
    { id: 5, name: "Sneha", email: "sneha@gmail.com", role: "USER", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "USER" as "ADMIN" | "USER",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter((user) => user.status === "Active").length;
  const suspendedUsers = users.filter((user) => user.status === "Suspended").length;
  const adminUsers = users.filter((user) => user.role === "ADMIN").length;

  function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
    };

    setUsers([...users, user]);

    setNewUser({
      name: "",
      email: "",
      role: "USER",
    });

    setShowForm(false);
  }

  function toggleStatus(id: number) {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
  }

  function deleteUser(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");

    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 p-4 text-gray-800 md:p-8">

      {/* Main Container */}
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm">
              ✨ EventAI Admin Panel
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-violet-950 md:text-4xl">
              Manage Users
            </h1>

            <p className="mt-2 text-gray-600">
              View, manage and monitor registered user accounts.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700"
          >
            + Add User
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Users */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-purple-200 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-violet-800">Total Users</p>
              <div className="rounded-xl bg-white/70 p-3 text-xl">👥</div>
            </div>
            <h2 className="mt-3 text-4xl font-extrabold text-violet-950">{users.length}</h2>
            <p className="mt-2 text-sm text-violet-700">All registered accounts</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-violet-500" />
          </div>

          {/* Active Users */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-200 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-emerald-800">Active Users</p>
              <div className="rounded-xl bg-white/70 p-3 text-xl">🟢</div>
            </div>
            <h2 className="mt-3 text-4xl font-extrabold text-emerald-950">{activeUsers}</h2>
            <p className="mt-2 text-sm text-emerald-700">Currently active accounts</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-emerald-500" />
          </div>

          {/* Admin Users */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-sky-200 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-blue-800">Admin Users</p>
              <div className="rounded-xl bg-white/70 p-3 text-xl">🛡️</div>
            </div>
            <h2 className="mt-3 text-4xl font-extrabold text-blue-950">{adminUsers}</h2>
            <p className="mt-2 text-sm text-blue-700">Users with admin access</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-blue-500" />
          </div>

          {/* Suspended Users */}
          <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-100 to-pink-200 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-rose-800">Suspended Users</p>
              <div className="rounded-xl bg-white/70 p-3 text-xl">🚫</div>
            </div>
            <h2 className="mt-3 text-4xl font-extrabold text-rose-950">{suspendedUsers}</h2>
            <p className="mt-2 text-sm text-rose-700">Restricted accounts</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-rose-500" />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-wrap gap-4 rounded-2xl border border-violet-200 bg-white/90 p-5 shadow-md">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[220px] flex-1 rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-lg shadow-violet-100/60">

          {/* Table Header */}
          <div className="border-b border-violet-100 bg-gradient-to-r from-violet-100 via-purple-100 to-blue-100 p-5">
            <h2 className="text-xl font-bold text-violet-950">All Users</h2>
            <p className="mt-1 text-sm text-violet-700">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-gradient-to-r from-violet-50 to-blue-50 text-sm font-semibold text-violet-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-violet-100 transition hover:bg-violet-50/70"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>

                    {/* Role Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          user.role === "ADMIN"
                            ? "bg-violet-100 text-violet-700 ring-1 ring-violet-200"
                            : "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                        }`}
                      >
                        {user.role === "ADMIN" ? "🛡 ADMIN" : "👤 USER"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-rose-100 text-rose-700 ring-1 ring-rose-200"
                        }`}
                      >
                        {user.status === "Active" ? "● Active" : "● Suspended"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                            user.status === "Active"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          }`}
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-violet-100 bg-violet-50/70 px-5 py-3 text-sm text-violet-700">
            👥 Total registered accounts: {users.length}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Add New User</h2>
                  <p className="mt-1 text-sm text-violet-100">Create a new EventAI account</p>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg bg-white/20 px-3 py-1 text-2xl transition hover:bg-white/30"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddUser} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-violet-800">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-violet-800">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-violet-800">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as "ADMIN" | "USER",
                    })
                  }
                  className="w-full rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 outline-none focus:ring-4 focus:ring-purple-100"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:from-violet-700 hover:to-blue-700"
                >
                  + Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
