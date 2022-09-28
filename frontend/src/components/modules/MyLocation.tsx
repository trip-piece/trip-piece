import { AxiosError } from "axios";
import React, { memo } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { UserInfoState } from "../../store/atom";

import { getLocation } from "../../utils/functions/util";
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

function Location() {
  const [userInfo] = useRecoilState(UserInfoState);

  const { isFetching, data, refetch } = useQuery<ICoordinate, AxiosError>(
    [`${userInfo.id}-MyCoordinate`],
    getLocation,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

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
