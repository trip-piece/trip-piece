import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Container = styled.div`
  padding-left: ${pixelToRem(56)};
`;

const Textbox = styled.div`
  font-size: ${pixelToRem(32)};
  width: ${pixelToRem(257)};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  padding: ${pixelToRem(5)};
  font-family: "Leferi Base Type";
  z-index: 1;
  padding: 0 | ${(props) => (props.padding ? 0 : pixelToRem(props.padding))};
`;

const TopBox = styled.div`
  height: ${pixelToRem(297)};
`;

function Text() {
  return (
    <>
      <TopBox />
      <Container>
        <Textbox>여행조각으로</Textbox>
        <Textbox>당신의 기록을</Textbox>
        <Textbox padding={200}>남겨보세요</Textbox>
      </Container>
    </>
  );
}

export default Text;
