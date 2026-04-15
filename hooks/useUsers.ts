import useApiData from "@/hooks/useApiData";
import { UserSummary } from "@/types/social";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useApiData<UserSummary[]>(
    "/api/users",
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
