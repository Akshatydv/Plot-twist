# Reviews (`/reviews`, `/review/<token>`, `/admin/reviews`)

## The rule: nobody picks and chooses
Reviews go live **the moment they are posted**. There is no approval queue and no
"feature" or "hide" button — the wall is whatever the cast actually wrote, newest
first, good and bad. Average and count are the plain figures over every review.

What the team **can** do (Admin → Reviews):
- **Reply publicly** ("Plot Twist replied" under the review).
- **Remove** a review — only for spam, abuse, unlawful content, or when the guest asks.
  It is permanent (the review and its photos are deleted).

You get an email at `ADMIN_NOTIFICATION_EMAIL` for every new review.

## How trust is built across the site
- **Every page footer** shows "★ 4.6 · 23 reviews from the cast — Read what they said →"
  (component `ReviewsTrustStrip`, data from `/api/reviews/summary`). It stays hidden
  until there is at least one review; there is never a "0 reviews" or placeholder.
- A permanent **Reviews** link sits in the footer link row, the homepage nav, and the
  logo menu on every journey page.
- The homepage has the "Don't take our word for it" strip, again only when reviews exist.

## Verified reviews (personal links)
- **Admin → Guests** has **Copy link** / **WhatsApp** per registered guest, and ✓ once they have reviewed.
- A review through a personal link is automatically **verified**, name and trip are
  pre-filled, and each guest can leave one. Anyone can also use the public form
  (unverified, no badge).
- Links are signed with `REVIEW_LINK_SECRET` (server-only; must be set in the deployed
  environment; rotating it invalidates links already sent).

## Because there is no approval step
Open posting invites spam and abuse, so the protections are: rate limit (4 per 30 min
per IP — per server instance, see below), a hidden honeypot field, photo decoding
(non-images are rejected), plain-text rendering (no HTML), the verified badge as the
trust signal, and the Remove button for real problems.

## Photos
Up to 4 per review. Decoded, rotated, resized to ≤1600px and stored as WebP, which also
strips GPS/camera metadata. Public `review-photos` bucket, random file names.

## Config
- `REVIEW_LINK_SECRET` — required for personal links.
- `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` — optional; adds "Read our Google reviews ↗".
- **Dev only:** `REVIEWS_DEMO=1` in `.env.local` shows 10 clearly-labelled SAMPLE reviews
  so the design can be checked. It does nothing in production. Delete the line to see
  the real (currently empty) site.

## Known limit
The rate limiter is in-memory, so on a multi-instance host (Netlify) it is looser than
it looks. Move it to a shared store (e.g. Upstash) if spam appears.
