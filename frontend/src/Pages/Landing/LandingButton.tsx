import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  /* 공통 스타일 */

  outline: none;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  width: ${pixelToRem(171)};
  height: ${pixelToRem(38)};
  font-size: ${(props) => props.theme.fontSizes.s2};

  margin-top: 20%;
  /* 색상 */
  color: ${(props) => props.theme.colors.white};
  z-index: 1;
`;

function LadingButton() {
  return (
    <Container>
      <Button>방법은 다음과 같습니다 &gt;&gt;Click Me&lt;&lt; </Button>
    </Container>
  );
}

export default LadingButton;
