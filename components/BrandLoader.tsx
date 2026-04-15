import BrandMark from "@/components/BrandMark";

interface BrandLoaderProps {
  compact?: boolean;
  overlay?: boolean;
}

const BrandLoader = ({ compact = false, overlay = false }: BrandLoaderProps) => {
  return (
    <div
      className={[
        "flex w-full flex-col items-center justify-center text-center text-white",
        compact ? "gap-4 py-12" : "gap-5 py-16",
        overlay ? "fixed inset-0 z-50 bg-neutral-950/88 backdrop-blur-sm" : "h-full min-h-[320px]",
      ].join(" ")}
    >
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/20 blur-md" />
        <div className="relative animate-[float_1.8s_ease-in-out_infinite]">
          <BrandMark
            size={compact ? 70 : 94}
            className="rounded-full object-cover drop-shadow-[0_0_30px_rgba(125,211,252,0.18)]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xl font-semibold tracking-[0.34em] text-white sm:text-2xl">
          GLITTER
        </p>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 sm:text-sm">
          Where You Shine Online
        </p>
      </div>
    </div>
  );
};

export default BrandLoader;
