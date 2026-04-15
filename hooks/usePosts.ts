import useApiData from "@/hooks/useApiData";
import { PostRecord } from "@/types/social";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useApiData<PostRecord[]>(url);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
