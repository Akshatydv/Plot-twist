-- PLOT TWIST — Phase 4B, the casting-room alert.
--
-- The database is the trigger. An admin email is only ever produced by a row
-- that actually committed to `applications`, which means:
--
--   * a duplicate (unique violation on (lower(instagram), journey)) rolls the
--     statement back, the trigger never runs, and no email is sent;
--   * a validation failure, a rate-limited request or a honeypot hit never
--     reaches an INSERT at all;
--   * the browser has no way to cause a notification.
--
-- Nothing here can fail a submission. The whole dispatch body is wrapped in
-- an exception handler, and net.http_post only enqueues — pg_net's background
-- worker does the actual HTTP call after the transaction commits.

create extension if not exists pg_net with schema extensions;

-- ---------------------------------------------------------------------------
-- CONFIG — endpoint + shared secret.
--
-- Lives in its own schema, which is not exposed over PostgREST, so these
-- values are unreachable from anon, authenticated, or any HTTP client. The
-- row is inserted separately (see README, Phase 4B) so the secret is never
-- committed to the repository.
-- ---------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from anon, authenticated;

create table if not exists private.notification_config (
  id            smallint primary key default 1 check (id = 1),
  endpoint_url  text,
  shared_secret text,
  updated_at    timestamptz not null default now()
);

revoke all on private.notification_config from anon, authenticated;

-- ---------------------------------------------------------------------------
-- LEDGER — one row per (application, event).
--
-- Deliberately PII-free: an id, an event, a channel, a status and a provider
-- reference. The unique key is what makes a retried webhook idempotent.
-- ---------------------------------------------------------------------------
create table if not exists public.notification_deliveries (
  application_id uuid        not null references public.applications (id) on delete cascade,
  event          text        not null,
  channel        text        not null default 'email',
  status         text        not null default 'REQUESTED'
                   check (status in ('REQUESTED','SENT','FAILED','SKIPPED')),
  -- Provider-side message id, when the provider returns one.
  reference      text,
  -- Provider/config error text only. Never applicant data.
  detail         text,
  -- pg_net request id, for correlating against net._http_response.
  request_id     bigint,
  requested_at   timestamptz not null default now(),
  completed_at   timestamptz,
  primary key (application_id, event)
);

create index if not exists notification_deliveries_status_idx
  on public.notification_deliveries (status, requested_at desc);

-- Same posture as `applications`: RLS on, zero policies, nothing granted.
-- Only the service-role key (which bypasses RLS) can touch it, server-side.
alter table public.notification_deliveries enable row level security;
alter table public.notification_deliveries force row level security;
revoke all on public.notification_deliveries from anon, authenticated;

-- ---------------------------------------------------------------------------
-- THE TRIGGER
-- ---------------------------------------------------------------------------
create or replace function public.notify_application_submitted()
returns trigger
language plpgsql
security definer
set search_path = public, private, extensions
as $$
declare
  cfg private.notification_config%rowtype;
  req bigint;
begin
  begin
    select * into cfg from private.notification_config where id = 1;

    -- Not configured yet: the application is still stored, silently and
    -- successfully. Notification is secondary to persistence, always.
    if cfg.endpoint_url is null or cfg.shared_secret is null then
      return new;
    end if;

    insert into public.notification_deliveries (application_id, event, channel, status)
    values (new.id, 'application_submitted', 'email', 'REQUESTED')
    on conflict (application_id, event) do nothing;

    -- Only the id crosses the wire. The receiving route re-reads the record
    -- with the service-role key, so no applicant data is in this payload,
    -- in the URL, or in pg_net's request log.
    select net.http_post(
      url     := cfg.endpoint_url,
      headers := jsonb_build_object(
                   'Content-Type', 'application/json',
                   'x-plot-notification-secret', cfg.shared_secret
                 ),
      body    := jsonb_build_object(
                   'event', 'application_submitted',
                   'application_id', new.id::text
                 ),
      timeout_milliseconds := 8000
    ) into req;

    update public.notification_deliveries
       set request_id = req
     where application_id = new.id
       and event = 'application_submitted';

  exception when others then
    -- Log and carry on. An unreachable queue, a missing table or a revoked
    -- grant must never roll back somebody's application.
    raise warning '[plot] application notification dispatch failed: %', sqlerrm;
  end;

  return new;
end;
$$;

revoke all on function public.notify_application_submitted() from anon, authenticated;

drop trigger if exists applications_notify_submitted on public.applications;

create trigger applications_notify_submitted
  after insert on public.applications
  for each row
  execute function public.notify_application_submitted();
