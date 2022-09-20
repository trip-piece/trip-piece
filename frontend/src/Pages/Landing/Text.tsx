import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Textbox = styled.text`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
  width: ${pixelToRem(230)};
  line-height: ${pixelToRem(50)};
  color: ${(props) => props.theme.colors.white};

  padding: ${pixelToRem(5)};
  font-family: "Leferi Base Type";
  text-align: center;
`;

const Top = styled.div`
  height: 25vh;
`;

function Text() {
  return (
    <>
      <Top />
      <Container>
        <Textbox>여행조각으로 당신의 기록을 남겨보세요</Textbox>
      </Container>
    </>
  );
}

export default Text;
