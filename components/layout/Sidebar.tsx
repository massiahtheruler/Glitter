import { BsHouseDoorFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiLogIn, BiLogOutCircle } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/components/Avatar";
import BrokMark from "@/components/BrokMark";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweet from "./SidebarTweet";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMessages from "@/hooks/useMessages";
import useReadMessages from "@/hooks/useReadMessages";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

function Sidebar() {
  const { data: userData, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: messagesData } = useMessages();
  const readThreadIds = useReadMessages((state) => state.readThreadIds);
  const loginModal = useLoginModal();
  const router = useRouter();
  const isNotificationsPage = router.pathname === "/notifications";
  const isMessagesPage = router.pathname === "/messages";
  const adjustedMessageBadgeCount =
    messagesData?.threads?.reduce(
      (
        total: number,
        thread: { unreadCount?: number; user: { id: string } },
      ) => {
        if (readThreadIds[thread.user.id]) {
          return total;
        }

        return total + (thread.unreadCount || 0);
      },
      0,
    ) || 0;

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const onLogout = useCallback(async () => {
    await mutateCurrentUser(null, false);
    await signOut({ callbackUrl: "/" });
  }, [mutateCurrentUser]);

  const onProfileClick = () => {
    if (!userData?.id) {
      loginModal.onOpen();
      return;
    }

    router.push(`/users/${userData.id}`);
  };

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseDoorFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: IoNotificationsSharp,
      auth: true,
      alert: isNotificationsPage ? false : userData?.hasNotifications,
    },
    {
      label: "Dee-EM",
      href: "/messages",
      icon: BsChatDotsFill,
      auth: true,
      alert: isMessagesPage ? false : Boolean(adjustedMessageBadgeCount),
      badgeCount: isMessagesPage ? 0 : adjustedMessageBadgeCount,
    },
    {
      label: "Profile",
      icon: FaUserCircle,
      auth: true,
      onClick: onProfileClick,
      href: userData?.id ? `/users/${userData.id}` : undefined,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 max-[500px]:pr-0 md:pr-4 xl:pr-2">
      <div className="sticky top-0 flex h-screen flex-col items-end pb-4 pt-2 max-[500px]:items-center">
        <div className="mt-4 space-y-2 lg:w-[274px] max-[500px]:flex max-[500px]:flex-col max-[500px]:items-center">
          <SidebarLogo />
          <div
            onClick={() => router.push("/grok")}
            className="mt-6 flex flex-row items-center max-[500px]:justify-center"
          >
            <div className="relative mr-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-300/5 max-[500px]:mr-0 lg:hidden">
              <BrokMark
                size={68}
                className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
            <div className="relative hidden cursor-pointer items-center rounded-full py-3 pl-20 pr-4 transition hover:bg-slate-300/5 lg:flex">
              <BrokMark
                size={54}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 object-contain"
              />
              <p className="text-xl -ml-6 text-blue-100">Brok</p>
            </div>
          </div>
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              auth={item.auth}
              onClick={item.onClick}
              alert={item.alert}
              badgeCount={item.badgeCount}
            />
          ))}
          {userData ? (
            <SidebarItem
              onClick={onLogout}
              icon={BiLogOutCircle}
              label="Logout"
            />
          ) : (
            <SidebarItem onClick={onClick} icon={BiLogIn} label="Sign In" />
          )}

          <SidebarTweet />
        </div>

        <div className="mt-auto w-full max-w-[274px]">
          <div
            onClick={onProfileClick}
            className="flex cursor-pointer items-center justify-center rounded-full py-3 transition hover:bg-slate-300/5 max-[500px]:mx-auto max-[500px]:w-14 md:mx-auto md:w-fit md:px-0 lg:w-full lg:justify-between lg:px-4"
          >
            <div className="flex items-center gap-3">
              {userData?.id ? (
                <Avatar userId={userData.id} />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-xl text-white">
                  <FaUserCircle />
                </div>
              )}
              <div className="min-w-0 hidden lg:block">
                <p className="truncate text-sm font-semibold text-white">
                  {userData?.name || "Your profile"}
                </p>
                <p className="truncate text-sm text-neutral-500">
                  @ {userData?.username || "glitter"}
                </p>
              </div>
            </div>
            <HiMiniEllipsisHorizontal className="hidden text-neutral-500 lg:block" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
