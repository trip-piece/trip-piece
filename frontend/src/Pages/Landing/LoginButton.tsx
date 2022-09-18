import React from "react";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { pixelToRem } from "../../utils/functions/util";

// const injected = new InjectedConnector({});
// const { activate, active, deactivate } = useWeb3React();

const StyledButton = styled.button`
  /* 공통 스타일 */

  outline: none;
  border: none;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.yellow};
  font-weight: bold;
  cursor: pointer;
  text-align: center;

  /* 크기 */
  width: ${pixelToRem(117)};
  height: ${pixelToRem(38)};
  font-size: ${(props) => props.theme.fontSizes.h5};

  /* 색상 */
  font-color: ${(props) => props.theme.colors.MainDark};
  z-index: 1;
`;

// const handleActivate = () => {
//   if (active) {
//     deactivate();
//     return;
//   }

//   activate(injected, async (error: Error) => {
//     /*에러처리코드 */
//     console.error("에러");
//   });
// };

// const onClickDeactivate = () => {
//   deactivate();
// };

function Button() {
  return <StyledButton>로그인</StyledButton>;
}
// function Button() {
//   return <StyledButton>로그인</StyledButton>;
// }

export default Button;
