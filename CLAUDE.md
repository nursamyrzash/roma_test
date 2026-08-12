# Roma Restaurant Demos — Project Brief

## What this is
Sales demo websites for a web-design business targeting restaurants in Rome
(Trastevere focus first). The demos are the pitch: send a restaurant owner a
link to a site built specifically for them, close them as one of the first
10 clients, then use paid work to build a small SaaS/CMS layer later.

## Business model (from planning notes)
- MVP tier: **Digital Menu + Restaurant Page**, ~€120, 48–72h delivery, 1 round
  of revisions included.
- Upgrade ladder: €120 menu page → €350 multi-page site → €500–800 "digital
  system" (dynamic menu, booking, analytics) → €30–60/mo maintenance →
  €70–150/mo "digital concierge" (WhatsApp automation, priority changes).
- For restaurants with an existing outdated site: **"Restaurant Website
  Renewal"** positioning (not "I make websites" / not "I fix your website") —
  ~€299, framed as modernizing an existing brand, not replacing it.
- Outreach message: short, respectful, leads with "I made a demo specifically
  for your restaurant," no criticism of their current site, link first,
  no-pressure close. IT and EN versions already drafted — ask if needed.

## Files in this folder
- `osteria-da-mario.html` — **Reusable generic template.** Fictional
  restaurant ("Osteria da Mario," Trastevere). All content lives in a single
  `RESTAURANT` JS config object plus a handful of CSS variables at the top of
  the file — cloning this for a new prospect means editing that object, not
  rebuilding sections. Roman-classic visual style: wine/travertine/brass
  palette, Fraunces + Inter + IBM Plex Mono, "targa" (Roman street-plaque)
  eyebrow labels as the signature design element. Has a WhatsApp
  pre-filled-message reservation flow (appropriate for restaurants that do
  take bookings).
- `tonnarello-redesign.html` — **Client-specific demo** built around the real
  restaurant Tonnarello (tonnarello.it, 6 Trastevere/Rome locations). Content
  pulled from their real site: real addresses/hours per location, real menu
  categories and dish names (Tonnarelli, saltimbocca, abbacchio, coda alla
  vaccinara, polpette, tiramisù). Key business-logic difference from the
  generic template: **Tonnarello is walk-in only, no reservations by phone,
  email, or web** — so this demo has NO booking flow. Instead its signature
  feature is a "When to Come" crowd-level chart (illustrative, not live
  data) that turns their own "la fila" (the line) running joke into a useful
  feature. Menu is a tap-through digital menu replacing their 5 PDF menus.
  Location switcher for the 6 real addresses. TripAdvisor link is real;
  review text itself is not fabricated. Bold condensed (Anton) + Newsreader
  italic + Inter + Space Mono, tomato/egg-pasta color story.

## Known caveats to fix before either demo goes out for real outreach
- Tonnarello demo: **menu prices are placeholders** (never had access to
  their real PDF pricing) — labeled as indicative in the UI, but must be
  confirmed or removed before sending to the owners.
- Tonnarello demo: **crowd chart is illustrative**, not real foot-traffic
  data — labeled as such, keep that label intact.
- Osteria da Mario demo: phone/WhatsApp number and address are placeholders
  — must be swapped for a real prospect's info before sending.

## Design approach (apply to future client demos too)
- Research the prospect's actual live site first. Match the demo to their
  real business logic (reservation policy, number of locations, menu
  format) rather than forcing the generic template.
- Single self-contained HTML file per demo (inline CSS/JS, Google Fonts via
  CDN) — easiest to send as a link or open directly, no build step.
- IT/EN bilingual toggle is a standard, non-negotiable feature for the Rome
  market — tourists need English menu clarity.
- Each new client demo should get its own distinct visual identity (color
  palette + type pairing) rather than reusing Osteria da Mario's Roman
  classic look — avoids the "every demo looks templated" problem, keeps the
  positioning "made specifically for you" credible.
- Avoid generic AI-design defaults (cream + terracotta + serif; the exact
  combination Osteria da Mario intentionally uses only because it fits a
  traditional-trattoria brief) unless the client's brand genuinely calls
  for it. Pull the signature visual idea from something real and specific
  about that restaurant (Tonnarello's own line-joke → the crowd chart;
  Roman street-plaques → Osteria da Mario's eyebrow labels).

## `platform/` — the reusable template (current)
The one-off-HTML-per-client approach above is superseded by `platform/`, a
Next.js + Tailwind app implementing the "Roma Tavola" architecture: one
shared codebase, each restaurant a typed config object
(`platform/config/clients/<id>.ts`), selected at build time via the
`CLIENT_ID` env var — one Vercel project per client, same repo. See
`platform/config/types.ts` for the full schema and
`platform/lib/getClientConfig.ts` for the single seam all config access
flows through (the intended upgrade path to hostname-based multi-tenancy
or a CMS later, without touching any component).

Two reference clients exist and both build clean (`npm run build` with
either `CLIENT_ID`):
- `tonnarello` — real data ported from `tonnarello-redesign.html` (6
  locations, walk-in-only, `reservation.enabled: false`). Menu prices are
  still placeholders (never had access to the real PDF pricing) — same
  caveat as the old HTML demo, now surfaced via `menuNote` in the UI.
- `osteria-da-mario` — fictional, single-location, `reservation.enabled:
  true`. Exercises the opposite branches of the schema (reservation form,
  location tabs collapsed to one). Placeholder contact details throughout.

Both clients currently use generator-drawn solid-color PNG placeholder
images (`platform/public/clients/<id>/`) standing in for real photography
— swap before either ever goes out for real outreach, same spirit as the
old demos' CSS-gradient placeholders.

Non-goals for this pass (deliberately not built): booking database,
WhatsApp bot automation, CMS/admin UI, analytics dashboard or real
analytics backend (the `trackEvent()` interface is wired everywhere but
no-ops to `console.debug` until a backend is chosen), ES translation
content, hostname-based multi-tenancy.

## Likely next steps
- Onboard a real second paying client: add `config/clients/<id>.ts`,
  source real photos into `public/clients/<id>/`, run
  `npm run qr <id>`, create its Vercel project.
- Source real Tonnarello menu pricing to remove the placeholder caveat.
- Wire a real analytics backend (Plausible/GA4) once there's a client to
  show numbers to.
