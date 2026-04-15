import { useRouter } from "next/router";

import BrandMark from "@/components/BrandMark";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div className="relative h-24 w-24 max-[500px]:mx-auto">
      <div
        onClick={() => router.push("/")}
        className="absolute -left-12 -top-4 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full transition hover:bg-blue-300/10 max-[500px]:left-1/2 max-[500px]:-translate-x-1/2"
      >
        <BrandMark size={160} className="rounded-full object-cover" />
      </div>
    </div>
  );
};

export default SidebarLogo;
