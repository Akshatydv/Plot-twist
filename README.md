# PLOT TWIST — launch landing page (V1, visual)

Next.js 16 (App Router) · Tailwind v4 · Framer Motion · TypeScript.

```bash
npm install
npm run dev     # http://localhost:4321
```

## Where things live

| What | Where |
| --- | --- |
| **All copy** | `src/content/site.ts` — one file, edit here, not in components |
| Sections | `src/components/{Hero,SetupSection,ColourClue,StoryCollage,BrandStatement,MysteryPreview,ApplicationTeaser,ApplicationForm,Footer}.tsx` |
| Painted marks & doodles | `src/components/Brush.tsx` |
| Palm silhouette (generated, no asset) | `src/components/Palm.tsx` |
| Hero sky (CSS/SVG, no photo) | `src/components/SunsetBackdrop.tsx` |
| Logo placeholder | `src/components/Logo.tsx` |
| Motion primitives | `src/components/motion.tsx` |
| Palette / fonts / textures | `src/app/globals.css` |

## Typography

- `font-brush` — Permanent Marker. Brand phrases and the wordmark only. **Note:** its `/` glyph reads as a `Λ` at large sizes, so `10/10` is set in `font-display` instead.
- `font-display` — Anton. Oversized editorial caps.
- `font-serif` — Instrument Serif. Editorial headlines.
- `font-hand` — Caveat. Handwritten annotations.
- `font-sans` — DM Sans. All information.

## Before launch

- **Replace the photography.** Everything in `public/photos/` is Unsplash, self-hosted for the V1 look. Swap for owned/licensed shots — nothing showing a recognisable landmark, that's the whole point.
- **Replace the logo.** `Logo.tsx` draws the ring, plane and palm around brush-set type. Drop in the real SVG/PNG; everything sizes off the component's `font-size`.
- **Provision a database.** See the Storage note below.

## Notes

- Photography is self-hosted in `public/photos/`. The hero is the LCP element and must not go through the image optimizer to a third-party CDN — that timed out on the large variants and dropped the image entirely. A painted gradient sits underneath it as a fallback.
- Motion respects `prefers-reduced-motion` throughout.
- Mobile has its own composition (swipeable photo wall, its own casting-board layout), not a shrunken desktop.

## Phase 2 — the funnel

The page is a working funnel: discover clues → guess the destination → apply.

| Piece | Where |
| --- | --- |
| Destination answer (change it here, nowhere else) | `src/content/mystery.ts` → `DESTINATION` / `ACCEPTED` |
| Which clues count, and the guess gate | `src/content/mystery.ts` → `PRIMARY_CLUE_IDS`, `GUESS_THRESHOLD` |
| Hunt state + localStorage | `src/components/mystery/PlotProvider.tsx` |
| Application rules (shared client + server) | `src/lib/applications.ts` |
| Where submissions go | `src/lib/applicationStore.ts` |
| Submission endpoint | `src/app/api/applications/route.ts` |
| Analytics events | `src/lib/analytics.ts` |

### Five primary clues

Only these five count toward `THE PLOT x/5`. Everything else is a bonus find.

Five findable spots — Setup, two on the Visual Story wall, and two in the
Mystery section — carry the primary clues. They are IDs, not content.

**Information is assigned by discovery order, not by location.** Visitors
explore in whatever order they like, so keying reveals to the page they happen
to poke first would let someone open with the strongest clue and collapse the
mystery. `CLUE_LADDER` in `mystery.ts` guarantees the arc every time:

| Found | Hands over |
| --- | --- |
| 1st | island, tropical, passport — "could be anywhere." |
| 2nd | Southeast Asia, 8° south — "hmm. getting warmer." |
| 3rd | daily flower offerings, an island that kept its own gods — "okay, you have a theory." |
| 4th | cliff temples, rice terraces, a volcano — "this feels suspicious now." |
| 5th | "Island of the Gods" — "you definitely know." |

Rung three is deliberately the one that makes a guess possible, which is why
`GUESS_THRESHOLD` is **3**. No rung ever names the destination.

### Storage

Supabase. Run `db/applications.sql` once, then set `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`). Neither is `NEXT_PUBLIC_`:
the service-role key is server-only.

Unconfigured, submissions fall back to `.data/applications.jsonl` in
development (with a warning) and are **refused** in production — silently
dropping an application is worse than failing in front of someone.

Privacy: the API is write-only. There is no GET, no applicant record ever
reaches a browser, and the SQL enables RLS with no policies so the anon role
can read nothing even if a key leaks.

Duplicates: a unique index on `(lower(instagram), journey)` means Postgres
decides, not a read-then-write. Handles normalise first, so `@ada`,
`ada` and `https://instagram.com/ADA/` are one identity.

### Abuse resistance

`src/app/api/applications/route.ts` also enforces, before anything touches storage:

- a 20kb request-body ceiling,
- an in-memory rate limit (5 submissions / 10 minutes / IP — see `src/lib/rateLimit.ts`; per-process, so a multi-instance deploy multiplies the effective limit by instance count, which is an acceptable trade at launch scale),
- a honeypot field (`_hp` — see `EMPTY` in `ApplicationForm.tsx`). Real visitors never see it; anything that fills it gets a fake 201 success and is silently discarded.

## Phase 3A — production data & the casting team

### Provisioning Supabase

1. Create a Supabase project.
2. Run `db/applications.sql` once (SQL editor, or `supabase db push`). It's
   idempotent — safe to re-run against a project that already has the table.
3. **Auth → Providers**: email/password should already be on by default.
4. **Auth → Users → Add user** — create one user per team member who should
   have casting access. Set a real password (or use "send invite").
5. Copy **Project Settings → API**: `URL`, `anon` `public` key, and
   `service_role` `secret` key into `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` respectively (see `.env.example`).
6. Set `ADMIN_EMAILS` to the comma-separated list of the team members you
   created in step 4. **This is the actual authorization gate** — creating a
   Supabase user makes someone *authenticatable*, being on this list makes
   them *an admin*. The two are deliberately separate: revoking access is
   editing an env var, not deleting an account.

### Running locally

```bash
npm install
cp .env.example .env.local   # fill in the six values above
npm run dev                  # http://localhost:4321
```

Without the Supabase vars, the public form still works end-to-end (submissions
land in `.data/applications.jsonl`), but `/admin/*` cannot authenticate anyone
— `/admin/login` will render and explain that auth isn't configured rather
than crash.

### Deploying

Set the same six environment variables on the host (Vercel, or wherever this
ends up). Nothing else is environment-specific. `SUPABASE_SERVICE_ROLE_KEY`
must be a **server** environment variable, never exposed to the build's
client bundle — it isn't `NEXT_PUBLIC_`-prefixed, so Next.js won't inline it
regardless, but double-check your host doesn't have a separate "expose to
client" toggle that could override that.

### The admin panel — `/admin/applications`

Not linked from anywhere public. Protected twice:

1. `src/middleware.ts` — redirects to `/admin/login` if there's no valid,
   allow-listed session. Runs on every request to `/admin/*`.
2. `requireAdmin()` in `src/lib/admin.ts` — the same check, called again at
   the top of every admin page and Server Action. Middleware can be
   misconfigured or bypassed by a routing change; a check inside the page
   itself can't be.

Both checks are "signed in *and* on `ADMIN_EMAILS`" — a Supabase account on
its own grants nothing.

All data access lives in `src/lib/adminApplications.ts`, which is the only
file that queries or mutates the `applications` table for reading. It uses
the service-role client (`src/lib/supabase/serviceRole.ts`), which bypasses
RLS by design — that's safe here specifically because nothing reaches this
file without passing `requireAdmin()` first. This client is never used
anywhere a browser could trigger it directly.

What's there:

- **Counts** (`getApplicationCounts`) — real `count: 'exact'` queries against
  Postgres, one per status plus a total. Never fabricated.
- **List** (`listApplications`) — search (name/Instagram via `ilike`), status
  filter, journey filter, newest/oldest sort. Filtering is a plain HTML GET
  form; the page re-renders server-side from the URL's query string, so there's
  no client-side data-fetching code to keep in sync.
- **Detail** (`getApplication`) — the full record, including the three
  answers in the applicant's own words and the private `notes` field.
- **Status changes** and **notes** are Server Actions
  (`src/app/admin/applications/[id]/actions.ts`) that call `requireAdmin()`
  again before writing, then `revalidatePath` so the page reflects the change
  immediately. There is no automated status transition anywhere — a human
  clicks a status button.

`notes` is admin-only in every direction: never populated from the public
`ApplicationInput` (see `toStoredApplication` in `src/lib/applications.ts`,
which has no `notes` field to copy from), never returned by `/api/applications`,
never sent to analytics.

### Adding a second journey

`JOURNEYS` in `src/lib/applications.ts` is the list the admin's journey filter
renders from. Add a row there when Journey 02 exists; the `journey` column,
the uniqueness constraint, and the admin filters already work per-journey
without further changes. `JOURNEY` (singular) stays the constant the *public*
form writes today — swap what it points at, or add a way to choose between
journeys, whenever there's more than one live at once.

### Known limitation

Next 16 deprecated the `middleware.ts` file convention in favour of a `proxy.ts`
rename (see the build's deprecation notice). Functionally `middleware.ts`
still works — this is a naming migration, not a breaking change — but expect
to rename it when upgrading past whatever version removes the old name.

## Phase 3B — the Plot Twist reward

Solving the destination now hands over a reward. The sequence is:

```
YOU GOT IT. → BALI. → "But obviously… there's another plot twist."
→ [sealed envelope] → OPEN IT → your reward → MAKE YOUR CASE →
```

| Piece | Where |
| --- | --- |
| The pool, the copy, the odds | `src/content/rewards.ts` |
| Assignment + persistence | `src/components/mystery/PlotProvider.tsx` |
| The envelope and the card | `src/components/mystery/RewardReveal.tsx` |

### Tuning it

Everything lives in `src/content/rewards.ts` — the eight rewards, their copy,
their values, and their weights. The UI reads that file and nothing else, so
changing the pool or the odds never means touching a component.

**The weights are placeholders.** All eight are currently equally likely,
which is deliberately wrong for real economics — ₹5,000 off should not be as
common as a free first round. Set `weight` per row from trip margin and
supplier cost before launch. The picker already normalises across whatever
numbers are there, and a `weight: 0` removes a reward from circulation
without deleting it.

### One reward, once

The reward is assigned in `PlotProvider` the instant the destination is
solved, then written to the same localStorage record as the hunt. Every later
read recovers it; the assignment effect is guarded on an id already existing,
so solve → refresh → return can never roll a second one. `RewardReveal` only
performs the opening — it never decides anything, so re-rendering it is inert.

**This is client-side, so it is not tamper-proof.** Someone who clears
localStorage can solve again and get another roll. That is acceptable while
the reward is just a promise on a screen; the real gate has to be server-side
at redemption, when a reward is actually worth money. `reward_id` is already
stored on the application record, which is what redemption should check
against.

### Reward → application

`reward_id` rides along with `clue_progress` and `destination_guess` into the
existing application POST, and is re-validated server-side against the pool
(`toStoredApplication`) so a hand-crafted request can't invent a reward. It
shows on the admin detail page, resolved to its title. Never public.

### Deliberately not built

No payment, redemption, booking, supplier integration or fulfilment — the
reward is currently a promise, not a transaction. No admin reward management
and no leaderboard.

No email field (Instagram + mobile are the contact channels). No automated
scoring, ranking or recommendation of any kind — casting is manual by design.
No public "who's been selected" page yet (see brief §17) — `status` exists on
every record so that can be built later without a migration.

## Phase 4A — analytics, attribution & launch

### The funnel

One vendor-neutral layer in `src/lib/analytics.ts`. Every event carries
first-touch campaign context automatically, so any step can be broken down by
Reel without a join.

| Event | Fires when | Props |
| --- | --- | --- |
| `page_view` | mount | — |
| `start_plot` | hero CTA | — |
| `clue_discovered` | each new primary clue | `clue_number`, `total` |
| `guess_started` | first keystroke in the guess box | `clue_progress` |
| `guess_result` | guess submitted | `result` |
| `destination_revealed` | correct guess | — |
| `reward_reveal_started` | envelope tapped | — |
| `reward_revealed` | card shown | `reward_id` |
| `share_plot` | share tapped | — |
| `make_your_case` | any application CTA | — |
| `application_started` | first keystroke in the form | `clue_progress` |
| `application_step_completed` | step 1 / 2 passes validation | `step` |
| `application_submitted` | 201 from the API | `clue_progress` |
| `open_instagram` | footer handle | — |

**No PII, ever.** Only ordinals, counts, outcomes and configured ids. The
guessed destination is never sent — only whether it was right. Asserted in
testing against the literal submitted values.

⚠️ **Never call `track()` inside a `setState` updater.** React re-invokes
updaters (StrictMode, concurrent rendering), which fires the event twice and
silently doubles the funnel. This bug shipped once and was caught by the
end-to-end test; both call sites now report from an effect or outside the
updater.

### Connecting a provider

Nothing is installed. `track()` hands off to whichever of these is on
`window`, so adding one is a script tag and no code change:

- **Plausible** — `window.plausible`. Recommended: cookieless, no consent
  banner needed.
- **GA4 / GTM** — `window.gtag` or `window.dataLayer`.
- **Meta Pixel** — `window.fbq`. Add the Pixel ID script in
  `src/app/layout.tsx`; the standard-event mapping already exists in
  `metaEventFor()`.

Meta mapping is deliberately conservative: `Lead` fires **only** on a real
submitted application. `CompleteRegistration` is unused — nobody registers.
Inflating these teaches Meta's optimiser the wrong thing and wastes spend.

### Consent

Gated but defaulted **on** (`DEFAULT_CONSENT` in `analytics.ts`), which is the
right posture for first-party cookieless analytics in India, the launch
market. The moment a provider that needs consent goes in (Meta Pixel, GA with
ads features), flip the default to `false` and call
`setAnalyticsConsent(true)` from a banner. No call site changes.

### Campaign URLs

Same landing page every time — only the parameters change:

```
/?utm_source=instagram&utm_medium=social&utm_campaign=journey01_launch&utm_content=reel01
/?utm_source=instagram&utm_medium=social&utm_campaign=journey01_launch&utm_content=reel02
/?utm_source=instagram&utm_medium=social&utm_campaign=journey01_launch&utm_content=story01
/?utm_source=instagram&utm_medium=social&utm_campaign=journey01_launch&utm_content=creator_akshat01
```

Only `utm_content` needs to change per piece of content. Nothing is
hard-coded — whatever values you pass are captured.

**First-touch wins.** Someone who arrives from `reel01`, leaves, and returns
via `reel02` still counts as a `reel01` applicant; the later touch is kept
separately in `last_*`. The question worth answering is which content
*produced* the applicant, not which page they happened to be on when they
filled the form.

Attribution is four short strings plus a timestamp. No IP, no user agent, no
fingerprint. It rides along with the application and shows in the admin
detail view under ACQUISITION.

### Debug mode

A `plot·debug` tab sits bottom-right in development only (`PlotDebug.tsx`
returns `null` when `NODE_ENV !== "development"`). Shows journey, clue
progress, guess state, reward, event count and live attribution, with a
**reset visitor** button that clears all `plottwist.*` keys — the quickest way
to re-test a campaign as a brand-new visitor.

### Launch checklist

- [ ] Production domain configured, `NEXT_PUBLIC_SITE_URL` set to match
- [ ] HTTPS working
- [ ] All environment variables set on the host (see `.env.example`)
- [ ] Supabase project created and `db/applications.sql` run
- [ ] **Real application insert tested against Supabase** (never yet run — see below)
- [ ] Admin login tested with a real allow-listed account
- [ ] Admin list, detail, status change and notes tested
- [ ] Duplicate Instagram blocked against the real unique index
- [ ] Analytics provider connected and events arriving
- [ ] Attribution verified end-to-end from a real campaign URL
- [ ] OG preview checked in a real share (Instagram DM / WhatsApp)
- [ ] Mobile tested at 375 / 390 / 430
- [ ] Instagram in-app browser tested on a real device
- [ ] 404 and error states checked
- [ ] No test applicant data in the production table
- [ ] No secrets committed (`.env*` is gitignored, `.env.example` is not)
- [ ] Destination not exposed — it appears only in `mystery.ts`, never in
      metadata, OG image, alt text or analytics

## Phase 4A.5 — the live Supabase project

Linked to project ref `odvsjkegzupbsmudzzti` ("Plot Twist", ap-northeast-1).

```bash
npx supabase migration list   # local vs remote migration state
npx supabase db push          # apply pending migrations
node scripts/verify-db.mjs    # assert schema, constraints and RLS on the REAL db
```

### Migrations

`supabase/migrations/20260827000000_applications.sql` is a byte-identical copy
of `db/applications.sql`. That file stays the human-readable reference; the
migration is what the CLI applies. **If you change the schema, change both**
(or add a new timestamped migration and update `db/applications.sql` to match).

`supabase db dump` needs Docker and will fail without it. `migration list`,
`db push` and the verification script all talk to Postgres directly and work
without Docker.

⚠️ **Never run `supabase db reset` against the linked project** — it drops
everything. There is no local Docker stack here, so a "reset" hits production.

### Env var naming

The code reads `SUPABASE_URL`, `SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` — deliberately **without** `NEXT_PUBLIC_`. The anon
key is only ever used server-side (the `@supabase/ssr` client in the admin
login flow), so there is no reason to ship either key to the browser.
Verified: a production build's `.next/static` contains neither key.

### Local storage fallback

`applicationStore.ts` falls back to `.data/applications.jsonl` **only** when
Supabase is unconfigured *and* `NODE_ENV === "development"`. That guard is an
allow-list, not a deny-list: staging, test runners and an unset `NODE_ENV` all
throw `StorageNotConfiguredError` rather than quietly writing applications to a
disk nobody reads. When Supabase *is* configured there is no fallback at all —
a failed insert surfaces the branded error and the applicant is told plainly
that it did not send.

### Cleaning up test data

`scripts/cleanup-test-data.mjs` deletes only an explicit allow-list of test
handles, and re-checks each record actually looks like a test record before
removing it. It refuses to touch anything else.

### Dev server uses webpack, not Turbopack

`npm run dev` passes `--webpack`. Next.js 16 defaults to Turbopack, but its dev
font pipeline fails here:

```
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
[next]/internal/font/google/caveat_*.module.css
```

All five `next/font/google` faces fail to resolve, so the page renders in
fallback fonts and the brand typography disappears. `npm run build` is
unaffected — production uses a different pipeline and compiles all five
correctly — which is why this only ever shows up in dev.

`npm run dev:turbo` keeps the Turbopack path available to re-test after a
Next.js upgrade. If fonts load there, drop `--webpack` from `dev`.

## The tea cup (contact)

`src/components/ContactTeaCup.tsx` — the only contact surface on the page. A
small drawn cup fixed bottom-right, sized to lose every competition with the
hero, the clues and the application CTA. "Tea" is the gossip; WhatsApp is just
where it happens.

**It needs a number to appear.** Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits
only, country code, no `+`). Unset, the component returns `null` — a contact
button that opens a dead chat is worse than no button. This is also the safe
default for a deploy that forgets it.

⚠️ `.env.local` currently holds a **placeholder** (`910000000000`) so the cup is
visible in local development. Replace it before launch.

| | Desktop | Mobile |
| --- | --- | --- |
| Footprint | ~117 × 96 | ~60 × 50 |
| Copy on the cup | NEED / THE TEA? | NEED / THE TEA? |
| Supporting line | revealed on hover **and** focus, as a taped slip | in the slip, on tap |
| Click | opens WhatsApp | first tap opens the slip; its CTA opens WhatsApp |

The cup is drawn in SVG rather than styled with CSS so the silhouette can be
imperfect — an uneven rim, a chipped edge, an outline gone over twice. That is
what keeps it an artifact rather than a widget.

The reveal is driven by React state, not a `group-hover:` variant, so hover and
keyboard focus behave identically. Analytics fires `contact_whatsapp` **only**
on the click that genuinely leaves for WhatsApp — never on opening the slip —
and carries no PII. It is deliberately not mapped to a Meta standard event.

`PlotDebug` was moved from bottom-right to top-right so the two don't stack.
It is development-only either way.

---

## Phase 4B — the casting-room alert

An admin email whenever someone successfully auditions. Nothing else notifies:
`clue_discovered`, `wrong_guess`, `destination_guess_started`, `reward_revealed`,
`page_view` and the WhatsApp click all stay analytics-only.

### The database is the trigger

```
visitor → POST /api/applications → INSERT into applications
                                        ↓  AFTER INSERT trigger (pg_net)
                       POST /api/internal/notifications/application
                                        ↓
                             notifyApplicationSubmitted()
                                        ↓
                                     Resend → admin inbox
```

The browser plays no part in this. `applications_notify_submitted` is an
`AFTER INSERT` row trigger, so it only ever sees rows that actually committed:

* a **duplicate** hits the `(lower(instagram), journey)` unique index, the
  statement rolls back, and the trigger never runs — a 409 emails nobody;
* a validation failure, a rate-limited request or a honeypot hit never reaches
  an INSERT at all;
* there is no client-side code path that can produce a notification.

The webhook body carries **only an application id**. The receiving route re-reads
the record with the service-role key, so applicant data never travels over the
wire, never appears in a URL, and never lands in pg_net's request log.

### Nothing here can fail a submission

The trigger body is wrapped in `exception when others`, and `net.http_post` only
enqueues — pg_net's background worker makes the call after the transaction
commits. On the application side, `notifyApplicationSubmitted()` is documented
and written never to throw: every channel failure becomes a logged
`ChannelResult`. Verified against Resend's live API with a deliberately invalid
key: the provider returned 401, the failure was contained and logged, and the
application stayed in the database with the visitor's 201 unaffected.

### Files

| | |
| --- | --- |
| `src/lib/notifications/types.ts` | the `NotificationChannel` contract and the notifiable-event allow-list |
| `src/lib/notifications/email.ts` | the Resend transport — plain `fetch`, no SDK dependency |
| `src/lib/notifications/applicationEmail.ts` | the branded HTML file and its plain-text fallback |
| `src/lib/notifications/notifyApplication.ts` | the dispatcher — fans out across channels, never throws |
| `src/lib/notifications/deliveries.ts` | the PII-free delivery ledger |
| `src/app/api/internal/notifications/application/route.ts` | the shared-secret webhook receiver (POST only) |

Adding Telegram later is one file plus one entry in `CHANNELS`. The submission
path does not change.

### Security posture

* `RESEND_API_KEY` and `NOTIFICATIONS_WEBHOOK_SECRET` are server-only. Every
  notification module imports `server-only`, so a client import is a build
  error. The production bundle was grepped for both, plus the service-role key
  and `resend.com`: zero hits in `.next/static`.
* The endpoint is POST-only with a constant-time secret comparison. There is no
  GET, so it cannot be used to enumerate applications, and it cannot be called
  by the public to spam the casting inbox.
* `notification_deliveries` gets the same treatment as `applications`: RLS on
  and forced, no policies, nothing granted to `anon` or `authenticated`.
* `private.notification_config` lives in an unexposed schema. The only door is
  `public.set_notification_config()`, which is write-only and granted to
  `service_role` alone.
* The ledger holds no PII — an id, an event, a channel, a status, a provider
  reference. The structured `[plot:notify]` log line holds the same, on purpose:
  it goes to a log drain, which is a far wider audience than the admin inbox.

### Environment variables

| variable | required | notes |
| --- | --- | --- |
| `RESEND_API_KEY` | to send | server-only |
| `ADMIN_NOTIFICATION_EMAIL` | to send | comma-separated for several recipients |
| `NOTIFICATIONS_FROM_EMAIL` | optional | must be a Resend-verified domain; falls back to `onboarding@resend.dev` |
| `NOTIFICATIONS_WEBHOOK_SECRET` | yes | must match `private.notification_config` |
| `NOTIFICATIONS_WEBHOOK_URL` | yes | absolute; where the trigger POSTs |
| `NEXT_PUBLIC_SITE_URL` | already set | builds the `/admin/applications/[id]` link |

With `RESEND_API_KEY` or `ADMIN_NOTIFICATION_EMAIL` unset the channel is skipped
cleanly, logged as `SKIPPED`, and the application still saves normally.

### Setup

```bash
npx supabase db push                  # applies the trigger + ledger migrations
node scripts/setup-notifications.mjs  # writes endpoint + secret into the database
node scripts/verify-notifications.mjs # end-to-end, against the real project
```

⚠️ **Supabase cannot reach `localhost`.** The trigger fires and is recorded
locally, but the HTTP call only arrives once `NOTIFICATIONS_WEBHOOK_URL` points
at a public origin. Re-run `setup-notifications.mjs` after deploying.
