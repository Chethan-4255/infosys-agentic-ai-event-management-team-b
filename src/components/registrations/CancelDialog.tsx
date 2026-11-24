"use client";

import { useEffect } from "react";

interface CancelDialogProps {
  eventName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelDialog({
  eventName,
  onConfirm,
  onClose,
}: CancelDialogProps) {
  // Close with the Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="cancel-dialog-title" className="text-lg font-semibold text-gray-900">
          Cancel your registration?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          You will lose your spot at <span className="font-medium">{eventName}</span>.
          You can register again later if seats are still available.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Keep registration
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Cancel registration
          </button>
        </div>
      </div>
    </div>
  );
}