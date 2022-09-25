import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

const CameraBox = styled.div`   
  display: flex;
  justify-content: center;
  padding: 10% 10% 10% 10%;
  height:500px;
  align - items: center;
  background: ${(props) => props.theme.colors.gray400};
`;
function Camera() {
  return (
    <Box>
      <CameraBox>카메라위치</CameraBox>
    </Box>
  );
}

export default Camera;
