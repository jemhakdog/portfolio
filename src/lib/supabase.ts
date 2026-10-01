import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type DbGuestbookEntry = {
  id: string;
  name: string;
  role: string | null;
  message: string;
  avatar_color: string | null;
  created_at: string;
};

/**
 * Sanitizes user input string against XSS and control character injection.
 * React escapes text by default, but this adds defense-in-depth:
 * 1. Strips non-printable ASCII control characters and null bytes.
 * 2. Strips raw HTML tags to prevent stored HTML injection.
 * 3. Trims whitespace.
 */
export function sanitizeInput(value: string, maxLength: number): string {
  if (!value || typeof value !== "string") return "";

  const cleaned = value
    // Remove control characters (null bytes, bell, backspace, etc.)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    // Strip HTML tag delimiters to prevent embedded markup / script injection
    .replace(/<[^>]*>/g, "")
    // Normalize newlines to avoid CR-LF injection
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  return cleaned.slice(0, maxLength);
}

/**
 * Formats ISO created_at timestamp into a readable date string.
 */
export function formatGuestbookDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return "Today";

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}
