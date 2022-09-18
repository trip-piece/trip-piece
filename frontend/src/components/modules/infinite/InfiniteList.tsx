/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import React, { useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import fetchData from "../../../utils/apis/api";
import { isQueryError } from "../../../utils/functions/util";
import useFetchTripsInformation from "../../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../../utils/hooks/useObserver";

interface InifinteListProps {
  url: string;
  queryKey: string[];
  CardComponent: React.ElementType;
  SkeletonCardComponent: React.ElementType;
  zeroDataText: string;
  func?: object;
  count: number;
  listName: string;
  state?: boolean;
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
  listName,
  state,
}: InifinteListProps) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);

  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      const res = await fetchData.get({ url: `${url}?page=${pageParam}` });
      return { result: res?.data, page: pageParam };
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
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchTripsInformation({ queryKey, getTargetComponentList });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  const targetList = useMemo(
    () =>
      data
        ? data.pages.flatMap(({ result }) => result && result[listName])
        : [],
    [data],
  );

  const refetchData = () => {
    refetch();
  };

  useObserver({
    target: bottom,
    hasMore: hasNextPage,
    hasError,
    error,
    onIntersect,
  });

  return (
    <div>
      {isSuccess && targetList?.length < 1 && <div>{zeroDataText}</div>}
      {isLoading && <div>Loading ...</div>}
      {isError && isQueryError(error) && <p>{error?.message}</p>}
      <GridContainer gridColumnCount={count}>
        {targetList.map((target, idx) => (
          <CardComponent
            {...target}
            index={idx}
            key={target.tripId + idx}
            func={func}
            state={state}
            refetch={refetchData}
          />
        ))}
      </GridContainer>
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer gridColumnCount={count}>
          {Array.from({ length: count }, (_, idx) => idx).map((i) => (
            <SkeletonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteList;
