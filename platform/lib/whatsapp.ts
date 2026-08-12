import type { Lang, ReservationConfig } from "@/config/types";
import { pick } from "@/lib/text";

function digitsOnly(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/** General contact WhatsApp link — "message us" with no pre-filled reservation details. */
export function buildWhatsAppContactLink(whatsappNumber: string, message?: string): string {
  const base = `https://wa.me/${digitsOnly(whatsappNumber)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface ReservationDetails {
  people: string;
  date: string;
  time: string;
}

/**
 * Builds a wa.me deep link with a pre-filled, structured reservation
 * message. This is intentionally NOT a booking system — the restaurant
 * receives a plain WhatsApp message and confirms manually.
 */
export function buildReservationLink(
  reservation: ReservationConfig,
  details: ReservationDetails,
  lang: Lang
): string | null {
  if (!reservation.enabled || !reservation.whatsappNumber) return null;

  const template =
    pick(reservation.messageTemplate, lang) ||
    "Ciao, vorrei prenotare un tavolo per {people} persone il {date} alle {time}.";

  const message = template
    .replace("{people}", details.people)
    .replace("{date}", details.date)
    .replace("{time}", details.time);

  return buildWhatsAppContactLink(reservation.whatsappNumber, message);
}
