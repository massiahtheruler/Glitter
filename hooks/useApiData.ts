import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { fetcher } from "@/libs/fetcher";

const useApiData = <Data = unknown>(
  key: string | null,
  options?: SWRConfiguration,
): SWRResponse<Data> => useSWR<Data>(key, fetcher, options);

export default useApiData;
