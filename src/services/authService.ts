import { User, UserRole } from "../types";
// import { apiFetch } from "./apiClient";

export async function loginUser(
  email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  // Backend teammate: replace with -> return apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password: _password }) });
  const isAdmin = email.toLowerCase().includes("admin");
  const rawName = email.split("@")[0] || "Intern User";
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return {
    token: "mock-jwt-token-" + Date.now(),
    user: {
      id: isAdmin ? "admin-1" : "user-1",
      name: formattedName,
      email,
      role: isAdmin ? "ADMIN" : "USER",
    },
  };
}

export async function registerUser(
  name: string,
  email: string,
  _password: string,
  role: UserRole = "USER"
): Promise<{ user: User; token: string }> {
  // Backend teammate: replace with -> return apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password: _password, role }) });
  return {
    token: "mock-jwt-token-" + Date.now(),
    user: {
      id: "user-" + Date.now(),
      name,
      email,
      role,
    },
  };
}
