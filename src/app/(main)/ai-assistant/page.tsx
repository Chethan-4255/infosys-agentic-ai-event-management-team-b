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
    <div className="flex h-[calc(100vh-80px)] flex-col rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b p-5">
        <h1 className="text-2xl font-bold">AI Event Assistant</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your smart assistant for event management
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
            </div>
            </div>
        ))}

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="pt-4">
            <p className="mb-3 text-sm text-gray-500">
              Try asking me:
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask anything about events..."
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleSend()}
            className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}