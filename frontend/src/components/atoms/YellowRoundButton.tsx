import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { pixelToRem } from "../../utils/functions/util";

const Button = styled.button`
  border-radius: ${pixelToRem(20)};
  background: ${(props) => props.theme.colors.yellow};
  font-weight: bold;
  cursor: pointer;

  /* 크기 */
  width: ${pixelToRem(117)};
  height: ${pixelToRem(38)};
  font-size: ${(props) => props.theme.fontSizes.h5};

  /* 색상 */
  font-color: ${(props) => props.theme.colors.MainDark};
`;

interface YellowRoundButtonProps {
  children: ReactNode;
  type: "button" | "submit" | undefined;
  func?: (event: any) => Promise<void>;
}

function YellowRoundButton({ children, type, func }: YellowRoundButtonProps) {
  return (
    <Button type={type} onClick={func}>
      {children}
    </Button>
  );
}

export default YellowRoundButton;
