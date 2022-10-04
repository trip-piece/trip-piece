import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { AxiosResponse } from "axios";
import { Icon } from "@iconify/react/dist/offline";
import { BsFillGeoAltFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import { AiTwotoneEdit } from "react-icons/ai";
import diaryApis from "../../utils/apis/diaryApis";
import {
  changeDateFormatToDot,
  changeDateFormatToHyphen,
  pixelToRem,
} from "../../utils/functions/util";
import axiosInstance from "../../utils/apis/api";
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
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";
import { getNFTImagePath } from "../../utils/functions/getNFTImagePath";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import RecordedLocationContainer from "../../components/modules/RecordedLocationContainer";

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

const DiaryContent = styled.div<{ diaryWidth: number }>`
  width: 100%;
  height: fit-content;
  padding: ${(props) => `${pixelToRem(16 + (props.diaryWidth - 320) / 20)}`};
  line-height: 1.1;
  font-size: ${(props) =>
    pixelToRem(props.diaryWidth / 20) !== "0rem"
      ? pixelToRem(props.diaryWidth / 20)
      : pixelToRem(16)};
`;

interface TripListProps {
  startDate?: string;
  today?: string;
  endDate?: string;
}

const DiaryContentsContainer = styled.div<DiaryContentsContainerProps>`
  position: relative;
  white-space: pre-line;
  min-height: ${(props) => props.active && "60vh"};
  height: fit-content;
  width: 100%;
  background-color: ${(props) => DIARY_COLOR_LIST[props.backgroundColor]};
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  resize: none;
  transition: background-color 0.5s ease-in;
  overflow-wrap: break-word;
  font-size: ${(props) =>
    pixelToRem(props.diaryWidth / 20) !== "0rem"
      ? pixelToRem(props.diaryWidth / 20)
      : pixelToRem(16)};
`;

const ButtonListContainer = styled.div`
  position: absolute;
  right: 0;
  gap: 0.5rem;
  display: flex;
  button {
    display: block;
    height: ${pixelToRem(30)};
    padding: 0 0.5rem;
    /* background-color: transparent; */
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.yellow};
  }
`;

interface DiaryContentsContainerProps {
  fontType: number;
  diaryWidth: number;
  backgroundColor: number;
  active?: boolean;
}
function TripDiaryPage({ startDate, today, endDate }: TripListProps) {
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string>(() =>
    changeDateFormatToHyphen(new Date()),
  );
  const [diaryWidth, setDiaryWidth] = useState(0);
  const [NFTStickerList, setNFTStickerList] = useState([]);

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const size = useWindowResize();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.targetDiary(Number(tripId), date));

  const {
    isLoading,
    data: diaryData,
    isSuccess,
  } = useQuery<AxiosResponse<IRequestedDiary, null>>(
    [`${diaryDate || selectedDiaryDate}-diary`],
    () => getDiary(diaryDate || selectedDiaryDate),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  const { mutate } = useDeleteDiary();

  const getNFTList = async () => {
    if (!diaryData) return;
    const { data } = diaryData;
    if (!data || data?.stickerList?.length < 1) return;
    const _list = await Promise.all(
      data?.stickerList?.map((sticker) =>
        getNFTImagePath(sticker.tokenId, sticker.tokenURL, { ...sticker }),
      ),
    );
    setNFTStickerList(_list);
  };

  useEffect(() => {
    const wrapper = diaryRef.current?.getBoundingClientRect();
    setDiaryWidth(wrapper?.width);
  }, [diaryData, size]);

  useEffect(() => {
    (async () => getNFTList())();
  }, [diaryData]);
  const onDelete = () => {
    if (window.confirm("다이어리를 삭제하시겠습니까?"))
      mutate(diaryData?.data?.diaryId, {
        onSuccess: () => queryClient.invalidateQueries([`${diaryDate}-diary`]),
      });
  };

  const moveToWriteDiary = () => {
    navigate(`../../trips/${tripId}/diarys/write`, {
      state: { diaryDate: diaryDate || selectedDiaryDate },
    });
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

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {isSuccess && !diaryData?.data && (
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
      {isSuccess && diaryData?.data && (
        <>
          <DateContainer>
            <h2>
              {diaryDate
                ? changeDateFormatToDot(diaryDate)
                : changeDateFormatToDot(selectedDiaryDate)}
            </h2>
            <Icon icon={weatherList[diaryData?.data?.weather]} />
          </DateContainer>
          <RecordedLocationContainer>
            {diaryData?.data?.location}
          </RecordedLocationContainer>
          <DiaryContentsContainer
            diaryWidth={diaryWidth}
            backgroundColor={diaryData?.data?.backgroundColor}
            fontType={diaryData?.data?.fontType}
          >
            <ButtonListContainer>
              <button
                type="button"
                onClick={moveToEditDiary}
                aria-label="diary-edit-button"
              >
                <AiTwotoneEdit />
              </button>
              <button
                type="button"
                onClick={onDelete}
                aria-label="diary-delete-button"
              >
                <HiTrash />
              </button>
            </ButtonListContainer>
            <div
              style={{ width: "100%", height: "fit-content" }}
              ref={diaryRef}
            >
              <DiaryContent diaryWidth={diaryWidth}>
                {diaryData?.data?.content}
              </DiaryContent>
              {diaryData.data?.todayPhoto && (
                <TodayPhoto
                  src={diaryData.data?.todayPhoto}
                  alt={`${diaryDate}-photo`}
                  ref={imageRef}
                  diaryWidth={diaryWidth}
                />
              )}
              {NFTStickerList?.map((sticker: IRequestedSticker) => (
                <StickerImg
                  up={sticker.y * diaryWidth * diaryData.data.ratio}
                  left={sticker.x * diaryWidth}
                  alt={sticker.tokenName}
                  src={sticker.imagePath}
                  key={sticker.y + sticker.x}
                />
              ))}
            </div>
          </DiaryContentsContainer>
        </>
      )}
    </Container>
  );
}

export default TripDiaryPage;
