import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";
import { BiCalendarWeek } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useDeeEmModal from "@/hooks/useDeeEmModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio = ({ userId }: UserBioProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const editModal = useEditModal();
  const deeEmModal = useDeeEmModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = fetchedUser?.createdAt
    ? format(new Date(fetchedUser.createdAt), "MMMM yyyy")
    : null;

  return (
    <div className="pb-4 border-b border-neutral-800">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={() => deeEmModal.onOpen(userId)}
              label="Dee-EM"
              secondary
            />
            <Button
              onClick={toggleFollow}
              label={isFollowing ? "Unfollow" : "Follow"}
              secondary={!isFollowing}
              outline={isFollowing}
            />
          </div>
        )}
      </div>
      <div className="px-6 py-4 mt-10 ">
        <p className="text-2xl font-semibold text-white">
          {fetchedUser?.name || "Unnamed User"}
        </p>
        <p className="ml-2 text-neutral-500">
          @{fetchedUser?.username || "unknown"}
        </p>

        {fetchedUser?.bio && (
          <p className="mt-4 text-white">{fetchedUser.bio}</p>
        )}

        <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendarWeek size={24} />
          <p className="text-neutral-500">Joined {createdAt}</p>
        </div>

        <div className="flex flex-row items-center gap-6 mt-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
