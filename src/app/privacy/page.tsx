import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Privacy — Plot Twist", robots: { index: false, follow: true } };

/**
 * DRAFT. Written so the page architecture exists and something honest is
 * linked from every collection point — not represented anywhere as final,
 * lawyer-reviewed text. Replace before real applications carry real stakes.
 */
export default function PrivacyPage() {
  return (
    <main
      className="min-h-[100svh] px-5 py-14 text-sand sm:px-8 sm:py-20 lg:px-14"
      style={{ background: "radial-gradient(110% 80% at 30% 0%, #3d1030 0%, #1a0817 55%, #120510 100%)" }}
    >
      <div className="mx-auto max-w-[64ch]">
        <Logo className="text-[18px] sm:text-[22px]" />

        <div className="mt-10 inline-block -rotate-2 border-2 border-[#FFD75E] px-3 py-1 text-[10px] tracked text-[#FFD75E]">
          DRAFT — NOT FINAL
        </div>

        <h1 className="mt-4 font-display text-[clamp(2rem,7vw,3.4rem)] uppercase leading-[0.95]">Privacy</h1>
        <p className="mt-3 max-w-[46ch] text-sand/60">
          The short version: we collect only what we need to run the casting, we don't sell it, and
          you can ask us to delete it. The long version is below, and it's a draft — treat it as our
          intent, not a finished legal document.
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.65] text-sand/80">
          <section>
            <h2 className="font-display text-[13px] tracked text-sand">WHAT WE COLLECT</h2>
            <p className="mt-2">
              When you apply: your name, Instagram handle, mobile number, age, city, and your answers
              to the application questions. Nothing else is asked for, and no email is required.
            </p>
            <p className="mt-2">
              Separately, the site records anonymous, non-identifying analytics — which page loads,
              whether you interacted with the mystery, and which campaign link brought you here. This
              never includes your name, handle, phone number, city, age, or answers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">GUEST REGISTRATION (CONFIRMED GUESTS)</h2>
            <p className="mt-2">
              Before a trip, confirmed guests fill in a registration form. It collects your full name, date of birth, mobile number, email,
              city, an emergency contact (their name, relationship to you and phone number), a note about any allergy or accessibility need,
              and a photo or scan of your Aadhaar card to verify your identity. We also record the terms, safety and privacy documents you
              agreed to, which version of each, and when. We don't ask you to type your Aadhaar number, we don't ask for your home address, and
              the form doesn't record your IP address.
            </p>
            <p className="mt-2">
              We use it to run the trip: to verify who is travelling, to contact you, to reach your emergency contact if something happens, to
              plan for your safety, and to keep a record of your agreement. Your registration includes permission for Plot Twist to use photos
              and videos in which you appear on its social media, website and in paid advertising. The registration pages don't load
              analytics or advertising trackers.
            </p>
            <p className="mt-2">
              It is stored in our database under access controls that block public reading and is visible only to authorised Plot Twist team
              members. Your Aadhaar file is kept in a private storage area with no public link; authorised team members open it through
              short-lived secure links. Where a trip operator genuinely needs part of it (for example an allergy, for catering) we share only that part.
            </p>
            <p className="mt-2 rounded-lg border border-dashed border-[#FFD75E]/60 bg-[#FFD75E]/[0.06] px-3 py-2 text-[14px] text-[#FFD75E]">
              <span className="font-semibold tracking-wide">TO BE CONFIRMED BEFORE LAUNCH — </span>
              how long guest registration records are kept after the trip, the legal basis relied on, and the named contact for access,
              correction and deletion requests.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">WHY WE COLLECT IT</h2>
            <p className="mt-2">
              To review your application, contact you about it, and — if you're selected — organise
              the trip. Your Instagram and mobile number are how we reach you; we don't use them for
              anything else.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">WHO SEES IT</h2>
            <p className="mt-2">
              The Plot Twist team reviewing applications. We don't sell, rent, or share your
              application with third parties. It's stored with Supabase, our database provider, under
              access controls that block public reading.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">YOUR CHOICES</h2>
            <p className="mt-2">
              You can ask us to delete your application at any time — message us on Instagram or
              WhatsApp and we'll remove it. Applying doesn't sign you up for anything else; there's no
              mailing list.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[13px] tracked text-sand">CONTACT</h2>
            <p className="mt-2">Questions about this page: reach us the same way you'd reach us for anything else — Instagram or the WhatsApp link on the site.</p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 border-b border-sand/30 pb-1 text-[12px] tracked text-sand/60 hover:text-sand"
        >
          ← back to the plot
        </Link>
      </div>
    </main>
  );
}
