import useApiData from "@/hooks/useApiData";
import { NotificationRecord } from "@/types/social";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useApiData<NotificationRecord[]>(
    url,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
