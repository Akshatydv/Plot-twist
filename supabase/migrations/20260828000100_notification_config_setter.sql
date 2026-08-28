-- PLOT TWIST — Phase 4B, configuring the webhook without committing a secret.
--
-- private.notification_config holds the endpoint and the shared secret. The
-- `private` schema is not exposed over PostgREST, so there is no way to read
-- or write it from an HTTP client — which is the point, but it also means
-- there is no way to set it up from a script.
--
-- This is the one narrow door: a write-only setter, executable by the
-- service role and nothing else. It cannot read the secret back, so it adds
-- no capability the service-role key does not already have.

create or replace function public.set_notification_config(p_endpoint_url text, p_shared_secret text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  insert into private.notification_config (id, endpoint_url, shared_secret, updated_at)
  values (1, p_endpoint_url, p_shared_secret, now())
  on conflict (id) do update
    set endpoint_url  = excluded.endpoint_url,
        shared_secret = excluded.shared_secret,
        updated_at    = now();
end;
$$;

-- Service role only. It bypasses RLS and has the postgres-adjacent grants
-- already; anon and authenticated must never reach this.
revoke all on function public.set_notification_config(text, text) from public, anon, authenticated;
grant execute on function public.set_notification_config(text, text) to service_role;

-- Read-back of *status only* — never the secret. Lets the verification
-- script confirm the webhook is wired up without exposing the credential.
create or replace function public.notification_config_status()
returns table (endpoint_url text, secret_set boolean, updated_at timestamptz)
language sql
security definer
set search_path = public, private
as $$
  select c.endpoint_url, c.shared_secret is not null, c.updated_at
  from private.notification_config c
  where c.id = 1;
$$;

revoke all on function public.notification_config_status() from public, anon, authenticated;
grant execute on function public.notification_config_status() to service_role;
