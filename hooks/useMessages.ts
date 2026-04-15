import useApiData from "@/hooks/useApiData";
import { MessagesInboxResponse } from "@/types/messages";

const useMessages = () => {
  const { data, error, isLoading, mutate } = useApiData<MessagesInboxResponse>(
    "/api/messages",
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

export default useMessages;
