import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Modal, Select } from "@mui/material";
import { pixelToRem } from "../../utils/functions/util";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import userApis from "../../utils/apis/userApis";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";

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
        <StickerContainer>
          <MemoInfiniteList
            url={userApis.getMyScraps}
            queryKey={["scrapList"]}
            CardComponent={MemoCard}
            SkeletonCardComponent={Skeleton}
            zeroDataText="스크랩이 존재하지..않습니다"
            count={2}
          />
        </StickerContainer>
      </StickerBox>
    </motion.div>
  );
}

export default MyScrapList;
