import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { pixelToRem } from "../../utils/functions/util";
import Title from "./Title";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

function Loading() {
  return (
    <>
      <Helmet>스티커 발급중 | 여행조각</Helmet>
      로딩페이지
      <Title title="NFT 스티커 발급" location="현재 GPS위치" />
      <Box />
    </>
  );
}

export default Loading;
