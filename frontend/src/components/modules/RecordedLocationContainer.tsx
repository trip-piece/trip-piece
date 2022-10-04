import styled from "@emotion/styled";
import React from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { IChildren } from "../../utils/interfaces/common.interface";

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
`;

function RecordedLocationContainer({ children }: IChildren) {
  return (
    <PositionContainer>
      <BsFillGeoAltFill />
      {children}
    </PositionContainer>
  );
}

export default RecordedLocationContainer;
