import React from "react";
import styled from "@emotion/styled";

import YellowRoundButton from "../../components/atoms/YellowRoundButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonText = styled.text`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  /* 색상 */
  font-color: ${(props) => props.theme.colors.MainDark};
`;

interface LoginButtonProps {
  func: () => void;
}

function LoginButton({ func }: LoginButtonProps) {
  return (
    <Container>
      <YellowRoundButton type="button" func={func}>
        <ButtonText>로그인</ButtonText>
      </YellowRoundButton>
    </Container>
  );
}

export default LoginButton;
