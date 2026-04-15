import { CommentRecord } from "@/types/social";

import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: CommentRecord[];
}

const CommentFeed = ({ comments = [] }: CommentFeedProps) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
