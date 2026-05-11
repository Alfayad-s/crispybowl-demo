import { format } from "date-fns";

/** Shared date formatting for tables, tooltips, and API-derived timestamps. */
export function formatDateTime(iso: string, pattern = "yyyy-MM-dd HH:mm") {
  return format(new Date(iso), pattern);
}
