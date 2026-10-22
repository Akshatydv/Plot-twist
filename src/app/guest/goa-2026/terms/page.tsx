import type { Metadata } from "next";
import { DocSection, GuestDoc, Pending } from "@/components/guest/GuestDoc";
import { CONSENT_VERSIONS } from "@/lib/guestRegistration";
import { octoberInclusions as inclusions, octoberPrice as price } from "@/content/goa";

export const metadata: Metadata = {
  title: "Trip Terms & Conditions — Goa | Plot Twist",
  robots: { index: false, follow: false },
};

/**
 * TRIP TERMS — Goa. A STRUCTURED DRAFT.
 *
 * Every heading the brief asks for is here, and anything the website already
 * states as fact (price floor, inclusions, exclusions) is read from
 * content/goa.ts so this page can never contradict the trip page.
 *
 * Everything else — cancellation, refunds, liability, indemnity, jurisdiction
 * — is a <Pending/> block, NOT invented text. Contract terms are a business
 * decision and a lawyer's job; writing plausible-sounding ones would be worse
 * than an honest gap. Replace each <Pending/> with approved wording, then bump
 * CONSENT_VERSIONS.terms in lib/guestRegistration.ts so new registrations
 * record that they agreed to the final text.
 */
export default function GoaTripTermsPage() {
  return (
    <GuestDoc
      title="Trip Terms & Conditions"
      version={CONSENT_VERSIONS.terms}
      intro="What you’re agreeing to when you join the Goa trip. This is a working draft: sections marked “to be confirmed” are decisions we haven’t published yet and will be completed before the trip."
    >
      <DocSection n="1" title="Booking, payment and cancellation">
        <p>
          The trip is priced {price.confirmed ? price.amount.toLowerCase() : "per person"}. {price.note}
        </p>
        <p>The group is a maximum of twenty guests and Plot Twist’s hosts travel with it.</p>
        <Pending>Payment schedule, what the booking amount covers, and the cancellation and transfer rules (who can cancel, by when, and what is kept).</Pending>
      </DocSection>

      <DocSection n="2" title="What’s included — and what isn’t">
        <p className="text-sand">Included</p>
        <ul className="list-disc space-y-1 pl-5">
          {inclusions.included.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <p className="pt-2 text-sand">Not included</p>
        <ul className="list-disc space-y-1 pl-5">
          {inclusions.excluded.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <p>Where an activity is listed as an optional add-on, it is booked and paid for separately and may carry its own operator terms.</p>
      </DocSection>

      <DocSection n="3" title="Itinerary changes, weather and contingencies">
        <p>
          Goa in October can mean heat, rain and changing sea conditions. Activities, timings, venues and properties may change for weather, safety,
          local regulation, venue or operator availability, or other circumstances outside our control.
        </p>
        <Pending>The commitment on comparable substitutes, and what happens (refund, credit or neither) if an activity or the whole trip can’t run.</Pending>
      </DocSection>

      <DocSection n="4" title="Guest responsibilities and local law">
        <p>
          You’re responsible for carrying valid ID, for your own travel to and from Goa, for any medication you need, and for following the laws of
          India and the state of Goa. You agree to follow the Plot Twist Guest Code of Conduct and safety guidelines, which are part of these terms.
        </p>
      </DocSection>

      <DocSection n="5" title="Third-party operators, transport and activities">
        <p>
          Some parts of the trip — for example boats and yachts, drivers, venues, clubs and waterfall or beach activities — are run by independent
          local operators. Their own safety briefings, age and capacity limits, weather calls and conditions apply, and their staff’s instructions
          must be followed.
        </p>
        <Pending>How responsibility between Plot Twist and each operator is described to guests, and any operator waivers guests will be asked to sign on the day.</Pending>
      </DocSection>

      <DocSection n="6" title="Safety and participation">
        <p>
          Taking part in any activity is your choice, and you may sit one out. Tell a host if you’re unwell, hurt, or unsure. Hosts and operators may
          ask you to stop an activity or leave the group for safety reasons. See the Guest Code of Conduct and safety guidelines for the full list.
        </p>
      </DocSection>

      <DocSection n="7" title="Risk disclosure">
        <p>
          Group travel with water, road transport, late nights and alcohol involves real risks, including injury, illness, loss or damage to
          belongings, and accidents. You should consider travel insurance; it is not included.
        </p>
        <Pending>The final risk-disclosure wording for this itinerary, reviewed against the activities actually booked.</Pending>
      </DocSection>

      <DocSection n="8" title="Complaints and incident reporting">
        <p>
          Raise anything that’s wrong with a host straight away so it can be fixed on the trip. After the trip, contact us on Instagram or the
          WhatsApp link on the website.
        </p>
        <Pending>A named contact and response time for formal complaints and incident reports.</Pending>
      </DocSection>

      <DocSection n="9" title="Refunds">
        <Pending>Refund policy, including timing and method.</Pending>
      </DocSection>

      <DocSection n="10" title="Limitation of liability and indemnity">
        <Pending>
          Limitation-of-liability and indemnity clauses. These need to be drafted by a lawyer for Indian law (including consumer-protection limits on
          what can be excluded). Plot Twist is not asking guests to give up rights that the law doesn’t allow to be waived, and agreeing to these
          terms does not remove Plot Twist’s own duties to take reasonable care of guests.
        </Pending>
      </DocSection>

      <DocSection n="11" title="Governing law and disputes">
        <Pending>Governing law, jurisdiction and dispute process.</Pending>
      </DocSection>

      <DocSection n="12" title="Your information and media">
        <p>
          How we handle your personal information, including the Aadhaar document you upload, is explained in the privacy notice. By registering you also agree that Plot Twist may use photos and videos in which you appear on its social media and website and in paid advertising.
        </p>
      </DocSection>
    </GuestDoc>
  );
}
