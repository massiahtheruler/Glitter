import useSWR from "swr";

import { fetcher } from "@/libs/fetcher";

const useMessages = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/messages", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 5000,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMessages;
