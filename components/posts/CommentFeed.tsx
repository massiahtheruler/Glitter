import CommentItem from "./CommentItem";

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

interface CommentFeedProps {
  comments?: Comment[];
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
