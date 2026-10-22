# Guest registration — Journey 00 · Goa (`/guest/goa-2026`)

One page, one Submit button: details, emergency contact, allergies/accessibility, Aadhaar upload, two tick boxes. Everything is required. No steps, no review screen. Confirmation appears only after the server saves.

## Where things are

| What | Where |
|---|---|
| Page (server) | `src/app/guest/goa-2026/page.tsx` |
| Form + confirmation (client) | `src/components/guest/GuestRegistrationFlow.tsx` |
| Trip terms (DRAFT) / Code of conduct (DRAFT) | `src/app/guest/goa-2026/terms`, `.../safety` |
| Shared rules, consent wording + versions, ID rules | `src/lib/guestRegistration.ts` |
| API (write-only, multipart) | `src/app/api/guest-registrations/route.ts` |
| Storage adapter (DB + private bucket) | `src/lib/guestRegistrationStore.ts` |
| Admin list, CSV, ID viewer | `src/app/admin/guests`, `.../[id]/id`, `src/lib/adminGuests.ts` |
| Migrations | `supabase/migrations/20261010000000_guest_registrations.sql`, `20261011000000_guest_id_documents.sql` |

Migrations are additive and safe to re-run: `npx supabase db push`. No new environment variables.

## The two declarations

Each is one tick that the server expands into per-item consent records, each storing the **full wording of the box ticked** and its own version:

- `agreement` → `terms`, `conduct`, `declaration`
- `privacy_media` → `privacy`, `media_organic`, `media_paid`

Change wording or a linked document → edit `CONSENT_GROUPS` / bump `CONSENT_VERSIONS` in `src/lib/guestRegistration.ts`.

## Aadhaar upload

JPG / PNG / PDF, ≤ 5 MB. The server checks the file's real bytes (not its name or MIME type), uploads to the **private** `guest-ids` bucket at `goa-2026/<submission-key>.<ext>`, and stores only that path. There is no public URL; the bucket has no storage policies, so only the service-role key can touch it. Admins open a file via `/admin/guests/<id>/id` → `requireAdmin()` → 60-second signed URL. A rejected or duplicate registration deletes the file it just uploaded.

## Open items before launch

1. Terms, conduct and privacy are DRAFTS — complete every "TO BE CONFIRMED", get them legally reviewed, remove the draft banners, bump versions.
2. **Legal review of the two risky decisions**: (a) mandatory photo/video + paid-ads permission as a condition of joining; (b) collecting Aadhaar images (UIDAI rules on private entities collecting Aadhaar; consider asking for a masked Aadhaar, first 8 digits hidden, which still shows name, DOB and photo).
3. Set the retention period for registrations and ID files (and how they are deleted), plus the privacy contact.
4. Name the on-trip emergency lead on the safety page.
5. Sign in to `/admin/guests` with an allow-listed email; check the list, search, ID "View" link and CSV with a real test registration, then delete it (and its file from the `guest-ids` bucket).
