import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
`;
function TripTicket() {
  return <Container>card</Container>;
}

export default TripTicket;
