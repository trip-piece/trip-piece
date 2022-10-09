import { QueryFunctionContext, useInfiniteQuery } from "react-query";

interface useFetchMyScrappInformationProps {
  queryKey: string[];
  getTargetComponentList(number: QueryFunctionContext): Promise<
    | {
        result: any;
        page: any;
      }
    | undefined
  >;
}

const useFetchMyScrappInformation = ({
  queryKey,
  getTargetComponentList,
}: useFetchMyScrappInformationProps) =>
  useInfiniteQuery(queryKey, getTargetComponentList, {
    getNextPageParam: (lastPage: any) => {
      if (!lastPage?.result?.last) {
        if (!lastPage?.result?.last) return lastPage.page + 1;
        // return false;
      }
      // return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

export default useFetchMyScrappInformation;
