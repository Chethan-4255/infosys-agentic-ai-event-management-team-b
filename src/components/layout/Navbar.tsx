"use client";

import Link from "next/link";
import { Menu, Calendar, LogOut, User } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:px-6">
      {/* Left Side: Mobile Hamburger Button + Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600">
          <Calendar className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            EventAI Portal
          </span>
        </Link>
      </div>

      {/* Right Side: User Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">Intern User</span>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
}
