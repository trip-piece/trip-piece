import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import styled from "@emotion/styled";
import fetchData from "../../utils/apis/api";
import tripApis from "../../utils/apis/tripsApis";
import { getDatesStartToLast } from "../../utils/functions/util";
import TripDiaryPage from "../TripDiary/TripDiaryPage";
import TripDate from "./TripDate";

import "swiper/css";

const Container = styled.section`
  min-height: 90vh;
`;

const Header = styled.nav`
  height: calc(16px + 10vw);
`;

const NestedRoute = styled.div`
  height: 95%;
  width: 100%;
  padding: 1rem;
`;

interface RouteState {
  state: {
    tripId?: number;
    regionId?: number;
    title?: string;
    startDate?: string;
    endDate?: string;
  };
}

function TripDiaryListPage() {
  const [result, setResult] = useState<Date[]>([]);
  const { tripId } = useParams();
  const { state } = useLocation() as RouteState;
  const { isLoading, data } = useQuery(
    [`${tripId}-diaryList`],
    () => fetchData.get({ url: tripApis.aTrip(Number(tripId)) }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    const _result = getDatesStartToLast(
      data?.data.startDate,
      data?.data.endDate,
    );

    setResult(_result);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>여행기록 | 여행조각</title>
      </Helmet>
      <Container>
        <Header>
          {isLoading && <div>Loading...</div>}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={5}
            initialSlide={5}
            loop
          >
            {result.length &&
              result.map((date) => (
                <SwiperSlide key={v4()}>
                  <TripDate date={date} />
                </SwiperSlide>
              ))}
          </Swiper>
        </Header>
        <NestedRoute>
          <Routes>
            <Route path="/" element={<TripDiaryPage />} />
            <Route path="/:diaryDate" element={<TripDiaryPage />} />
          </Routes>
        </NestedRoute>
      </Container>
    </>
  );
}

export default TripDiaryListPage;
