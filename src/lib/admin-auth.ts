import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AUTH_KEY = "itel.admin.auth";

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    return data.password === ADMIN_PASSWORD;
  });

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export async function loginAdmin(password: string): Promise<boolean> {
  const valid = await verifyAdminPassword({ data: { password } });
  if (valid) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(AUTH_KEY);
}
