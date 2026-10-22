import type { Metadata } from "next";
import { DocSection, GuestDoc, Pending } from "@/components/guest/GuestDoc";
import { CONSENT_VERSIONS } from "@/lib/guestRegistration";

export const metadata: Metadata = {
  title: "Guest Code of Conduct & Safety — Goa | Plot Twist",
  robots: { index: false, follow: false },
};

/**
 * GUEST CODE OF CONDUCT & SAFETY — Goa.
 *
 * Written from the brief's list; these are behavioural expectations rather
 * than contract terms, so they are drafted in full. They still have not been
 * reviewed by the business owner or a lawyer, hence the draft banner. Two
 * operational items (who to call, what happens after a breach) need real
 * names and decisions — see <Pending/>. Bump CONSENT_VERSIONS.conduct when
 * the text changes.
 */
export default function GoaSafetyPage() {
  return (
    <GuestDoc
      title="Guest Code of Conduct & Safety"
      version={CONSENT_VERSIONS.conduct}
      intro="The short version: look after each other, look after yourself, and listen to the people running the day. These apply from the moment the trip starts until it ends."
    >
      <DocSection n="1" title="Respect people’s boundaries">
        <p>
          Everyone on this trip is here to have a good time on their own terms. Respect personal space, and take “no”, silence or hesitation as a no.
          Consent has to be clear, enthusiastic and can be withdrawn at any time. Being drunk is never a reason to ignore it.
        </p>
      </DocSection>

      <DocSection n="2" title="Photography and filming">
        <p>
          Ask before you photograph or film someone, and delete it if they ask you to. Don’t post pictures of other guests that they haven’t
          agreed to. Plot Twist’s own use of photos and video is covered by the permission given on the registration form. If you’d like a particular photo or video taken down, tell a host or message us and we’ll act on it.
        </p>
      </DocSection>

      <DocSection n="3" title="Alcohol and personal safety">
        <p>
          Drink at your own pace and know your limits; nobody should ever feel pressured to drink. Keep an eye on your drink and on your friends, never
          leave a guest who is unwell or very drunk on their own, and tell a host if you’re worried about someone. Don’t drive or ride a vehicle after
          drinking, and don’t swim or take part in water activities while intoxicated.
        </p>
      </DocSection>

      <DocSection n="4" title="Follow the people running it">
        <p>
          Follow the instructions of Plot Twist hosts, boat and yacht crew, drivers and activity providers. They make safety calls — about weather,
          capacity, timing and who can take part — and those calls are final on the day.
        </p>
      </DocSection>

      <DocSection n="5" title="Safety equipment and activity rules">
        <p>
          Wear life jackets, helmets, seatbelts and any other equipment you’re given, and follow each activity’s own briefing and rules. If you
          don’t understand something, or you’re not comfortable, say so before it starts. You can always opt out.
        </p>
      </DocSection>

      <DocSection n="6" title="Local laws, property and the environment">
        <p>
          Follow the laws of India and Goa, including rules on alcohol, drugs, noise and beaches. Illegal drugs are not part of this trip. Treat
          properties, venues and vehicles with care — you may be responsible for damage you cause — and leave beaches, waterfalls and forts as you found
          them. No littering, and no taking anything from nature.
        </p>
      </DocSection>

      <DocSection n="7" title="Tell a host when you leave the group">
        <p>
          If you’re leaving the group, changing plans or going somewhere on your own, tell a host first, and check in when you’re back. We’d
          rather know where everyone is than go looking.
        </p>
      </DocSection>

      <DocSection n="8" title="Report problems straight away">
        <p>
          Tell a host promptly about unsafe behaviour, injury, illness or any emergency, including something that happened to someone else. For a
          life-threatening emergency, call local emergency services first (112 in India), then a host.
        </p>
        <Pending>The name and phone number of the on-trip lead guests should call, and the process for handling a report.</Pending>
      </DocSection>

      <DocSection n="9" title="Behaviour we won’t accept">
        <p>
          Harassment, coercion, discrimination, intimidation, threats and violence have no place here, whether in person or online. This includes unwanted
          sexual attention, comments about someone’s body, identity, religion, caste, gender or sexuality, and pressuring anyone to drink or join in.
        </p>
      </DocSection>

      <DocSection n="10" title="If the code isn’t followed">
        <p>
          Hosts may ask a guest to stop a behaviour, sit out an activity, or leave the trip if their behaviour puts someone at risk or breaches this
          code.
        </p>
        <Pending>What happens to travel arrangements and refunds if a guest is asked to leave, to be set out in the Trip Terms.</Pending>
      </DocSection>

      <p className="text-sand/60">
        Agreeing to this code is a commitment about how you’ll behave. It doesn’t remove Plot Twist’s own responsibility to plan the trip with
        reasonable care and to respond properly when something goes wrong.
      </p>
    </GuestDoc>
  );
}
