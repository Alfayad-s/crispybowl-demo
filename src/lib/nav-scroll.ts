import type { HomeNavSectionId } from "@/hooks/use-home-scroll-spy";

export function hrefToHomeNavSection(href: string): HomeNavSectionId | null {
  if (href === "/") return "home";
  if (href === "/#about") return "about";
  if (href === "/#menu") return "menu";
  if (href === "/#gallery") return "gallery";
  return null;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Same-page: smooth scroll + sync hash. Other routes: no-op (Link navigates). */
export function scrollToHomeNavTarget(href: string, pathname: string): boolean {
  if (pathname !== "/") return false;

  if (href === "/") {
    if (window.scrollY === 0 && !window.location.hash) return false;
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    history.replaceState(null, "", "/");
    return true;
  }

  if (!href.startsWith("/#")) return false;
  const id = href.slice(2);
  const el = document.getElementById(id);
  if (!el) return false;

  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  el.scrollIntoView({ behavior, block: "start" });
  history.replaceState(null, "", `/#${id}`);
  return true;
}

export function isNavLinkActive(
  href: string,
  pathname: string,
  activeSection: HomeNavSectionId,
): boolean {
  if (pathname !== "/") return false;
  const section = hrefToHomeNavSection(href);
  return section !== null && section === activeSection;
}
