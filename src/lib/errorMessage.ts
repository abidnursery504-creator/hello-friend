// Maps common Supabase/Postgres error text to a user-facing Bengali message.
// Falls back to a given default instead of ever showing raw driver/DB errors.
export function friendlyError(err: unknown, fallback: string): string {
  const raw = err instanceof Error ? err.message : String(err ?? "");
  const text = raw.toLowerCase();

  if (text.includes("duplicate key") || text.includes("already exists")) {
    return "এই তথ্য দিয়ে ইতিমধ্যে একটি এন্ট্রি আছে।";
  }
  if (text.includes("invalid login credentials")) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }
  if (text.includes("user already registered")) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট আছে।";
  }
  if (text.includes("email not confirmed")) {
    return "ইমেইল কনফার্ম করা হয়নি। ইনবক্স চেক করুন।";
  }
  if (text.includes("password") && text.includes("6 char")) {
    return "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।";
  }
  if (text.includes("row-level security") || text.includes("permission denied") || text.includes("rls")) {
    return "এই কাজটি করার অনুমতি আপনার নেই।";
  }
  if (text.includes("network") || text.includes("fetch failed") || text.includes("failed to fetch")) {
    return "নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।";
  }
  if (text.includes("foreign key")) {
    return "এই তথ্যটি অন্য কিছুর সাথে যুক্ত থাকায় এই কাজটি করা যায়নি।";
  }

  // If the message is already a short, plain-language message we wrote
  // ourselves (e.g. server-side validation text), show it as-is; otherwise
  // fall back rather than risk leaking a raw driver error.
  const looksHandWritten = /[ঀ-৿]/.test(raw) && raw.length < 200;
  return looksHandWritten ? raw : fallback;
}
