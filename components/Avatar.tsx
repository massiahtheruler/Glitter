import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, type MouseEvent } from "react";
import { FaUserNinja } from "react-icons/fa6";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const sizeClasses = isLarge ? "h-32 w-32" : "h-12 w-12";
  const borderClasses = hasBorder ? "border-4 border-black" : "";

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [router, userId],
  );

  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 overflow-hidden rounded-full transition hover:opacity-90 ${borderClasses} ${sizeClasses}`}
    >
      {fetchedUser?.profileImage ? (
        <Image
          className="object-cover rounded-full"
          alt="Avatar"
          src={fetchedUser.profileImage}
          fill
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white rounded-full bg-sky-500">
          <FaUserNinja size={isLarge ? 64 : 24} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
