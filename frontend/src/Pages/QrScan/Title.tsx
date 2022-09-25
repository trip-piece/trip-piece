import React from "react";
import styled from "@emotion/styled";
import { MdLocationOn } from "react-icons/md";
import { pixelToRem } from "../../utils/functions/util";

const Box = styled.div`
  padding: 0 ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
`;

const TitleBox = styled.h3`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.white};
  margin: 0 0 2% 0;
`;

const GpsBox = styled.div`
  display: flex;
`;
const GpsText = styled.s1`
  font-size: ${(props) => props.theme.fontSizes.s1};
  margin: 1% 0;
  color: ${(props) => props.theme.colors.white};
`;
function Title() {
  return (
    <Box>
      <TitleBox>QR코드 스캔</TitleBox>

      <GpsBox>
        <MdLocationOn size="25" color="#D35B5B" />
        <GpsText>현재 GPS 위치</GpsText>
      </GpsBox>
    </Box>
  );
}

export default Title;
