import Link from "next/link";
import { useCallback } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

import BrandMark from "@/components/BrandMark";

const activeLinkClass =
  "group relative inline-flex origin-center items-center justify-center text-sm font-medium tracking-[0.18em] text-white uppercase transition duration-300 ease-out hover:scale-[1.02]";

const disabledLinkClass =
  "group relative inline-flex cursor-not-allowed items-center justify-center text-xs font-medium uppercase tracking-[0.16em] text-neutral-500/80 transition";

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="px-6  pb-14 pt-16 text-white sm:px-8">
      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="group relative flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:opacity-100">
            <BiUpArrowAlt size={26} className="text-white" />
          </span>
          <BrandMark size={84} className="rounded-full object-cover" />
        </button>

        <p className="mt-5 text-2xl font-semibold tracking-[0.42em] text-white">
          GLITTER
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.34em] text-neutral-400">
          Where You Shine Online
        </p>

        <div className="mt-10">
          <Link href="/grok" className={activeLinkClass}>
            Brok
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-3 text-neutral-500">
          <span className={disabledLinkClass}>
            Terms of Service
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-neutral-500/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <span className="px-3 text-neutral-700">|</span>
          <span className={disabledLinkClass}>
            Privacy Policy
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-neutral-500/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <span className="px-3 text-neutral-700">|</span>
          <span className={disabledLinkClass}>
            Developers
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-neutral-500/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <span className="px-3 text-neutral-700">|</span>
          <span className={disabledLinkClass}>
            About
            <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-neutral-500/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.22em] text-neutral-600">
          &copy; 2026 Glitter Co
        </p>
      </div>
    </footer>
  );
};

export default Footer;
