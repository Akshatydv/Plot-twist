import { pricing } from "@/content/site";
import { Stamp } from "./Bits";

/**
 * THE DAMAGE — the price slot.
 *
 * Renders nothing while `pricing.revealed` is false. A "FROM ₹XX,XXX"
 * placeholder shown to a real visitor reads as a broken page, not as
 * mystery — so until a real number exists, this is the architecture with no
 * output. Flip `pricing.revealed` and fill in `amount`/`note` in site.ts when
 * pricing is final; nothing else changes.
 */
export function PricePreview() {
  if (!pricing.revealed || !pricing.amount) return null;

  return (
    <Stamp color="#36C96F" rotate={-2}>
      {pricing.eyebrow} · {pricing.amount}
      {pricing.note ? ` · ${pricing.note}` : ""}
    </Stamp>
  );
}
