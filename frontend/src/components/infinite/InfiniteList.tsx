/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import fetchData from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useObserver from "../../utils/hooks/useObserver";

interface InifinteListProps {
  url: string;
  queryKey: string;
  CardComponent: React.ElementType;
  SkeletonCardComponent: React.ElementType;
  zeroDataText: string;
  func?: object;
  count: number;
}

type GridProps = {
  gridColumnCount: number;
};

const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridColumnCount && `repeat(${props.gridColumnCount}, 1fr)`};
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

function InfiniteList({
  url,
  queryKey,
  CardComponent,
  SkeletonCardComponent,
  zeroDataText,
  func,
  count,
}: InifinteListProps) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);
  const getTargetComponentList = async ({ pageParam = 0 }) => {
    try {
      const res = await fetchData.get({ url: `${url}?page=${pageParam}` });
      return { data: res?.data, page: pageParam };
    } catch (_) {
      setHasError(true);
      return undefined;
    }
  };
  const {
    isLoading,
    data,
    error,
    isError,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(queryKey, getTargetComponentList, {
    getNextPageParam: (lastPage: any) => {
      if (lastPage.data.last) {
        const {
          data: { last },
        } = lastPage;
        if (last) return lastPage.page + 1;
      } else setHasError(true);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  console.log("data", data);

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    hasMore: hasError,
    hasError,
    isError,
    error,
    onIntersect,
  });

  console.log("count", count);
  return (
    <div>
      {data?.pages[0]?.data?.data.length < 1 && <div>{zeroDataText}</div>}
      {isLoading && <div>Loading ...</div>}
      {isError && isQueryError(error) && <p>{error?.message}</p>}
      {isSuccess &&
        data.pages.map((group: any | undefined, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <GridContainer key={index} gridColumnCount={count}>
            {group?.data?.data?.map((card: any, idx: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <CardComponent card={card} key={idx} func={func} />
            ))}
          </GridContainer>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer gridColumnCount={count}>
          {[...Array(count).keys()].map((i) => (
            <SkeletonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteList;
