import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import styled from "@emotion/styled";
import { isSameDay } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";
import { motion } from "framer-motion";
import tripApis from "../../utils/apis/tripsApis";
import {
  changeDateFormatToHyphen,
  getDatesStartToLast,
  pixelToRem,
} from "../../utils/functions/util";
import TripDate from "./TripDate";
import { ITrip } from "../../utils/interfaces/trips.interface";
import axiosInstance from "../../utils/apis/api";
import { REGIONLIST } from "../../utils/constants/constant";
import "swiper/css";

const TripDiary = lazy(() => import("../TripDiary/TripDiaryPage"));

const Container = styled.section`
  min-height: 90vh;
`;

const Header = styled.nav`
  height: ${pixelToRem(75)};
  margin-bottom: 1rem;
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
  const [today] = useState(() => changeDateFormatToHyphen(new Date()));
  const { tripId } = useParams();

  const { state } = useLocation() as RouteState;

  const { isLoading, isSuccess, data } = useQuery<
    AxiosResponse<ITrip>,
    AxiosError
  >(
    [`${tripId}-diaryList`],
    () => axiosInstance.get(tripApis.tripDetail(Number(tripId))),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (data) {
      const _result = getDatesStartToLast(
        data?.data.startDate,
        data?.data.endDate,
      );
      setResult(_result);
      const _today = new Date();
      const idx = _result.findIndex((date) => isSameDay(date, _today));
      if (idx !== -1) {
        setTodayIndex(idx - 2);
      }
      setLoading(true);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          {isSuccess && loading && result.length > 5 && (
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
          {isSuccess && loading && result.length <= 5 && (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={result.length}
              initialSlide={todayIndex}
            >
              {result.length &&
                result.map((date, idx) => (
                  <SwiperSlide key={idx}>
                    <TripDate date={date} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </Header>
        <Suspense fallback={<div>Diary Loading...</div>}>
          <NestedRoute>
            <Routes>
              <Route
                path="/"
                element={
                  <TripDiary
                    startDate={data?.data.startDate}
                    endDate={data?.data.endDate}
                    today={today}
                  />
                }
              />
              <Route
                path=":diaryDate"
                element={
                  <TripDiary
                    startDate={data?.data.startDate}
                    endDate={data?.data.endDate}
                    today={today}
                  />
                }
              />
            </Routes>
          </NestedRoute>
        </Suspense>
      </Container>
    </motion.div>
  );
}

export default TripDiaryListPage;
