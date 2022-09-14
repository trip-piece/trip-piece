import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray400};
  height: 200px;
  width: 100%;
`;

function Card() {
  return <Container>푸하하핫</Container>;
}

export default Card;
