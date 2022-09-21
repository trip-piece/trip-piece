import React from "react";
import styled from "@emotion/styled";
import { Select } from "@mui/material";
import { pixelToRem } from "../../utils/functions/util";

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
const Title = styled.text`
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

function MyStickerList() {
  return (
    <StickerBox>
      <TitleBox>
        <Title>보유 NFT 스티커</Title>
      </TitleBox>
      <StickerContainer>ss</StickerContainer>
    </StickerBox>
  );
}

export default MyStickerList;
