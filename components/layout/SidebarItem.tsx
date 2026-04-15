import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
  badgeCount?: number;
}

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
  badgeCount,
}: SidebarItemProps) => {
  const loginModal = useLoginModal();
  const { data: userData } = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !userData) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [href, onClick, router, auth, userData, loginModal]);

  return (
    <div
      onClick={handleClick}
      className="flex flex-row items-center max-[500px]:justify-center"
    >
      <div className="flex flex-row items-center max-[500px]:justify-center">
        <div className="relative mr-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300/5 max-[500px]:mr-0 lg:hidden">
          <Icon size={28} color="white" />
          {alert ? (
            <BsDot className="absolute -right-1 top-0 text-sky-500" size={40} />
          ) : null}
          {badgeCount ? (
            <span className="absolute -right-1 bottom-1 rounded-full bg-sky-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {badgeCount > 9 ? "9+" : badgeCount}
            </span>
          ) : null}
        </div>
        <div className="relative items-center hidden gap-4 p-4 rounded-full cursor-pointer hover:bg-slate-300/5 lg:flex">
          <Icon size={24} color="white" />

          <p className="hidden text-xl text-blue-100 lg:block">{label}</p>
          {alert ? (
            <BsDot className="absolute -left-1 -top-4 text-sky-500" size={80} />
          ) : null}
          {badgeCount ? (
            <span className="rounded-full bg-sky-500 px-2 py-0.5 text-xs font-semibold text-white">
              {badgeCount > 99 ? "99+" : badgeCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
