import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";

import { pixelToRem } from "../../utils/functions/util";
import { UserInfoState } from "../../store/atom";
import { REGIONLIST } from "../../utils/constants/constant";

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
  height: 10%;
  width: 100%;
  padding: ${pixelToRem(17)} 0 ${pixelToRem(5)} 0;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  justify-content: center;
  display: flex;
`;
const Title = styled.div`
  font-weight: bold;

  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const StickerContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.gray900};
  padding: ${pixelToRem(18)} 0 0 0;
  display: inline-block;
`;

const Select = styled.select`
  width: ${pixelToRem(60)};
  border-radius: ${pixelToRem(10)};
  height: ${pixelToRem(30)};
  background: ${(props) => props.theme.colors.gray300};
  font-size: ${(props) => props.theme.fontSizes.h6};
  color: ${(props) => props.theme.colors.gray500};
  padding-left: 5px;
  border: none;

  margin-left: auto;
  display: flex;

  option {
    border: none;
    color: ${(props) => props.theme.colors.gray800};
    background: ${(props) => props.theme.colors.gray200};
    border-radius: ${pixelToRem(10)};
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

// const TestSelect = styled;

function AreaSelectBox() {
  const [selectedOption, setSelectedOption] = useState<String>();

  // This function is triggered when the select changes
  const selectChange = (event) => {
    const { value } = event.target;

    setSelectedOption(value);
  };

  return (
    <Select onChange={selectChange} label="area">
      {REGIONLIST.map((item, index) => (
        <option key={item} value={index}>
          {item}
        </option>
      ))}
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
