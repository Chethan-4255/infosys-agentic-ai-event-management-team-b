"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, CheckCircle2, Smartphone, CreditCard, Landmark, Lock } from "lucide-react";
import { EventItem } from "../../types";
import { registerForEvent } from "../../services/eventService";

interface RegistrationFormProps {
  event: EventItem;
  defaultName?: string;
  defaultEmail?: string;
  onSuccess: (bookedCount: number) => void;
}

type PaymentMethod = "UPI" | "CARD" | "NETBANKING";

export default function RegistrationForm({ event, defaultName = "", defaultEmail = "", onSuccess }: RegistrationFormProps) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [seats, setSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bankName, setBankName] = useState("State Bank of India");
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const isSoldOut = event.seatsLeft === 0 || event.status === "COMPLETED";
  const totalAmount = event.price * seats;
  const isPaid = totalAmount > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await registerForEvent({
      eventId: event.id,
      attendeeName: name,
      attendeeEmail: email,
      ticketsCount: seats,
      paymentMethod: isPaid ? paymentMethod : "FREE_PASS",
    });
    if (res.success) {
      setBookingId(res.bookingId);
      onSuccess(seats);
    }
    setSubmitting(false);
  };

  if (bookingId) {
    return (
      <div className="space-y-4 py-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{isPaid ? "Payment & Booking Successful!" : "Registration Confirmed!"}</h3>
        <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 text-left text-xs text-slate-600">
          <p className="flex justify-between"><span>Booking ID:</span><span className="font-mono font-bold text-slate-900">{bookingId}</span></p>
          <p className="flex justify-between"><span>Seats Reserved:</span><span className="font-semibold text-slate-900">{seats}</span></p>
          <p className="flex justify-between"><span>Amount Paid:</span><span className="font-semibold text-emerald-700">{isPaid ? `₹${totalAmount.toLocaleString()} (${paymentMethod})` : "FREE"}</span></p>
        </div>
        <Link href="/registrations" className="inline-flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          View My Registrations
        </Link>
      </div>
    );
  }

  const buttonLabel = isSoldOut ? "Registration Closed" : submitting ? "Processing..." : isPaid ? `Pay ₹${totalAmount.toLocaleString()} & Register` : "Confirm Free Registration";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-sm font-medium text-slate-500">Ticket Price</span>
        <span className="text-2xl font-bold text-slate-900">{event.price === 0 ? "FREE" : `₹${event.price}`}</span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700">Full Name</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700">Seats</label>
          <select value={seats} onChange={(e) => setSeats(Number(e.target.value))} disabled={isSoldOut} className="mt-1 w-full rounded-xl border border-slate-200 px-2.5 py-2 text-sm focus:border-indigo-500 focus:outline-none">
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {isPaid && !isSoldOut && (
        <div className="space-y-2.5 border-t border-slate-100 pt-3">
          <label className="block text-xs font-semibold text-slate-700">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "UPI", label: "UPI", icon: Smartphone },
              { id: "CARD", label: "Card", icon: CreditCard },
              { id: "NETBANKING", label: "NetBank", icon: Landmark },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id as PaymentMethod)} className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-xs font-semibold transition ${paymentMethod === m.id ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  <Icon className="h-4 w-4" /> {m.label}
                </button>
              );
            })}
          </div>

          {paymentMethod === "UPI" && (
            <input type="text" required value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="UPI ID (e.g., name@okicici)" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none" />
          )}
          {paymentMethod === "CARD" && (
            <div className="space-y-2">
              <input type="text" required maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number (4532 •••• •••• 1234)" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" required maxLength={5} value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none" />
                <input type="password" required maxLength={3} value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none" />
              </div>
            </div>
          )}
          {paymentMethod === "NETBANKING" && (
            <select value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none">
              <option>State Bank of India (SBI)</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
          )}
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm">
        <span className="font-medium text-slate-600">Total Payable</span>
        <span className="font-bold text-slate-900">{totalAmount === 0 ? "₹0 (Free)" : `₹${totalAmount.toLocaleString()}`}</span>
      </div>

      <button type="submit" disabled={isSoldOut || submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">
        {isPaid ? <Lock className="h-4 w-4" /> : <Ticket className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}
