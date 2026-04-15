import Image from "next/image";

import brandMark from "@/assets-twitter/Minimalist G logo with star.png";

interface BrandMarkProps {
  className?: string;
  size?: number;
}

const BrandMark = ({ className, size = 32 }: BrandMarkProps) => {
  return (
    <Image
      src={brandMark}
      alt="Brand logo"
      width={size}
      height={size}
      className={className}
      style={{ height: "auto" }}
      priority
      unoptimized
    />
  );
};

export default BrandMark;
