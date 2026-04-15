import Image from "next/image";

import brokMark from "@/assets-twitter/Futuristic _B_ with ring design.png";

interface BrokMarkProps {
  className?: string;
  size?: number;
}

const BrokMark = ({ className, size = 32 }: BrokMarkProps) => {
  return (
    <Image
      src={brokMark}
      alt="Brok logo"
      width={size}
      height={size}
      className={className}
      style={{ height: "auto" }}
      priority
      unoptimized
    />
  );
};

export default BrokMark;
