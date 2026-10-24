-- PLOT TWIST — reviews, phase 1: personal review links + team replies.
--
--   registration_id  set when a review arrives through a guest's personal
--                    review link (/review/<token>). It is what makes a review
--                    "verified", and the unique index allows ONE review per
--                    registered guest. Deleting the registration keeps the
--                    review but drops the link.
--   reply            a short public reply from the team ("Plot Twist replied").
--
-- Safe to re-run.

alter table reviews add column if not exists registration_id uuid
  references guest_registrations (id) on delete set null;

create unique index if not exists reviews_registration_uidx
  on reviews (registration_id) where registration_id is not null;

alter table reviews add column if not exists reply text;
alter table reviews add column if not exists replied_at timestamptz;

alter table reviews drop constraint if exists reviews_reply_length;
alter table reviews add constraint reviews_reply_length
  check (reply is null or char_length(reply) between 1 and 600);
