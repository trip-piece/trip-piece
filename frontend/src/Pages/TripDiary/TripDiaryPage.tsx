import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { AxiosResponse } from "axios";
import { Icon } from "@iconify/react/dist/offline";
import { BsFillGeoAltFill } from "react-icons/bs";
import diaryApis from "../../utils/apis/diaryApis";
import {
  changeDateFormatToDot,
  changeDateFormatToHyphen,
  pixelToRem,
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
import useSize from "../../utils/hooks/useSize";
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";

const Container = styled.article`
  min-height: 75vh;
  height: fit-content;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const NoDiaryContainer = styled.div`
  width: 100%;
  min-height: 70vh;
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

const DiaryContent = styled.div`
  width: 100%;
  height: fit-content;
`;

interface TripListProps {
  startDate?: string;
  today?: string;
  endDate?: string;
}

const DiaryContents = styled.div<DiaryContentsProps>`
  position: relative;
  white-space: pre-line;
  min-height: ${(props) => props.active && "60vh"};
  height: fit-content;
  width: 100%;
  background-color: ${(props) => DIARY_COLOR_LIST[props.backgroundColor]};
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  padding: ${(props) => `${pixelToRem(16 + (props.diaryWidth - 320) / 20)}`};
  resize: none;
  transition: background-color 0.5s ease-in;
  overflow-wrap: break-word;
  font-size: ${(props) =>
    pixelToRem(props.diaryWidth / 20) !== "0rem"
      ? pixelToRem(props.diaryWidth / 20)
      : pixelToRem(16)};
`;

interface DiaryContentsProps {
  fontType: number;
  diaryWidth: number;
  backgroundColor: number;
  active?: boolean;
}
function TripDiaryPage({ startDate, today, endDate }: TripListProps) {
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string>(() =>
    changeDateFormatToHyphen(new Date()),
  );

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sizes = useSize(diaryRef);
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

  const moveToWriteDiary = () => {
    navigate(`../../trips/${tripId}/diarys/write`, {
      state: { diaryDate: selectedDiaryDate },
    });
    // return <Navigate to={`../trips/${tripId}/diarys/write`} />;
  };

  const moveToEditDiary = () => {
    navigate(`../../trips/${tripId}/diarys/${selectedDiaryDate}/edit`, {
      state: { diaryDate: selectedDiaryDate },
    });
  };

  if (startDate > selectedDiaryDate || diaryDate > today)
    return (
      <Container>
        <NoDiaryContainer>
          <HiPencilAlt />
          <p>
            미래는 아무도 모르는 법! <br /> 다이어리 작성은 몇밤만 더 자고
            오세용~
          </p>
        </NoDiaryContainer>
      </Container>
    );
  console.log(sizes);
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
            <button type="button" onClick={moveToEditDiary}>
              수정
            </button>
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </div>
          <DateContainer>
            <h2>
              {changeDateFormatToDot(diaryDate) ||
                changeDateFormatToDot(selectedDiaryDate)}
            </h2>
            <Icon icon={weatherList[data?.data?.weather]} />
          </DateContainer>
          {/* <PositionContainer> */}
          <BsFillGeoAltFill />
          {data?.data?.location}
          {/* </PositionContainer> */}
          <DiaryContents
            diaryWidth={sizes.width}
            backgroundColor={data?.data?.backgroundColor}
            fontType={data?.data?.fontType}
          >
            <div
              style={{ width: "100%", height: "fit-content" }}
              ref={diaryRef}
            >
              <DiaryContent>{data?.data?.content}</DiaryContent>

              <TodayPhoto
                src={data.data?.todayPhoto}
                alt={`${diaryDate}-photo`}
                ref={imageRef}
              />

              {data?.data?.stickerList?.map((sticker: IRequestedSticker) => (
                <StickerImg
                  up={sticker.y * sizes.height}
                  left={sticker.x * sizes.width}
                  alt={sticker.tokenName}
                  src={sticker.tokenURL}
                  key={sticker.y}
                />
              ))}
            </div>
          </DiaryContents>
        </>
      )}
    </Container>
  );
}

export default TripDiaryPage;
