import useSWR from "swr";

import { fetcher } from "@/libs/fetcher";

const useMessageThread = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/messages/${userId}` : null,
    fetcher,
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
