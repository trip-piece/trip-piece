import styled from "@emotion/styled";
import React from "react";
import { IButtonProps } from "../IComponents";

const Button = styled.button<{ color: string | undefined }>`
  background-color: ${(props) =>
    props.color && (props.color || props.theme.colors[props.color])};
`;

function RoundButton({ text, type, color, func, disabled }: IButtonProps) {
  return (
    <Button type={type} color={color} onClick={func} disabled={disabled}>
      {text}
    </Button>
  );
}

export default RoundButton;
