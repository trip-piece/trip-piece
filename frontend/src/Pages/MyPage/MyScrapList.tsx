import React from "react";
import styled from "@emotion/styled";
import { Modal, Select } from "@mui/material";
import { pixelToRem } from "../../utils/functions/util";
import NestedModal from "./Modal";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import userApis from "../../utils/apis/userApis";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";

const StickerBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: 0 ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};

  height: ${pixelToRem(600)};
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  height: 8%;
  width: 100%;
  padding: ${pixelToRem(17)} 0 0 0;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  justify-content: center;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const Filter = styled.select`
  border: none;
  border-radius: 5px;
  width: ${pixelToRem(10)};
  padding: 0 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  height: ${pixelToRem(10)};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: ${(props) => props.theme.colors.gray900};
  margin-left: auto;
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
    <StickerBox>
      <TitleBox>
        <Title>내가 스크랩한 프레임</Title>
      </TitleBox>
      <StickerContainer>
        <MemoInfiniteList
          url={"scraps"}
          queryKey={["scrapList"]}
          CardComponent={MemoCard}
          SkeletonCardComponent={Skeleton}
          zeroDataText="스크랩이 존재하지..않습니다"
          count={3}
          listName="scrapList"
        />
        {userApis.getMyScraps}
      </StickerContainer>
    </StickerBox>
  );
}

export default MyScrapList;
