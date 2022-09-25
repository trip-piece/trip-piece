import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Textbox = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;

  line-height: ${pixelToRem(50)};
  color: ${(props) => props.theme.colors.white};

  padding: 10% 10%;
  font-family: "Leferi Base Type";
  text-align: center;
`;
const Text = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
`;

const Top = styled.div`
  height: 25vh;
`;

function Content() {
  return (
    <>
      <Top />
      <Container>
        <Textbox>
          <Text>여행조각으로</Text>
          <Text>당신의 기록을</Text>
          <Text>남겨보세요</Text>
        </Textbox>
      </Container>
    </>
  );
}

export default Content;
