import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";

/**
 * Deliberately plain — this is internal tooling, not the Plot Twist brand.
 * No brush strokes, no handwritten annotations. It just needs to be usable
 * on a laptop by someone reviewing applicants.
 */
export function AdminHeader({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand/15 pb-5">
      <div>
        {backHref && (
          <Link href={backHref} className="text-xs text-sand/50 hover:text-sand">
            ← back
          </Link>
        )}
        <h1 className="mt-1 text-xl font-semibold text-sand">{title}</h1>
      </div>
      <form action={signOutAction}>
        <button type="submit" className="border border-sand/25 px-3 py-1.5 text-xs text-sand/70 hover:border-sand/50 hover:text-sand">
          Sign out
        </button>
      </form>
    </header>
  );
}
