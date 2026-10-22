-- PLOT TWIST — guest registration (confirmed guests, pre-trip).
--
-- Two tables and one function. Nothing here touches `applications`.
--
--   guest_registrations  one row per guest per trip: the details we need to run
--                        the trip, plus the emergency contact.
--   guest_consents       one row per acknowledgement / permission per
--                        registration, each with the policy version and the
--                        exact wording that was shown.
--   submit_guest_registration(jsonb)
--                        the ONLY write path. Inserts the registration and all
--                        its consents in one transaction, so a registration can
--                        never exist without its consent records.
--
-- Apply once (SQL editor, or `supabase db push`). Safe to re-run.
--
-- ---------------------------------------------------------------------------
-- WHAT IS DELIBERATELY NOT HERE
--   - No residential address and no ID number/image: neither is needed to run
--     the trip. Add them only with a documented need and a safeguard plan.
--   - No IP address or user agent. The consent record is: what was agreed, to
--     which version of which wording, when, against which registration.
--   - No typed-name "signature". That needs an approved legal workflow first.
-- ---------------------------------------------------------------------------

create table if not exists guest_registrations (
  id                      uuid primary key default gen_random_uuid(),
  -- Short, unguessable reference shown to the guest (e.g. PT-GOA-7K4M9QXD).
  reference               text        not null,
  trip_id                 text        not null,
  -- Random per page-load, sent by the browser. Makes a retried / double-fired
  -- request return the SAME registration instead of failing or duplicating.
  submission_key          uuid        not null,
  full_name               text        not null,
  date_of_birth           date        not null,
  phone                   text        not null,
  email                   text        not null,
  city                    text        not null,
  emergency_name          text        not null,
  emergency_relationship  text        not null,
  emergency_phone         text        not null,
  -- Optional. Only what is needed to accommodate the guest safely.
  safety_note             text,
  status                  text        not null default 'COMPLETE'
                            check (status in ('COMPLETE', 'CANCELLED')),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  constraint guest_registrations_email_lower check (email = lower(email)),
  constraint guest_registrations_lengths check (
    char_length(full_name) between 2 and 100
    and char_length(city) between 2 and 80
    and char_length(emergency_name) between 2 and 100
    and char_length(emergency_relationship) between 1 and 40
    and char_length(email) <= 254
    and (safety_note is null or char_length(safety_note) <= 500)
  )
);

-- These are named so submit_guest_registration can tell WHICH rule fired.
create unique index if not exists guest_registrations_reference_uidx
  on guest_registrations (reference);
create unique index if not exists guest_registrations_submission_key_uidx
  on guest_registrations (submission_key);
-- One registration per email per trip. The database decides, not a
-- read-then-write in application code, so two simultaneous submits can't both win.
create unique index if not exists guest_registrations_trip_email_uidx
  on guest_registrations (trip_id, email);

create index if not exists guest_registrations_trip_created_idx
  on guest_registrations (trip_id, created_at desc);

create table if not exists guest_consents (
  id               uuid primary key default gen_random_uuid(),
  registration_id  uuid        not null references guest_registrations (id) on delete cascade,
  consent_type     text        not null
                     check (consent_type in
                       ('terms','conduct','privacy','declaration','media_organic','media_paid','marketing')),
  -- Mandatory acknowledgements are only ever stored as true (the function
  -- refuses the registration otherwise); optional permissions store the real
  -- yes/no, so "declined" is a recorded choice, not an absence.
  granted          boolean     not null,
  policy_version   text        not null,
  -- The wording shown at that version. Server copy, never browser-supplied.
  consent_text     text        not null,
  recorded_at      timestamptz not null default now(),
  unique (registration_id, consent_type)
);

create index if not exists guest_consents_registration_idx
  on guest_consents (registration_id);

-- ---------------------------------------------------------------------------
-- PRIVACY
--
-- RLS on, forced, with NO policies; every privilege revoked from the browser
-- roles. The anon key that ships with Supabase clients can therefore neither
-- read, list, count nor insert. Only the server's service-role key (which
-- bypasses RLS and never reaches a browser) can touch these tables, and the
-- admin pages gate that behind requireAdmin() + the ADMIN_EMAILS allowlist.
-- ---------------------------------------------------------------------------
alter table guest_registrations enable row level security;
alter table guest_registrations force row level security;
alter table guest_consents enable row level security;
alter table guest_consents force row level security;

revoke all on guest_registrations from anon, authenticated;
revoke all on guest_consents from anon, authenticated;

-- Supabase grants this by default; stated here so the migration doesn't depend on it.
grant select, insert, update, delete on guest_registrations, guest_consents to service_role;

-- ---------------------------------------------------------------------------
-- THE WRITE PATH
--
-- p = {
--   trip_id, reference, submission_key,
--   full_name, date_of_birth, phone, email, city,
--   emergency_name, emergency_relationship, emergency_phone, safety_note,
--   consents: [ { consent_type, granted, policy_version, consent_text }, ... ]
-- }
--
-- returns { status: 'created' | 'replayed' | 'duplicate', reference }
--   created    new registration saved
--   replayed   same submission_key seen before -> the original reference
--              (a network retry; harmless, and not a duplicate registration)
--   duplicate  a DIFFERENT submission already holds this email for this trip
--
-- Input is validated by the route handler first; the checks here are the
-- backstop for anything that reaches the function some other way.
-- ---------------------------------------------------------------------------
create or replace function submit_guest_registration(p jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id         uuid;
  v_ref        text;
  v_constraint text;
begin
  -- The four mandatory acknowledgements must all be present AND true.
  if (
    select count(*)
    from jsonb_to_recordset(p -> 'consents') as c(consent_type text, granted boolean)
    where c.consent_type in ('terms','conduct','privacy','declaration') and c.granted is true
  ) <> 4 then
    raise exception 'mandatory consents missing' using errcode = '22023';
  end if;

  begin
    insert into guest_registrations (
      reference, trip_id, submission_key, full_name, date_of_birth, phone, email, city,
      emergency_name, emergency_relationship, emergency_phone, safety_note
    ) values (
      p ->> 'reference',
      p ->> 'trip_id',
      (p ->> 'submission_key')::uuid,
      p ->> 'full_name',
      (p ->> 'date_of_birth')::date,
      p ->> 'phone',
      p ->> 'email',
      p ->> 'city',
      p ->> 'emergency_name',
      p ->> 'emergency_relationship',
      p ->> 'emergency_phone',
      nullif(p ->> 'safety_note', '')
    )
    returning id, reference into v_id, v_ref;
  exception when unique_violation then
    get stacked diagnostics v_constraint = constraint_name;

    if v_constraint = 'guest_registrations_submission_key_uidx' then
      select reference into v_ref
      from guest_registrations
      where submission_key = (p ->> 'submission_key')::uuid;
      return jsonb_build_object('status', 'replayed', 'reference', v_ref);
    elsif v_constraint = 'guest_registrations_trip_email_uidx' then
      return jsonb_build_object('status', 'duplicate');
    end if;
    raise; -- e.g. a reference collision: let the caller retry with a new one
  end;

  insert into guest_consents (registration_id, consent_type, granted, policy_version, consent_text)
  select v_id, c.consent_type, c.granted, c.policy_version, c.consent_text
  from jsonb_to_recordset(p -> 'consents')
    as c(consent_type text, granted boolean, policy_version text, consent_text text);

  return jsonb_build_object('status', 'created', 'reference', v_ref);
end;
$$;

-- Functions are executable by PUBLIC by default; close that, then open it for
-- the server's service role only. Without this a browser holding the anon key
-- could call the RPC directly and bypass the route handler's validation.
revoke all on function submit_guest_registration(jsonb) from public, anon, authenticated;
grant execute on function submit_guest_registration(jsonb) to service_role;
