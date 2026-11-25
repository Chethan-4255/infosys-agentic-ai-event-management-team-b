import { ChatMessage, AgentLog } from "../types";

const RAG_BASE_URL = process.env.NEXT_PUBLIC_RAG_API_URL || "http://localhost:8000/api";

export async function askAiAssistant(prompt: string): Promise<ChatMessage> {
  // RAG teammate: replace with fetch(`${RAG_BASE_URL}/chat`, { method: "POST", body: JSON.stringify({ prompt }) })
  return {
    id: Date.now().toString(),
    sender: "assistant",
    content: `Here is a sample RAG response for: "${prompt}". Once connected to ${RAG_BASE_URL}, real event and venue knowledge base answers will appear here.`,
    sources: ["Upcoming_Events_Catalog.pdf", "Venue_Guidelines.md"],
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

export async function getAgentActivityLogs(): Promise<AgentLog[]> {
  // Agent teammate: replace with fetch(`${RAG_BASE_URL}/agent-logs`)
  return [
    {
      id: "log-1",
      action: "Search Upcoming Hackathons",
      toolUsed: "VectorDB_EventRetriever",
      status: "SUCCESS",
      latencyMs: 320,
      timestamp: "2 mins ago",
    },
  ];
}
