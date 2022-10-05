import styled from "@emotion/styled";
import { ReactNode } from "react";

type ComponentProps = {
  children: ReactNode;
  hasPadding?: true;
};

const Wrapper = styled.section<{ active?: boolean }>`
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: ${(props) => props.active && "1rem"};
  position: relative;
  width: inherit;
  overflow-x: hidden;
`;

function Container({ children, hasPadding }: ComponentProps) {
  return <Wrapper active={hasPadding}>{children}</Wrapper>;
}

export default Container;
