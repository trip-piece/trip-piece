import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface TransparentRoundButtonProps {
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
}

const Button = styled.button`
  background-color: transparent;
  border-radius: 50%;
`;

function TransparentRoundButton({
  children,
  type,
  func,
}: TransparentRoundButtonProps) {
  return (
    <Button type={type} onClick={func}>
      {children}
    </Button>
  );
}

export default TransparentRoundButton;
