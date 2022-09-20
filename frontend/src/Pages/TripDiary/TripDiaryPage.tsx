import styled from "@emotion/styled";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchData from "../../utils/apis/api";
import { diaryApis } from "../../utils/apis/diaryApis";

const Container = styled.article`
  min-height: 80vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  padding: 1rem;
`;
function TripDiaryPage() {
  const { tripId, diaryDate } = useParams();
  const getDiary = () => {
    const response = fetchData.get({
      url: diaryApis.diary(Number(tripId), diaryDate),
    });
  };
  // const { isLoading, data } = useQuery([`${diaryDate}-diary`], getDiary);

  return (
    <Container>
      {tripId}, {diaryDate}
    </Container>
  );
}

export default TripDiaryPage;
