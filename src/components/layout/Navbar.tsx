"use client";

import Link from "next/link";
import { Menu, Calendar, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-xs lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open Sidebar">
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2 text-teal-600">
          <Calendar className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight text-slate-900">EventAI Portal</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span className={`hidden rounded-full px-2.5 py-0.5 text-[11px] font-bold sm:inline-block ${user.role === "ADMIN" ? "bg-amber-100 text-amber-800" : "bg-teal-50 text-teal-700"}`}>
            {user.role}
          </span>
        )}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">{user ? user.name : "Guest Intern"}</span>
        </div>

        <Link
          href="/login"
          onClick={logout}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-4 w-4" />
          <span>{user ? "Logout" : "Login"}</span>
        </Link>
      </div>
    </header>
  );
}
