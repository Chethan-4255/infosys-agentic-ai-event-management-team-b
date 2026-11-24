
"use client";

import { useState } from "react";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm your Event AI Assistant. How can I help you plan your event today?",
    },
  ]);

  const suggestions = [
    "Help me plan a college event",
    "Find suitable venues",
    "What events are coming up?",
    "Help me with event registration",
  ];

  function handleSend(text = input) {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "assistant",
        text: "Thanks for your question! I'm your Event AI Assistant. I can help you with event planning, venues, registrations, schedules, and event-related queries.",
      },
    ]);

    setInput("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-50 to-violet-100 p-4 md:p-6">
      <div className="mx-auto flex h-[calc(100vh-100px)] max-w-6xl flex-col overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-xl shadow-purple-200/50">

        {/* Header */}
        <div className="relative overflow-hidden border-b border-purple-100 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-5 md:p-6">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/20 text-3xl shadow-lg backdrop-blur-md">
              🤖
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                AI Event Assistant
              </h1>

              <div className="mt-1 flex items-center gap-2 text-sm text-purple-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Your smart assistant for event management
              </div>
            </div>

            <div className="ml-auto hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:block">
              ✨ EventAI
            </div>
          </div>
        </div>

        {/* Bright Chat Background */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-br from-cyan-100 via-pink-100 to-violet-200 p-5 md:p-8">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI Avatar */}
              {message.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg shadow-md">
                  🤖
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-7 shadow-md md:max-w-[70%] ${
                  message.role === "user"
                    ? "rounded-br-sm bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 text-white shadow-purple-200"
                    : "rounded-bl-sm border border-white bg-white/95 text-gray-700 shadow-violet-200/60"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="ml-12 pt-3">
              <p className="mb-4 text-sm font-bold text-violet-800">
                ✨ Try asking me
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className={`group rounded-2xl border p-4 text-left text-sm shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      index === 0
                        ? "border-pink-200 bg-gradient-to-br from-pink-50 to-rose-100 hover:from-pink-100 hover:to-rose-200"
                        : index === 1
                        ? "border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-100 hover:from-cyan-100 hover:to-sky-200"
                        : index === 2
                        ? "border-violet-200 bg-gradient-to-br from-violet-50 to-purple-100 hover:from-violet-100 hover:to-purple-200"
                        : "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200"
                    }`}
                  >
                    <span className="mb-2 block text-xl">
                      {["🎓", "📍", "📅", "🎟️"][index]}
                    </span>

                    <span className="font-semibold text-gray-700 group-hover:text-violet-800">
                      {suggestion}
                    </span>

                    <span className="mt-2 block text-xs text-gray-500">
                      Click to ask the AI assistant →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-violet-100 bg-white p-4 md:p-5">
          <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-cyan-50 via-pink-50 to-violet-50 p-2 shadow-sm transition-all focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask anything about events..."
              className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-500"
            />

            <button
              onClick={() => handleSend()}
              className="rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition-all hover:scale-[1.02] hover:from-violet-700 hover:to-blue-700 active:scale-95"
            >
              Send ✨
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-gray-500">
            EventAI Assistant · Smart event planning made simple
          </p>
        </div>
      </div>
    </div>
  );
}
