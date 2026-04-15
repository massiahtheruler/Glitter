import BrandMark from "@/components/BrandMark";

const SkeletonBar = ({
  className,
}: {
  className: string;
}) => <div className={`animate-pulse rounded-full bg-neutral-800/90 ${className}`} />;

const RouteSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm">
      <div className="mx-auto min-h-screen w-full max-w-[1400px] px-4 md:px-6 xl:px-8">
        <div className="grid min-h-screen grid-cols-4">
          <div className="col-span-1 hidden lg:block" />

          <div className="col-span-4 border-x border-neutral-800/70 px-6 py-6 lg:col-span-2 sm:px-8">
            <div className="mx-auto flex h-full w-full max-w-[760px] flex-col gap-6">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <BrandMark
                    size={28}
                    className="rounded-full object-cover opacity-80"
                  />
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                    Glitter in motion
                  </p>
                </div>
                <SkeletonBar className="h-3 w-16" />
              </div>

              <div className="flex items-center gap-4 border-b border-neutral-800/70 pb-5">
                <SkeletonBar className="h-10 w-10" />
                <div className="space-y-3">
                  <SkeletonBar className="h-4 w-28" />
                  <SkeletonBar className="h-3 w-20" />
                </div>
              </div>

              <div className="space-y-4 rounded-[28px] border border-neutral-800/70 bg-neutral-900/50 p-5">
                <div className="flex items-start gap-4">
                  <SkeletonBar className="h-12 w-12 shrink-0" />
                  <div className="w-full space-y-3">
                    <SkeletonBar className="h-4 w-32" />
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-[82%]" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="border-b border-neutral-800/70 pb-6"
                  >
                    <div className="flex items-start gap-4">
                      <SkeletonBar className="h-11 w-11 shrink-0" />
                      <div className="w-full space-y-3">
                        <div className="flex items-center gap-3">
                          <SkeletonBar className="h-4 w-28" />
                          <SkeletonBar className="h-3 w-16" />
                        </div>
                        <SkeletonBar className="h-4 w-full" />
                        <SkeletonBar className="h-4 w-[76%]" />
                        <div className="flex gap-6 pt-2">
                          <SkeletonBar className="h-3 w-10" />
                          <SkeletonBar className="h-3 w-10" />
                          <SkeletonBar className="h-3 w-10" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default RouteSkeleton;
