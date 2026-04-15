import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header = ({ label, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="p-5 border-b border-neutral-800">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={40}
            className="p-2 transition rounded-full cursor-pointer hover:bg-slate-300/10"
          />
        )}
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-white">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
