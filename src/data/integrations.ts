/** Public integration settings. Never store account credentials here. */
export const integrations = {
  // Set the full public event URL, for example https://cal.com/<account>/<event>.
  calBookingUrl: 'https://cal.com/tetsuya-maeda/30min',
  noteProfileUrl: 'https://note.com/ted81',
  mediumProfileUrl: '',
};

export function getBookingUrl(): string | null {
  if (!integrations.calBookingUrl.trim()) return null;
  const url = new URL(integrations.calBookingUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'cal.com' || url.username || url.password || url.pathname.split('/').filter(Boolean).length < 2) {
    throw new Error('calBookingUrl must be a public HTTPS Cal.com event URL.');
  }
  return url.href;
}
