import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { AxiosResponse } from "axios";
import { Icon } from "@iconify/react/dist/offline";
import { BsFillGeoAltFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
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
import { getNFTImagePath } from "../../utils/functions/getNFTImagePath";

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
  const [diaryWidth, setDiaryWidth] = useState(0);
  const [NFTStickerList, setNFTStickerList] = useState([]);

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  // const sizes = useSize(diaryRef);
  const size = useWindowResize();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (diaryDate) setSelectedDiaryDate(diaryDate);
  }, []);

  const getDiary = (date: string) =>
    axiosInstance.get(diaryApis.targetDiary(Number(tripId), date));
  console.log(diaryDate);
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
    console.log(diaryRef.current?.getBoundingClientRect());
    const wrapper = diaryRef.current?.getBoundingClientRect();
    setDiaryWidth(wrapper?.width);
  }, [diaryData, size]);

  useEffect(() => {
    (async () => getNFTList())();
  }, [diaryData]);
  console.log(diaryData?.data);
  const onDelete = () => {
    if (window.confirm("다이어리를 삭제하시겠습니까?"))
      mutate(diaryData?.data?.id, {
        onSuccess: () => queryClient.invalidateQueries([`${diaryDate}-diary`]),
      });
  };

  const moveToWriteDiary = () => {
    navigate(`../../trips/${tripId}/diarys/write`, {
      state: { diaryDate: selectedDiaryDate },
    });
  };

  const moveToEditDiary = () => {
    navigate(`../../trips/${tripId}/diarys/${selectedDiaryDate}/edit`, {
      state: { diaryDate: selectedDiaryDate },
    });
  };

  if (startDate > selectedDiaryDate || diaryDate > today)
    return <div>아직 멀었다.</div>;
  // console.log(sizes);
  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {isSuccess && !diaryData.data && (
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
      {isSuccess && diaryData.data && (
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
            <Icon icon={weatherList[diaryData?.data?.weather]} />
          </DateContainer>
          {/* <PositionContainer> */}
          <BsFillGeoAltFill />
          {diaryData?.data?.location}
          {/* </PositionContainer> */}
          <DiaryContents
            diaryWidth={diaryWidth}
            backgroundColor={diaryData?.data?.backgroundColor}
            fontType={diaryData?.data?.fontType}
          >
            <div
              style={{ width: "100%", height: "fit-content" }}
              ref={diaryRef}
            >
              <DiaryContent>{diaryData?.data?.content}</DiaryContent>

              {diaryData.data?.todayPhoto && (
                <TodayPhoto
                  src={diaryData.data?.todayPhoto}
                  alt={`${diaryDate}-photo`}
                  ref={imageRef}
                />
              )}

              {NFTStickerList?.map((sticker: IRequestedSticker) => (
                <StickerImg
                  up={sticker.y * diaryWidth * diaryData.data.ratio}
                  left={sticker.x * diaryWidth}
                  alt={sticker.tokenName}
                  src={sticker.imagePath}
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
