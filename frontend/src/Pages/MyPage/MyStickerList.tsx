import React, { JSXElementConstructor, useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import userApis from "../../utils/apis/userApis";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";
import { useRecoilState } from "recoil";
import { UserInfoState } from "../../store/atom";
import { MenuItem } from "@mui/material";
import { selectprps } from "../../utils/interfaces/my.interface";

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
  display: flex;
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

const Select = styled.select`
  width: ${pixelToRem(100)};
  border-radius: 5px;
  height: 35px;
  background: ${(props) => props.theme.colors.gray300};
  font-size: ${(props) => props.theme.fontSizes.h4};
  color: ${(props) => props.theme.colors.gray500};
  padding-left: 5px;
  border: none;
  margin-left: auto;
  display: flex;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

function AreaSelectBox() {
  const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <Select>
      <option value="" hidden>
        Type
      </option>
      <option value="1">Audi</option>
      <option value="2">BMW</option>
      <option value="3">Citroen</option>
      <option value="4">Ford</option>
    </Select>
  );
}

function MyStickerList() {
  const { userInfo } = useRecoilState(UserInfoState);

  // const options: selectprps = [{ value: "area", name: "지역" }];
  // 솔리디티 연결

  return (
    <StickerBox>
      <TitleBox>
        <Title>보유NFT스티커</Title>
        <AreaSelectBox />
      </TitleBox>
      <StickerContainer>
        {/* <MemoInfiniteList
          url={`scraps`}
          queryKey={["scrapList"]}
          CardComponent={MemoCard}
          SkeletonCardComponent={Skeleton}
          zeroDataText="스크랩이 존재하지..않습니다"
          count={3}
          listName="scrapList"
        />
        {userApis.getMyScraps} */}
      </StickerContainer>
    </StickerBox>
  );
}

export default MyStickerList;
