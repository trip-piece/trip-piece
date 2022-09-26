import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import diaryApis from "../../utils/apis/diaryApis";
import { changeDateFormatToHyphen } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import axiosInstance from "../../utils/apis/api";

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
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string>(() =>
    changeDateFormatToHyphen(new Date()),
  );
  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.diary(Number(tripId), date));

  const { isLoading } = useQuery(
    [`${diaryDate}-diary`],
    () => getDiary(selectedDiaryDate),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const moveToWriteDiary = () => {
    navigate(`/trips/${tripId}/diarys/${selectedDiaryDate}/write`, {
      state: { date: selectedDiaryDate },
    });
  };

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <NoDiaryContainer>
          <HiPencilAlt />
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
      )}
    </Container>
  );
}

export default TripDiaryPage;
