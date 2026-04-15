import usePosts from "@/hooks/usePosts";

import PostItem, { type PostItemData } from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      <div>
        {posts.map((post: PostItemData) => (
          <PostItem key={post.id} data={post} userId={userId} />
        ))}
      </div>
      <div>
        {posts.map((post: PostItemData) => (
          <PostItem key={post.id} data={post} userId={userId} />
        ))}
      </div>
    </>
  );
};

export default PostFeed;
