import { useCallback } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import { PostRecord } from "@/types/social";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { data: fetchedPosts, mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = currentUser?.id
    ? (fetchedPost?.likedIds || []).includes(currentUser.id)
    : false;

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const previousPost = fetchedPost;
    const previousPosts = fetchedPosts;
    const updatedLikedIds = hasLiked
      ? (fetchedPost?.likedIds || []).filter((id: string) => id !== currentUser.id)
      : [...(fetchedPost?.likedIds || []), currentUser.id];

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await mutateFetchedPost(
        (currentPost: PostRecord | null | undefined) =>
          currentPost
            ? {
                ...currentPost,
                likedIds: updatedLikedIds,
              }
            : currentPost,
        { revalidate: false },
      );

      await mutateFetchedPosts(
        (currentPosts?: PostRecord[]) =>
          currentPosts?.map((post) =>
            post.id === postId ? { ...post, likedIds: updatedLikedIds } : post,
          ),
        { revalidate: false },
      );

      await request();
      await mutateFetchedPost();
      await mutateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      console.log(error);
      await mutateFetchedPost(previousPost, { revalidate: false });
      await mutateFetchedPosts(previousPosts, { revalidate: false });
      toast.error("Something went wrong");
    }
  }, [
    fetchedPost,
    fetchedPosts,
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);
  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
