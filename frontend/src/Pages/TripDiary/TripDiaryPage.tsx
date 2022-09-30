import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { AxiosResponse } from "axios";
import diaryApis from "../../utils/apis/diaryApis";
import { changeDateFormatToHyphen } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import axiosInstance from "../../utils/apis/api";
import DiaryContentContainer from "../../components/modules/DiaryContentContainer";
import useWindowResize from "../../utils/hooks/useWindowResize";
import StickerImg from "../../components/atoms/StickerImg";
import {
  IRequestedDiary,
  IRequestedSticker,
} from "../../utils/interfaces/diarys.interface";
import TodayPhoto from "../../components/atoms/TodayPhoto";

const Container = styled.article`
  min-height: 75vh;
  height: fit-content;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  overflow: hidden;
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
  const [diaryBox, setDiaryBox] = useState({ width: 0 });

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const size = useWindowResize();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.diary(Number(tripId), date));

  const { isLoading, data, isSuccess, isError } = useQuery<
    AxiosResponse<IRequestedDiary, null>
  >([`${diaryDate}-diary`], () => getDiary(diaryDate), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (diaryRef.current) {
      const wrapperBox = diaryRef.current.getBoundingClientRect();
      setDiaryBox({
        width: wrapperBox.width,
      });
    }
  }, [size, diaryRef.current, diaryRef, imageRef, imageRef.current]);

  const moveToWriteDiary = () => {
    navigate(`/trips/${tripId}/diarys/${diaryDate}/write`, {
      state: { date: diaryDate },
    });
  };

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {isSuccess && !data.data && (
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
      {isSuccess && data.data && (
        <DiaryContentContainer
          diaryWidth={diaryBox.width}
          backgroundColor={data?.data?.backgroundColor}
          fontType={data?.data?.fontType}
          ref={diaryRef}
        >
          {data?.data?.content}

          {data?.data?.todayPhoto && (
            <TodayPhoto
              src={data.data.todayPhoto}
              alt={`${diaryDate}-photo`}
              ref={imageRef}
            />
          )}
          {data?.data?.stickerList?.map((sticker: IRequestedSticker) => (
            <StickerImg
              up={
                16 +
                sticker.y * (diaryBox.width * data.data.ratio) +
                (diaryBox.width - 320) / 20
              }
              left={
                16 + sticker.x * diaryBox.width + (diaryBox.width - 320) / 20
              }
              alt={sticker.tokenName}
              src={sticker.tokenURL}
              key={sticker.y}
            />
          ))}
        </DiaryContentContainer>
      )}
    </Container>
  );
}

export default TripDiaryPage;
