import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  position: relative;
  color: ${(props) => props.theme.colors.gray900};
`;

function Sticker() {
  return <Container />;
}

export default Sticker;
