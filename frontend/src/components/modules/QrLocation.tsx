import { AxiosError } from "axios";
import React, { memo } from "react";
import { MdLocationOn } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { ICoordinate } from "../../utils/interfaces/places.interface";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.white};
  align-items: center;
`;

const MotionButton = styled(motion.button)`
  color: ${(props) => props.theme.colors.red};
  background: transparent;
`;

interface LocationProps {
  isFetchingLocation: boolean;
  locationData: ICoordinate;
  refetchLocation: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<ICoordinate, AxiosError<unknown, any>>>;
}
function Location({
  isFetchingLocation,
  locationData,
  refetchLocation,
}: LocationProps) {
  const refetch = () => {
    refetchLocation();
  };

  return (
    <Container>
      <MotionButton
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={refetch}
      >
        <MdLocationOn size="25" />
      </MotionButton>{" "}
      <p>{isFetchingLocation ? "위치 찾는 중" : locationData?.location}</p>
    </Container>
  );
}

export default memo(Location);
