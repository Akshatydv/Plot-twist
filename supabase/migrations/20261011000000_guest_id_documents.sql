-- PLOT TWIST — guest registration, round 2: mandatory ID document + two clubbed
-- declarations (every consent mandatory).
--
--   * guest_registrations.id_document_path : where the uploaded Aadhaar lives in
--     the PRIVATE `guest-ids` Storage bucket (a path, never a public URL).
--   * submit_guest_registration now requires the ID path and all six consent
--     records to be granted. Optional "marketing" is no longer collected (the
--     check constraint still allows the value, so old data stays valid).
--
-- Safe to re-run.

alter table guest_registrations add column if not exists id_document_path text;

-- PRIVATE bucket. public = false, so there is no public URL for any object.
-- storage.objects has RLS on and this migration adds NO policies for it, so
-- anon/authenticated can neither list, read nor write. Only the server's
-- service-role key can; admins get a 60-second signed URL after requireAdmin().
-- The MIME allow-list and size cap are enforced by Storage as well as by the
-- route handler (which also checks the file's real bytes).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guest-ids', 'guest-ids', false, 5242880, array['image/jpeg', 'image/png', 'application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

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
  -- All six consent records must be present AND true.
  if (
    select count(*)
    from jsonb_to_recordset(p -> 'consents') as c(consent_type text, granted boolean)
    where c.consent_type in ('terms','conduct','declaration','privacy','media_organic','media_paid')
      and c.granted is true
  ) <> 6 then
    raise exception 'mandatory consents missing' using errcode = '22023';
  end if;

  if coalesce(p ->> 'id_document_path', '') = '' then
    raise exception 'id document missing' using errcode = '22023';
  end if;

  begin
    insert into guest_registrations (
      reference, trip_id, submission_key, full_name, date_of_birth, phone, email, city,
      emergency_name, emergency_relationship, emergency_phone, safety_note, id_document_path
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
      nullif(p ->> 'safety_note', ''),
      p ->> 'id_document_path'
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
    raise;
  end;

  insert into guest_consents (registration_id, consent_type, granted, policy_version, consent_text)
  select v_id, c.consent_type, c.granted, c.policy_version, c.consent_text
  from jsonb_to_recordset(p -> 'consents')
    as c(consent_type text, granted boolean, policy_version text, consent_text text);

  return jsonb_build_object('status', 'created', 'reference', v_ref);
end;
$$;

revoke all on function submit_guest_registration(jsonb) from public, anon, authenticated;
grant execute on function submit_guest_registration(jsonb) to service_role;
