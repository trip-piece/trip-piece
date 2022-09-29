import { AxiosError } from "axios";
import React, { memo } from "react";
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
  justify-content: flex-end;
  align-items: center;
`;

const MotionButton = styled(motion.button)`
  color: ${(props) => props.theme.colors.red};
  background: transparent;
  width: 7%;
`;

interface LocationProps {
  isFetching: boolean;
  data: ICoordinate;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<ICoordinate, AxiosError<unknown, any>>>;
}
function Location({ isFetching, data, refetch }: LocationProps) {
  const refetchLocation = () => {
    refetch();
  };

  return (
    <Container>
      <p>{isFetching ? "위치 찾는 중" : data?.location}</p>
      <MotionButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={refetchLocation}
      >
        <BiCurrentLocation size="18" />
      </MotionButton>
    </Container>
  );
}

export default memo(Location);
