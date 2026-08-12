/** Builds a Google Maps search URL from a free-text address — same approach proven in tonnarello-redesign.html. */
export function buildGoogleMapsUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
}
