-- PLOT TWIST — applications table.
--
-- Run this once against the Supabase project (SQL editor, or `supabase db
-- push`), then set the env vars in .env.example. The record shape matches
-- exactly what src/lib/applicationStore.ts inserts.

create table if not exists applications (
  id                uuid primary key default gen_random_uuid(),
  name              text        not null,
  instagram         text        not null,
  mobile            text        not null,
  age               smallint    not null check (age between 18 and 30),
  city              text        not null,
  answer_1          text        not null,
  answer_2          text        not null,
  answer_3          text        not null,
  journey           text        not null default 'JOURNEY 01',
  clue_progress     smallint    not null default 0,
  destination_guess text,
  -- Which Plot Twist reward they were assigned on solving. Null if they
  -- applied without ever solving the destination.
  reward_id         text,
  -- Anonymous acquisition attribution (first touch). Campaign labels only —
  -- no IP, no user agent, nothing that identifies a person.
  source            text,
  medium            text,
  campaign          text,
  content           text,
  submitted_at      timestamptz not null default now(),
  status            text        not null default 'PENDING'
                      check (status in ('PENDING','SHORTLISTED','SELECTED','REJECTED')),
  -- Manual-casting scratchpad. Server-only: never returned by the public API,
  -- never sent to analytics, only ever read/written from an authenticated
  -- admin Server Action.
  notes             text
);

-- Safe to re-run: adds `notes` for anyone who already created the table
-- before this column existed.
alter table applications add column if not exists notes text;
alter table applications add column if not exists reward_id text;
alter table applications add column if not exists source text;
alter table applications add column if not exists medium text;
alter table applications add column if not exists campaign text;
alter table applications add column if not exists content text;

-- The admin list defaults to "newest first" with no status filter applied —
-- that query needs submitted_at on its own, not just as the second column
-- of the status index below.
create index if not exists applications_submitted_at_idx
  on applications (submitted_at desc);

-- "Which Reel produced the most applicants?" — the whole point of Phase 4A.
create index if not exists applications_campaign_idx
  on applications (campaign, content);

-- Reviewing one stage of the pipeline, newest first within it.
create index if not exists applications_status_submitted_idx
  on applications (status, submitted_at desc);

-- One application per handle per journey. Handles are already normalised to
-- lowercase "@handle" before insert; lower() here is belt and braces.
-- This is what makes the duplicate check race-free — the database decides,
-- not a read-then-write in application code.
create unique index if not exists applications_instagram_journey_idx
  on applications (lower(instagram), journey);

-- ---------------------------------------------------------------------------
-- PRIVACY
--
-- Applicant records must never be readable from a browser. RLS is enabled
-- with NO policies, so the anon and authenticated roles can do nothing at
-- all. Both the public submit route and the admin pages use the service-role
-- key server-side, which bypasses RLS — the only gate on the admin side is
-- the application-level auth check in src/lib/admin.ts, run on every request.
--
-- Do not add a permissive policy here without a very good reason: these rows
-- hold names, phone numbers and personal answers.
-- ---------------------------------------------------------------------------
alter table applications enable row level security;
alter table applications force row level security;

revoke all on applications from anon, authenticated;
