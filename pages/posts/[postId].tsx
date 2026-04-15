import BrandLoader from "@/components/BrandLoader";
import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import useMinimumLoading from "@/hooks/useMinimumLoading";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);
  const showLoading = useMinimumLoading(isLoading, 500);

  if (showLoading || !fetchedPost) {
    return <BrandLoader compact />;
  }
  return (
    <div>
      <Header label="Geek" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Write a reply..."
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </div>
  );
};
export default PostView;
