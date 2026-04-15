import useApiData from "@/hooks/useApiData";
import { UserSummary } from "@/types/social";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useApiData<UserSummary | null>(
    "/api/current",
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
