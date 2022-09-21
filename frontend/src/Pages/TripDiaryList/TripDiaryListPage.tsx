import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import styled from "@emotion/styled";
import { isSameDay } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";
import tripApis from "../../utils/apis/tripsApis";
import { getDatesStartToLast, pixelToRem } from "../../utils/functions/util";
import TripDate from "./TripDate";

import "swiper/css";
import { ITrip } from "../../utils/interfaces/trips.interface";
import axiosInstance from "../../utils/apis/api";
import { REGIONLIST } from "../../utils/constants/constant";

const TripDiary = lazy(() => import("../TripDiary/TripDiaryPage"));

const Container = styled.section`
  min-height: 90vh;
`;

const Header = styled.nav`
  height: ${pixelToRem(75)};
`;

const NestedRoute = styled.div`
  height: 95%;
  width: 100%;
  padding: 1rem;
`;

const H2 = styled.h2`
  padding: 0 1rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`;

interface RouteState {
  state: undefined | ITrip;
}

function TripDiaryListPage() {
  const [result, setResult] = useState<Date[]>([]);
  const [todayIndex, setTodayIndex] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const { tripId } = useParams();

  const { state } = useLocation() as RouteState;

  const { isLoading, isSuccess, data } = useQuery<
    AxiosResponse<ITrip>,
    AxiosError
  >(
    [`${tripId}-diaryList`],
    () => axiosInstance.get(tripApis.aTrip(Number(tripId))),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  console.log(state, data);

  useEffect(() => {
    if (data) {
      const _result = getDatesStartToLast(
        data?.data.startDate,
        data?.data.endDate,
      );

      setResult(_result);
      const today = new Date();
      const idx = _result.findIndex((date) => isSameDay(date, today));
      if (idx !== -1) {
        setTodayIndex(idx - 2);
      }
      setLoading(true);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>여행기록 | 여행조각</title>
      </Helmet>
      <Container>
        <Header>
          <H2>
            {state ? state.title : data?.data.title}
            {state?.regionId
              ? REGIONLIST[state.regionId]
              : data && REGIONLIST[data?.data.regionId]}
          </H2>
          {isLoading && <div>Loading...</div>}
          {isSuccess && loading && (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={5}
              initialSlide={todayIndex}
              loop
            >
              {result.length &&
                result.map((date) => (
                  <SwiperSlide key={v4()}>
                    <TripDate date={date} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </Header>
        <Suspense fallback={<div>Loading...</div>}>
          <NestedRoute>
            <Routes>
              <Route path="/" element={<TripDiary />} />
              <Route path=":diaryDate" element={<TripDiary />} />
            </Routes>
          </NestedRoute>
        </Suspense>
      </Container>
    </>
  );
}

export default TripDiaryListPage;
