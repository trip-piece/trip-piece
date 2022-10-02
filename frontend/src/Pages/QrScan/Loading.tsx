import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { pixelToRem } from "../../utils/functions/util";
import Title from "./Title";
import spinner from "../../assets/image/spinner.gif";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(150)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

const LoadingImg = styled.img`
  display: flex;
  margin: auto;
  justify-content: center;
  text-align: center;
`;
const LoadingText = styled.div`
  margin-top: 20%;
  font-size: ${(props) => props.theme.fontSizes.h2};
  display: flex;
  justify-content: center;
`;

function Loading() {
  return (
    <>
      <Helmet>스티커 발급중 | 여행조각</Helmet>

      <Title title="NFT 스티커 발급" />
      <Box>
        <LoadingImg src={spinner} alt="로딩중" />
        <LoadingText>QR인식 하는중</LoadingText>
      </Box>
    </>
  );
}

export default Loading;
