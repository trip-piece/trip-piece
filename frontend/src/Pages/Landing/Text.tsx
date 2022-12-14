import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import trippieceLogo from "../../assets/image/trippiece_logo.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
`;

const Textbox = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
  line-height: ${pixelToRem(50)};
  color: ${(props) => props.theme.colors.white};
  padding: 10% 10%;
  text-align: center;
`;
const Text = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
`;

const LogoImg = styled.img`
  width: 45%;
`;

function Content() {
  return (
    <Container>
      <Textbox>
        <Text>
          <LogoImg src={trippieceLogo} />
          으로
        </Text>
        <Text>당신의 기록을</Text>
        <Text>남겨보세요</Text>
      </Textbox>
    </Container>
  );
}

export default Content;
