import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero = ({ userId }: UserHeroProps) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div className="relative h-44 bg-neutral-700">
      {fetchedUser?.coverImage && (
        <Image
          src={fetchedUser.coverImage}
          alt="Cover Image"
          className="object-cover w-full h-44"
          fill
        />
      )}
      <div className="absolute left-4 top-36">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;
