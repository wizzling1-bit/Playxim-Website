/**
 * Playxim Creator Dashboard Formatting Helpers
 * Strict formatting utilities using standard Intl APIs for currency, numbers, bytes, and dates.
 */

/**
 * Format currency amount with exact 2 decimal places and standard symbol
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format large numbers into clean compact representations (e.g. 1.4K, 394.2K)
 */
export function formatCompactNumber(num: number): string {
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format integer with standard thousands grouping (e.g. 1,482)
 */
export function formatNumber(num: number): string {
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format storage bytes into human-readable units (B, KB, MB, GB, TB)
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (!+bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const clampedIndex = Math.min(i, sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, clampedIndex)).toFixed(dm))} ${sizes[clampedIndex]}`;
}

/**
 * Get the next weekly payout date (Friday) and minimum threshold check
 */
export function getNextPayoutInfo(currentEarnings: number = 0, baseDate: Date = new Date()) {
  const day = baseDate.getDay(); // 0 is Sunday, 5 is Friday
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  const nextFriday = new Date(baseDate);
  nextFriday.setDate(baseDate.getDate() + daysUntilFriday);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(nextFriday);

  const minThreshold = 5.0;
  const isReached = currentEarnings >= minThreshold;

  return {
    nextFridayDate: nextFriday,
    formattedDate,
    minThreshold,
    isReached,
  };
}
