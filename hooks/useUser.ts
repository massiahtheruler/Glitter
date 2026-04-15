import useApiData from "@/hooks/useApiData";
import { UserSummary } from "@/types/social";

const useUser = (userId?: string) => {
  const { data, error, isLoading, mutate } = useApiData<UserSummary | null>(
    userId ? `/api/users/${userId}` : null,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
