import { brand, footer } from "@/content/site";
import { Logo } from "./Logo";
import { InstagramLink } from "./InstagramLink";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-8 pt-14 text-sand sm:px-8 lg:px-14">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Logo className="text-[26px] sm:text-[40px]" />
          <div className="sm:text-right">
            <p className="font-display text-[clamp(0.95rem,3vw,1.35rem)] tracking-[0.04em]">{footer.tagline}</p>
            <InstagramLink
              href={footer.instagramUrl}
              className="mt-2 inline-block font-hand text-[clamp(1.5rem,5vw,2.2rem)] leading-none text-sunset underline-offset-4 hover:underline"
            >
              {footer.instagram}
            </InstagramLink>
          </div>
        </div>

        <div
          className="mt-10 select-none font-brush leading-[0.82] text-pink"
          style={{ fontSize: "clamp(2.6rem,13vw,10rem)" }}
          aria-hidden
        >
          {footer.signature}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand/15 pt-5 text-[10px] tracked text-sand/45">
          <span>{footer.legal}</span>
          <span>{brand.metaNav.join("  /  ")}</span>
        </div>
      </div>
    </footer>
  );
}
