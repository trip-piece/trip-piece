import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import fetchData from "../../utils/apis/api";
import tripApis from "../../utils/apis/tripsApis";
import { getDatesStartToLast } from "../../utils/functions/util";
import TripDiaryPage from "../TripDiary/TripDiaryPage";
import TripDate from "./TripDate";

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
  const [result, setResult] = useState<number[]>([]);
  const { tripId } = useParams();
  const { state } = useLocation() as RouteState;

  const { isLoading, data } = useQuery([`${tripId}-diaryList`], () =>
    fetchData.get({ url: tripApis.aTrip(Number(tripId)) }),
  );

  useEffect(() => {
    const _result = getDatesStartToLast(
      data?.data.startDate,
      data?.data.endDate,
    );

    setResult(_result);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>여행기록 | 여행조각</title>
        </Helmet>
      </HelmetProvider>
      <div>
        {isLoading && <div>Loading...</div>}
        <div>
          {result.length &&
            result.map((date) => <TripDate key={v4()} date={date} />)}
        </div>
        <Routes>
          <Route path="/" element={<TripDiaryPage />} />
          <Route path="/:diaryId" element={<TripDiaryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default TripDiaryListPage;
