import styled from "@emotion/styled";
import React from "react";
import { IButtonProps } from "../../utils/interfaces/trips.interface";

const Button = styled.button<{ color: string | undefined }>`
  background-color: ${(props) =>
    props.color && (props.theme.colors[props.color] || props.color)};
  padding: 0.5rem 2.8rem;
  border-radius: 20px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: 700;
`;

function ColoredRoundButton({
  text,
  type,
  color,
  func,
  disabled,
}: IButtonProps) {
  return (
    <Button type={type} color={color} onClick={func} disabled={disabled}>
      {text}
    </Button>
  );
}

export default ColoredRoundButton;
