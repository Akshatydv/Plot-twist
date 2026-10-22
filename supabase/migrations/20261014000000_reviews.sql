-- PLOT TWIST — traveller reviews.
--
-- Anyone from a trip can submit a review (name, rating, words, up to 4 photos).
-- NOTHING is public until a team member approves it in /admin/reviews.
--
--   reviews                 one row per submitted review
--   storage: review-photos  PUBLIC bucket holding the re-encoded photos
--
-- Safe to re-run.

create table if not exists reviews (
  id             uuid primary key default gen_random_uuid(),
  trip_id        text        not null,
  author_name    text        not null,
  city           text,
  rating         smallint    not null check (rating between 1 and 5),
  body           text        not null,
  -- Object paths inside the review-photos bucket (never full URLs).
  photos         text[]      not null default '{}',
  -- True when the submitter supplied a valid guest-registration reference for
  -- this trip. The reference itself is NOT stored.
  verified       boolean     not null default false,
  status         text        not null default 'PENDING'
                   check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  -- Pinned to the top of the wall and used first on the landing page.
  featured       boolean     not null default false,
  -- The submitter ticked "you may publish this". Required to exist at all.
  publish_consent boolean    not null check (publish_consent is true),
  created_at     timestamptz not null default now(),
  approved_at    timestamptz,

  constraint reviews_lengths check (
    char_length(author_name) between 2 and 60
    and (city is null or char_length(city) <= 60)
    and char_length(body) between 20 and 1200
    and cardinality(photos) <= 4
  )
);

create index if not exists reviews_public_idx
  on reviews (status, featured desc, created_at desc);

-- ---------------------------------------------------------------------------
-- PRIVACY
--
-- Same model as guest_registrations: RLS on + forced, no policies, nothing
-- granted to the browser roles. The public site reads APPROVED rows on the
-- server with the service-role key and selects only display columns; the
-- browser never talks to this table.
-- ---------------------------------------------------------------------------
alter table reviews enable row level security;
alter table reviews force row level security;
revoke all on reviews from anon, authenticated;
grant select, insert, update, delete on reviews to service_role;

-- PUBLIC bucket: approved photos have to be viewable by everyone, and object
-- keys are random UUIDs, so an unapproved photo's URL is unguessable. The route
-- handler re-encodes every upload to WebP (which also strips EXIF/GPS), so the
-- bucket only ever contains image/webp. Uploads happen server-side only: there
-- are no storage policies, so anon/authenticated cannot write or list.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-photos', 'review-photos', true, 5242880, array['image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
