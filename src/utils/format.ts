const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** "2027-01-24" -> "January 24, 2027" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
