-- Renumber journeys: what the applications table stores as `journey`.
--
--   JOURNEY 00  ->  JOURNEY 1   (Goa)
--   JOURNEY 03  ->  JOURNEY 2   (Bir x Barot)
--   JOURNEY 02  ->  JOURNEY 3   (Thailand / EDC)
--   JOURNEY 01  ->  BALI        (retired)
--
-- WHY THIS EXISTS
-- The site now numbers its journeys 1, 2 and 3 everywhere — on the pages, in the
-- URLs (/journey/1 ...) and in the ids the app writes. Rows written before the
-- change still carry the old ids. The app keeps working either way (it resolves
-- old ids to the right journey, and the admin filter matches both), so this is
-- housekeeping, not an emergency: after it runs, one journey has one id.
--
-- RUN IT AT DEPLOY TIME, not weeks later. Between the deploy and this migration
-- the same person could apply to the same journey once under the old id and once
-- under the new one, because the unique index is on (lower(instagram), journey)
-- and the two ids differ. The check below finds exactly that.
--
-- IT REFUSES TO RUN IF THAT HAS HAPPENED. Merging two applications is a human
-- decision (which one is the real one?) and deleting a person's application in a
-- migration is not something to do quietly. The exception lists how many pairs
-- clash; find them with the query in the message, resolve them in the admin, and
-- run this again.

do $$
declare
  clashes int;
begin
  select count(*) into clashes
  from applications a
  join applications b
    on lower(a.instagram) = lower(b.instagram)
   and a.id <> b.id
   and (case a.journey when 'JOURNEY 00' then 'JOURNEY 1' when 'JOURNEY 03' then 'JOURNEY 2'
                       when 'JOURNEY 02' then 'JOURNEY 3' when 'JOURNEY 01' then 'BALI' else a.journey end)
     = (case b.journey when 'JOURNEY 00' then 'JOURNEY 1' when 'JOURNEY 03' then 'JOURNEY 2'
                       when 'JOURNEY 02' then 'JOURNEY 3' when 'JOURNEY 01' then 'BALI' else b.journey end);

  if clashes > 0 then
    raise exception
      'Cannot renumber journeys: % application row(s) would collide with another from the same Instagram handle. '
      'Find them with: select lower(instagram), array_agg(journey) from applications group by 1 having count(*) > 1; '
      'resolve each pair in the admin, then re-run.', clashes;
  end if;
end $$;

-- One statement, so it is atomic and no id is ever half-renamed. The new ids
-- share no value with the old ones, so no row is touched twice.
update applications
set journey = case journey
  when 'JOURNEY 00' then 'JOURNEY 1'
  when 'JOURNEY 03' then 'JOURNEY 2'
  when 'JOURNEY 02' then 'JOURNEY 3'
  when 'JOURNEY 01' then 'BALI'
end
where journey in ('JOURNEY 00', 'JOURNEY 03', 'JOURNEY 02', 'JOURNEY 01');

-- The column's own default (used only if an insert omits journey; the app always
-- sends one). It was JOURNEY 01, which is now Bali.
alter table applications alter column journey set default 'JOURNEY 1';
