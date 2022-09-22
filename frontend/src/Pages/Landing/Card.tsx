import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.color.gray400};
`;

function Card() {
  return <Container>스프</Container>;
}

export default Card;
