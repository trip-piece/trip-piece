import styled from "@emotion/styled";
import { IButtonProps } from "../IComponents";

const Button = styled.button`
  background-color: transparent;
  border-radius: 50%;
`;

function TransparentRoundButton({ children, type, func }: IButtonProps) {
  return (
    <Button type={type} onClick={func}>
      {children}
    </Button>
  );
}

export default TransparentRoundButton;
