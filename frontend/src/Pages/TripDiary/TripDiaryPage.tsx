import styled from "@emotion/styled";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import fetchData from "../../utils/apis/api";
import { diaryApis } from "../../utils/apis/diaryApis";
import { pixelToRem } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";

const Container = styled.article`
  height: 1px;
  min-height: 80vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  padding: 1rem;
`;

const NoDiaryContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.gray400};
  gap: 1rem;
  > svg {
    font-size: calc(60px + 5vw);
  }
  > p {
    text-align: center;
  }
`;
function TripDiaryPage() {
  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const getDiary = () => {
    const response = fetchData.get({
      url: diaryApis.diary(Number(tripId), diaryDate),
    });
  };
  // const { isLoading, data } = useQuery([`${diaryDate}-diary`], getDiary);

  const moveToWriteDiary = () => {
    navigate(`/trips/${tripId}/diarys/write`);
  };

  return (
    <Container>
      <NoDiaryContainer>
        <HiPencilAlt />
        {/* {tripId}, {diaryDate} */}
        <p>
          이 날짜에 작성된 기록이 없습니다. <br /> 다이어리를 작성해주세요.
        </p>
        <ColoredRoundButton
          text="작성하기"
          color="gray400"
          type="button"
          func={moveToWriteDiary}
        />
      </NoDiaryContainer>
    </Container>
  );
}

export default TripDiaryPage;
