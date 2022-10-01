import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { AxiosResponse } from "axios";
import { Icon } from "@iconify/react/dist/offline";
import { BsFillGeoAltFill } from "react-icons/bs";
import diaryApis from "../../utils/apis/diaryApis";
import {
  changeDateForamtToDot,
  changeDateFormatToHyphen,
} from "../../utils/functions/util";
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
import useDeleteDiary from "../../utils/hooks/useDeleteDiary";
import DateContainer from "../../components/atoms/DateContainer";
import { weatherList } from "../../utils/constants/weatherList";

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

interface TripListProps {
  startDate?: string;
  today?: string;
  endDate?: string;
}
function TripDiaryPage({ startDate, today, endDate }: TripListProps) {
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string>(() =>
    changeDateFormatToHyphen(new Date()),
  );
  const [diaryBox, setDiaryBox] = useState({ width: 0 });

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const size = useWindowResize();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.targetDiary(Number(tripId), date));
  console.log(diaryDate);
  const { isLoading, data, isSuccess } = useQuery<
    AxiosResponse<IRequestedDiary, null>
  >(
    [`${diaryDate || selectedDiaryDate}-diary`],
    () => getDiary(diaryDate || selectedDiaryDate),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  const { mutate } = useDeleteDiary();

  const onDelete = () => {
    if (window.confirm("다이어리를 삭제하시겠습니까?"))
      mutate(data?.data?.diaryId, {
        onSuccess: () => queryClient.invalidateQueries([`${diaryDate}-diary`]),
      });
  };

  useEffect(() => {
    if (diaryRef.current) {
      const wrapperBox = diaryRef.current.getBoundingClientRect();
      setDiaryBox({
        width: wrapperBox.width,
      });
    }
  }, [size, diaryRef.current, diaryRef, imageRef, imageRef.current]);

  const moveToWriteDiary = () => {
    navigate(`/trips/${tripId}/diarys/diary/write`, {
      state: { diaryDate: selectedDiaryDate },
    });
  };

  if (startDate > selectedDiaryDate || diaryDate > today)
    return <div>아직 멀었다.</div>;

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
        <>
          <div>
            <button>수정</button>
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </div>
          <DateContainer>
            <h2>{changeDateForamtToDot(selectedDiaryDate)} </h2>
            <Icon icon={weatherList[data?.data?.weather]} />
          </DateContainer>
          {/* <PositionContainer> */}
          <BsFillGeoAltFill />
          {data?.data?.location}
          {/* </PositionContainer> */}
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
        </>
      )}
    </Container>
  );
}

export default TripDiaryPage;
