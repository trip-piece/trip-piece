import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Modal, Select } from "@mui/material";
import Masonry from "react-masonry-css";
import { QueryFunctionContext } from "react-query";
import { pixelToRem } from "../../utils/functions/util";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import userApis from "../../utils/apis/userApis";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";
import "../Frame/masonry.css";
import useFetchMyScrappInformation from "../../utils/hooks/useFetchMyScrappInformation";
import axiosInstance from "../../utils/apis/api";
import useObserver from "../../utils/hooks/useObserver";

const StickerBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: 0 ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  min-height: 65vh;
  height: 100%;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  height: 8%;
  width: 100%;
  padding: ${pixelToRem(17)} 0 ${pixelToRem(5)} 0;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  justify-content: center;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h4};
  justify-content: center;
  text-align: center;
`;

const StickerContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.gray900};
  padding: ${pixelToRem(18)} 0 0 0;
  display: inline-block;
`;

function MyScrapList() {
  const [hasError, setHasError] = useState(false);

  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      const res = await axiosInstance.get(
        `${userApis.getMyScraps}?page=${pageParam}`,
      );
      return { result: res?.data, page: pageParam };
    } catch {
      setHasError(true);
      return undefined;
    }
  };

  const { data, error, fetchNextPage, hasNextPage, refetch } =
    useFetchMyScrappInformation({
      queryKey: ["scrapList"],
      getTargetComponentList,
    });

  const targetList = useMemo(
    () =>
      data &&
      data.pages?.flatMap(
        (page) => page?.result?.content?.length && page?.result.content,
      ),
    [data],
  );

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();
  const bottom = useRef(null);
  useObserver({
    target: bottom,
    hasMore: hasNextPage,
    hasError,
    error,
    onIntersect,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <StickerBox>
        <TitleBox>
          <Title>내가 스크랩한 프레임</Title>
        </TitleBox>
        {targetList?.length && targetList[0] === 0 && (
          <div style={{ marginTop: "10px" }}>스크랩한 프레임이 없습니다.</div>
        )}
        <StickerContainer>
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {targetList?.length &&
              targetList[0] !== 0 &&
              targetList?.map((target, idx) => (
                <MemoCard {...target} key={idx} />
              ))}
            <div ref={bottom} />
          </Masonry>
          {/* <MemoInfiniteList
            url={userApis.getMyScraps}
            queryKey={["scrapList"]}
            CardComponent={MemoCard}
            SkeletonCardComponent={Skeleton}
            zeroDataText="스크랩이 존재하지..않습니다"
            count={2}
          /> */}
        </StickerContainer>
      </StickerBox>
    </motion.div>
  );
}

export default MyScrapList;
