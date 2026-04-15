import useApiData from "@/hooks/useApiData";
import { MessageThreadResponse } from "@/types/messages";

const useMessageThread = (userId?: string) => {
  const { data, error, isLoading, mutate } = useApiData<MessageThreadResponse>(
    userId ? `/api/messages/${userId}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000,
    },
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMessageThread;
