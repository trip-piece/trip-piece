import { QueryFunctionContext, useInfiniteQuery } from "react-query";

interface UseFetchTripsInformationProps {
  queryKey: string[];
  getTargetComponentList(number: QueryFunctionContext): Promise<
    | {
        result: any;
        page: any;
      }
    | undefined
  >;
}

const useFetchTripsInformation = ({
  queryKey,
  getTargetComponentList,
}: UseFetchTripsInformationProps) =>
  useInfiniteQuery(queryKey, getTargetComponentList, {
    getNextPageParam: (lastPage: any) => {
      if (!lastPage?.result?.last) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        if (!lastPage?.result?.last) return lastPage?.page + 1;
        // return false;
      }
      // return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

export default useFetchTripsInformation;
