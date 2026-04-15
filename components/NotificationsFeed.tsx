import BrandMark from "@/components/BrandMark";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";

type Notification = {
  id: string;
  body: string;
  createdAt?: string | Date;
  fromUser?: {
    name?: string | null;
    username?: string | null;
  };
};

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Notification) => (
        <div
          key={notification.id}
          className="relative border-b border-neutral-800 p-6 pl-28 text-white"
        >
          <BrandMark
            size={120}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full object-cover"
          />
          <div className="ml-8">
            <p className="font-semibold leading-5">
              {notification.fromUser?.name || "Someone"}
            </p>
            <p className="leading-5 text-neutral-500">
              <span className="-ml-4 mr-1 inline-block text-white">@</span>
              {notification.fromUser?.username}
            </p>
          </div>
          <p className="mt-2 text-neutral-300 ml-8">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
