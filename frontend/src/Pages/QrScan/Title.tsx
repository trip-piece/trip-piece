import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { TitleProps } from "../../utils/interfaces/qrscan.inteface";

import useGetLocation from "../../utils/hooks/useGetLocation";
import QrLocation from "../../components/modules/QrLocation";

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

function Title({ title }: TitleProps) {
  const { isFetchingLocation, locationData, refetchLocation } =
    useGetLocation();

  return (
    <Box>
      <TitleBox>{title}</TitleBox>

      <GpsBox>
        <QrLocation
          {...{ isFetchingLocation, locationData, refetchLocation }}
        />
      </GpsBox>
    </Box>
  );
}

export default Title;
