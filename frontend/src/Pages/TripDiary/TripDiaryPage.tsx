import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import diaryApis from "../../utils/apis/diaryApis";
import { changeDateFormatToHyphen } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import axiosInstance from "../../utils/apis/api";
import DiaryContentContainer from "../../components/modules/DiaryContentContainer";
import useWindowResize from "../../utils/hooks/useWindowResize";
import StickerImg from "../../components/atoms/StickerImg";
import { ISavedSticker } from "../../utils/interfaces/diarys.interface";
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
  const [diaryBox, setDiaryBox] = useState({ width: 0, height: 0, ratio: 0 });

  const { tripId, diaryDate } = useParams();
  console.log(diaryDate);
  const navigate = useNavigate();
  const size = useWindowResize();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  useEffect(() => {
    if (diaryRef.current) {
      const wrapperBox = diaryRef.current.getBoundingClientRect();
      setDiaryBox({
        width: wrapperBox.width,
        height: wrapperBox.height,
        ratio: wrapperBox.height / wrapperBox.width,
      });
    }
  }, [size, diaryRef.current, imageRef, imageRef.current]);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.diary(Number(tripId), date));

  const { isLoading, data } = useQuery(
    [`${diaryDate}-diary`],
    () => getDiary(diaryDate),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  console.log(data);

  const moveToWriteDiary = () => {
    navigate(`/trips/${tripId}/diarys/${diaryDate}/write`, {
      state: { date: diaryDate },
    });
  };

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {/* {!isLoading && (
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
      )} */}
      <DiaryContentContainer
        diaryWidth={diaryBox.width}
        backgroundColor={data?.data?.backgroundColor}
        fontType={data?.data?.fontType}
        ref={diaryRef}
      >
        {data?.data?.content}
        {data?.data?.stickerList?.map((sticker: ISavedSticker) => (
          <StickerImg
            up={sticker.y * diaryBox.height}
            left={sticker.x * diaryBox.width}
            alt={sticker.tokenName}
            src={sticker.tokenURL}
          />
        ))}
        {data?.data?.todayPhoto && (
          <TodayPhoto
            src={data.data.todayPhoto}
            alt={`${diaryDate}-photo`}
            ref={imageRef}
          />
        )}
      </DiaryContentContainer>
    </Container>
  );
}

export default TripDiaryPage;
