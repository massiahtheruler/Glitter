import useApiData from "@/hooks/useApiData";
import { PostRecord } from "@/types/social";

const usePost = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : null;

  const { data, error, isLoading, mutate } = useApiData<PostRecord | null>(url);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
