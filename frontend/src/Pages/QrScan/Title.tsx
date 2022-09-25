import React from "react";
import styled from "@emotion/styled";
import { MdLocationOn } from "react-icons/md";
import { pixelToRem } from "../../utils/functions/util";
import { TitleProps } from "../../utils/interfaces/qrscan.inteface";

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
const GpsText = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.s1};
  margin: 1% 0;
  color: ${(props) => props.theme.colors.white};
`;
function Title({ title, location }: TitleProps) {
  return (
    <Box>
      <TitleBox>{title}</TitleBox>

      <GpsBox>
        <MdLocationOn size="25" color="#D35B5B" />
        <GpsText>{location}</GpsText>
      </GpsBox>
    </Box>
  );
}

export default Title;
