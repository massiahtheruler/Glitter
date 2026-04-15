import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { MouseEvent } from "react";
import Avatar from "../Avatar";

type Comment = {
  id: string;
  content: string;
  createdAt?: string | Date;
  user: {
    id: string;
    name?: string | null;
    username?: string | null;
  };
};

interface CommentItemProps {
  data: Comment;
}

const CommentItem = ({ data }: CommentItemProps) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: MouseEvent<HTMLParagraphElement | HTMLSpanElement>) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id],
  );

  const createdAt = data.createdAt
    ? formatDistanceToNowStrict(new Date(data.createdAt))
    : null;

  return (
    <div className="cursor-pointer border-b border-neutral-800 p-5 transition hover:bg-neutral-900">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
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
          <div className="mt-1 text-white">{data.content}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
