const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Returns a Date representing the start of tomorrow (00:00 local time).
 */
export const getTomorrowStart = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

/**
 * Returns the default date range used across the route manager screens:
 * from the beginning of tomorrow until the beginning of the day after.
 */
export const getInitialDateRange = () => {
  const start = getTomorrowStart();
  const end = new Date(start.getTime() + DAY_IN_MS);
  return { start, end };
};

export { DAY_IN_MS };
