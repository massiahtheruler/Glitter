import Avatar from "@/components/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { useCallback, type MouseEvent } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";
import { PostRecord, UserSummary } from "@/types/social";

export interface PostItemData {
  id: string;
  content: string;
  image?: string | null;
  createdAt?: string | Date;
  likedIds?: string[];
  user: UserSummary;
  comments?: PostRecord["comments"];
}

interface PostItemProps {
  data: PostItemData;
  userId?: string;
}

const PostItem = ({ data, userId }: PostItemProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (
      event: MouseEvent<
        HTMLDivElement | HTMLParagraphElement | HTMLSpanElement
      >,
    ) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router],
  );

  const onLike = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, currentUser, toggleLike],
  );

  const onComment = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      router.push(`/posts/${data.id}`);
    },
    [router, data.id],
  );

  const createdAt = data.createdAt
    ? formatDistanceToNowStrict(new Date(data.createdAt))
    : null;

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div className="border-b border-neutral-800 p-5 transition hover:bg-neutral-900">
      <div className="flex flex-row gap-4">
        <Avatar userId={data.user.id} />
        <div className="flex min-w-0 w-full flex-col">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {data.user.name || "Unknown user"}
            </p>
            <span
              onClick={goToUser}
              className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
            >
              @{data.user.username || "unknown"}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">
            <p>{data.content}</p>
          </div>
          {data.image ? (
            <div className="relative mt-3 h-[260px] w-full overflow-hidden rounded-2xl border border-neutral-800 sm:h-[340px]">
              <Image
                src={data.image}
                alt="Post image"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="mt-3 flex flex-row items-center gap-10">
            <div
              onClick={onComment}
              className="flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition hover:text-sky-500"
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
