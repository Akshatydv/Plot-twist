import { permanentRedirect } from "next/navigation";

/**
 * /thailand was the preview of the rebuilt Thailand × EDC page. The rebuild is
 * now live at /journey/3, so this route permanently redirects there - one URL
 * per trip, and any link shared during the preview still lands.
 */
export default function Page() {
  permanentRedirect("/journey/3");
}
