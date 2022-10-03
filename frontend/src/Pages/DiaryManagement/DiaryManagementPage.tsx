import styled from "@emotion/styled";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/offline";
import { v4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, TextareaAutosize } from "@mui/material";
import { BsFillGeoAltFill } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import Draggable, { DraggableData } from "react-draggable";
import {
  DIARY_COLOR_LIST,
  FONTTYPELIST,
  MESSAGE_LIST,
} from "../../utils/constants/constant";
import { ColoredRoundButton } from "../../components/atoms/ColoredRoundButton";
import { changeDateFormatToDot, pixelToRem } from "../../utils/functions/util";
import { shake } from "../../style/animations";
import useWindowResize from "../../utils/hooks/useWindowResize";
import { formDataDiaryState, writedDiaryState } from "../../store/diaryAtoms";
import {
  IRequestedDiary,
  ISticker,
  IWritedDiary,
  StickerProps,
} from "../../utils/interfaces/diarys.interface";
import Container from "../../components/atoms/Container";
import DateContainer from "../../components/atoms/DateContainer";
import { weatherList } from "../../utils/constants/weatherList";
import MyLocation from "../../components/modules/MyLocation";
import useGetLocation from "../../utils/hooks/useGetLocation";
import diaryApis from "../../utils/apis/diaryApis";
import axiosInstance from "../../utils/apis/api";
import TodayPhoto from "../../components/atoms/TodayPhoto";
import useSize from "../../utils/hooks/useSize";
import { dummyStickerList } from "../../utils/constants/dummyData";
import LazyImage from "../../components/atoms/LazyImage";
import DecorationModal from "./Modal";
import useWriteDiary from "../../utils/hooks/useWriteDiary";
import useDecorateDiary from "../../utils/hooks/useDecorateDiary";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90%;
`;

const Select = styled.select`
  display: block;
  border: none;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  color: ${(props) => props.theme.colors.gray900};
`;

const DiaryStyleContainer = styled.div`
  background-color: ${(props) => props.theme.colors.mainLight};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const WeatherButton = styled.button<{ active: boolean }>`
  color: black;
  background-color: transparent;
  font-size: 33px;
  display: block;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.active ? 1.0 : 0.2)};
  padding: 0.25rem;
`;

const WeatherButtonListContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FileUploadContainer = styled.div`
  height: 10%;
  padding-top: 1rem;
  width: 100%;
`;

const HandleButtonListContainer = styled.div<{ mode: string }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 10%;
  margin-bottom: ${(props) => (props.mode === "decoration" ? "125px" : "1rem")};
`;
const ColorButton = styled.button<{ active: boolean; backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: ${pixelToRem(30)};
  height: ${pixelToRem(30)};
  border-radius: 50%;
  display: block;
  opacity: ${(props) => (props.active ? 1.0 : 0.2)};
`;

const AutosizedTextarea = styled(TextareaAutosize)<IDiaryStyle>`
  display: block;
  font-family: ${(props) => FONTTYPELIST[props.fonttype]};
  width: 100%;
  font-size: 24px;
  outline: none;
  border: none;
  background-color: transparent;
  padding: ${(props) => `${pixelToRem(16 + (props.diarywidth - 320) / 20)}`};
  resize: none;
  font-size: ${(props) => pixelToRem(props.diarywidth / 20)};
  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
  }
`;

const ColorButtonListContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
`;

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
`;

const ColorAndPositionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 0 1rem;
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: bold;
  padding: 1rem;
`;

const ImageControlContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 3.25rem;
  background-color: white;
  > p {
    background-color: ${(props) => props.theme.colors.gray200};
    width: 70%;
    height: ${pixelToRem(28)};
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const FileSelectionButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 10px;
  height: ${pixelToRem(28)};
  color: ${(props) => props.theme.colors.white};
  width: ${pixelToRem(80)};
  font-weight: bold;
`;

const DeleteButton = styled.button`
  position: absolute;
  color: ${(props) => props.theme.colors.red};
  top: 0;
  right: 0;
  font-size: 2rem;
  padding: inherit;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  &:hover {
    animation: ${shake} 0.5s infinite;
  }
`;

const DiaryController = styled.div<{ backgroundcolor: string }>`
  width: 100%;
  background-color: ${(props) => props.backgroundcolor};
  transition: background-color 0.5s ease-in;
`;

const MainContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  background-color: ${(props) => props.theme.colors.white};
`;

const StickerZone = styled.div`
  position: fixed;
  max-height: 120px;
  bottom: 0;
  background-color: rgba(40, 43, 68, 0.6);
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  transition: all 0.8s ease-in;
  justify-content: center;
  z-index: 3;
  > button {
    background-color: transparent;
    height: fit-content;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: bold;
    text-align: left;
    padding: 1rem 1.5rem;
  }

  & > div {
    min-height: 50px;
    padding: 0.5rem 1.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 1rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  transition: all 0.8s ease-in;
`;

interface IDiaryStyle {
  fonttype: number;
  diarywidth: number;
}
interface IFormInput {
  fontType: number;
  content: string;
}

interface IPhoto {
  todayPhoto: File | null;
  imageSrc: string | null;
  imagePath: string | null;
}

interface ImageButtonProps {
  onClick: (sticker: StickerProps) => void;
  sticker: StickerProps;
}

const TransparentRoundButton = styled.button`
  background-color: transparent;
  height: fit-content;
`;

const StickerImg = styled.img<{ isDragging: boolean }>`
  width: 20%;
  position: absolute;
  cursor: move;
  -webkit-user-drag: none;
  user-select: none;
  opacity: ${(props) => (props.isDragging ? 0.6 : 1.0)};
  z-index: 2;
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  height: 2rem;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray200};
  #writing:checked ~ labal.writing {
    color: #fff;
  }
  #decoration:checked ~ label.decoration {
    color: #fff;
  }
  #writing:checked ~ .tab {
    left: 0%;
  }
  #decoration:checked ~ .tab {
    left: 50%;
  }
  > input {
    display: none;
  }
  > label {
    text-align: center;
    flex: 1;
    width: 100%;
    z-index: 1;
    cursor: pointer;
    position: relative;
    color: #1d1f20;
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.6s ease;
  }
  > .tab {
    position: absolute;
    height: 100%;
    width: 50%;
    left: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 10px;
    background: linear-gradient(45deg, #888888 0%, #ffffff 100%);
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;

function ImageButton({ onClick, sticker }: ImageButtonProps) {
  return (
    <TransparentRoundButton onClick={() => onClick(sticker)}>
      <LazyImage src={sticker.tokenURI} />
    </TransparentRoundButton>
  );
}

const MemoizedImageButton = memo(ImageButton);

function DiaryManagementPage() {
  const [weather, setWeather] = useState<number>(0);
  const [diaryColor, setDiaryColor] = useState<number>(0);
  const [dottedDate, setDottedDate] = useState<string>("");
  const [diaryWidth, setDiaryWidth] = useState<number>(320);
  const [photo, setPhoto] = useState<IPhoto>({
    todayPhoto: null,
    imageSrc: null,
    imagePath: null,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [mode, setMode] = useState("writing");

  const fileInput = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { tripId, diaryDate } = useParams();
  const { state, pathname } = useLocation();
  const [diary, setDiary] = useRecoilState(formDataDiaryState);

  const [stickerList, setStickerList] = useState<ISticker[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [open, setOpen] = useState(false);
  const { isFetchingLocation, locationData, refetchLocation } =
    useGetLocation();
  const { register, handleSubmit, control, watch, setValue } =
    useForm<IFormInput>({});
  const navigate = useNavigate();
  const size = useWindowResize();
  const imageRef = useRef<HTMLImageElement>(null);
  const diaryRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerBoxRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLImageElement>(null);
  const sizes = useSize(diaryRef);

  const { mutate: mutateWriting } = useWriteDiary();
  const { mutate: mutateDecoration } = useDecorateDiary();

  useEffect(() => {
    if (!state?.diaryDate && !diaryDate) navigate(-1);
    if (pathname.includes("/edit")) setIsEditMode(true);
    if (state?.diaryDate)
      setDottedDate(changeDateFormatToDot(state?.diaryDate));
  }, []);

  const { data: diaryData } = useQuery<
    AxiosResponse<IRequestedDiary>,
    AxiosError
  >(
    [`${tripId}-${diaryDate}-diary`, "edit"],
    () =>
      axiosInstance.get(
        diaryApis.targetDiary(Number(tripId), state?.diaryDate || diaryDate),
      ),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      enabled: isEditMode,
    },
  );
  useEffect(() => {
    if (!textAreaRef.current?.offsetWidth) return;
    const tmpSize =
      // eslint-disable-next-line no-unsafe-optional-chaining
      textAreaRef.current?.offsetWidth;
    setDiaryWidth(tmpSize);
  }, [size]);
  const encodeFileToBase64 = useCallback((fileBlob: File) => {
    if (!fileBlob) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      const _image = reader.result as string;
      setPhoto((prev) => ({
        ...prev,
        todayPhoto: fileBlob,
        imageSrc: _image,
      }));
    };
  }, []);

  useEffect(() => {
    if (diaryData?.data) {
      setDiaryColor(diaryData.data.backgroundColor);
      setWeather(diaryData.data.weather);
      setIsShared(diaryData.data.isShare);
      setValue("fontType", diaryData.data.fontType);
      setValue("content", diaryData.data.content);
      if (diaryData.data.todayPhoto) {
        setPhoto((prev) => ({
          ...prev,
          imagePath: diaryData.data.todayPhoto,
          imageSrc: diaryData.data.todayPhoto,
        }));
      }
      if (diaryData.data.stickerList?.length) {
        const _stickerList = diaryData.data.stickerList.map((sticker) => {
          return {
            tokenId: sticker.tokenId,
            tokenURI: sticker.tokenURL,
            x: sticker.x * sizes.width,
            y: sticker.y * sizes.width,
            isDragging: false,
            originX: sticker.x,
            originY: sticker.y,
          };
        });
        setStickerList(_stickerList);
      }
    }
  }, [diaryData]);

  const onCancel = () => {
    if (window.confirm(MESSAGE_LIST.DIARY_CANCEL)) {
      navigate(-1);
    }
  };

  const onLoadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file) {
      import("../../utils/functions/changeFileType").then(async (change) => {
        const resizedFile = await change.resizeImage(file);
        encodeFileToBase64(resizedFile);
      });
    }
  };

  const onClick = useCallback(() => {
    if (stickerRef.current.style.maxHeight === "50vh") {
      stickerRef.current.style.maxHeight = "120px";
      stickerRef.current.style.backgroundColor = "rgba(40, 43, 68, 0.6)";
      stickerBoxRef.current.style.overflowY = "hidden";
    } else {
      stickerRef.current.style.maxHeight = "50vh";
      stickerRef.current.style.backgroundColor = "rgba(40, 43, 68, 0.9)";
      stickerBoxRef.current.style.overflowY = "scroll";
    }
  }, []);

  const onDelete = () => {
    setPhoto({ todayPhoto: null, imagePath: null, imageSrc: null });
  };

  const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };

  const addSticker = useCallback(
    (sticker: StickerProps) => {
      setStickerList((prev) => [
        ...prev,
        {
          tokenId: sticker.tokenId,
          tokenURI: sticker.tokenURI,
          originX: 0,
          originY: 0,
          x: 50,
          y: 50,
          isDragging: false,
        },
      ]);
    },
    [stickerList],
  );

  const handleStart = useCallback(
    (data: DraggableData, index: number) => {
      setStickerList((prevState) =>
        prevState.map((prev, idx) => {
          if (idx === index) {
            return {
              ...prev,
              isDragging: false,
              originX: data.x,
              originY: data.y,
            };
          }
          return prev;
        }),
      );
    },
    [sizes],
  );

  const handleDrag = useCallback(
    (data: DraggableData, index: number): any => {
      const imgSize = sizes.width * 0.2;
      setStickerList((prevState) =>
        prevState.map((prev, idx) => {
          if (idx === index) {
            if (data.x < 0) {
              return {
                ...prev,
                isDragging: true,
                x: 0,
                y: data.y,
              };
            }
            if (data.x >= sizes.width - imgSize) {
              return {
                ...prev,
                isDragging: true,
                x: sizes.width - imgSize,
                y: data.y,
              };
            }
            if (data.y < 0) {
              return {
                ...prev,
                isDragging: true,
                x: data.x,
                y: 0,
              };
            }
            if (data.y > sizes.height - imgSize) {
              return {
                ...prev,
                isDragging: true,
                x: data.x,
                y: sizes.height - imgSize,
              };
            }
            return {
              ...prev,
              isDragging: true,
              x: data.x,
              y: data.y,
            };
          }
          return prev;
        }),
      );
    },
    [sizes],
  );
  const handleStop = useCallback(
    (data: DraggableData, index: number) => {
      setStickerList((prevState) =>
        prevState.map((prev, idx) => {
          if (idx === index) {
            return {
              ...prev,
              isDragging: false,
              originX: data.x / sizes.width,
              originY: data.y / sizes.height,
            };
          }
          return prev;
        }),
      );
    },
    [sizes],
  );

  useEffect(() => {
    setStickerList((prev) =>
      prev.map((sticker) => {
        return {
          ...sticker,
          x: sticker.originX * sizes.width,
          y: sticker.originY * sizes.height,
        };
      }),
    );
  }, [sizes]);

  const makeDiaryData = useCallback(
    (formInputData: IFormInput) => {
      let body;
      if (isEditMode) {
        body = {
          diary: {
            ...formInputData,
            weather,
            backgroundColor: diaryColor,
            tripId: Number(tripId),
            diaryId: diaryData?.data?.diaryId,
            imagePath: photo.imagePath,
            ratio: sizes.height / sizes.width,
          },
          todayPhoto: photo.todayPhoto,
        };
      } else {
        body = {
          diary: {
            ...formInputData,
            weather,
            backgroundColor: diaryColor,
            tripId: Number(tripId),
            date: state?.diaryDate,
            location: locationData.location,
            ratio: sizes.height / sizes.width,
          },
          todayPhoto: photo.todayPhoto,
        };
      }

      const formData = new FormData();
      if (photo.todayPhoto) {
        formData.append("todayPhoto", photo.todayPhoto);
      }
      const _diary = JSON.stringify(body);
      formData.append(
        "diary",
        new Blob([_diary], { type: "application/json" }),
      );
      return formData;
    },
    [sizes, locationData],
  );

  const makeDecorationData = useCallback(
    (diaryId: number, frameImage?: File) => {
      const _stickerList = stickerList.map((sticker) => {
        return {
          tokenId: sticker.tokenId,
          x: sticker.originX,
          y: sticker.originY,
        };
      });

      const formData = new FormData();
      const _decoration = JSON.stringify({
        diaryId,
        stickerList: _stickerList,
      });
      formData.append(
        "decoration",
        new Blob([_decoration], { type: "application/json" }),
      );
      if (frameImage) {
        formData.append("frameImage", frameImage);
      }
      return formData;
    },
    [],
  );
  const postEditData = (formData: FormData, frameImage?: File) => {
    mutateWriting(formData);
    mutateDecoration(makeDecorationData(diaryData.data.diaryId, frameImage), {
      onSuccess: () => navigate(`/trips/${tripId}/diarys/${state?.diaryDate}`),
    });
  };

  const postData = (formData: FormData, frameImage?: File) => {
    mutateWriting(formData, {
      onSuccess: (data) => {
        mutateDecoration(makeDecorationData(data.data.diaryId, frameImage), {
          onSuccess: () =>
            navigate(`/trips/${tripId}/diarys/${state?.diaryDate}`),
        });
      },
    });
  };

  const onSubmit = (formInputData: IFormInput) => {
    const formData = makeDiaryData(formInputData);
    if (!isShared) {
      if (isEditMode) postEditData(formData);
      else postData(formData);
    } else {
      setDiary(formData);
      setOpen(true);
    }
  };

  function deleteSticker() {
    setStickerList([]);
  }

  console.log(sizes);
  return (
    <>
      <Helmet>
        <title>다이어리 | 여행조각</title>
      </Helmet>
      <Container>
        <DateContainer>
          <h2>{dottedDate}</h2>
        </DateContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DiaryStyleContainer>
            <Select
              id="font"
              defaultValue="0"
              {...register("fontType", { valueAsNumber: true })}
            >
              <option value="0" disabled hidden>
                글씨체
              </option>
              {FONTTYPELIST.map((font, idx) => (
                <option key={font} value={idx}>
                  {font}
                </option>
              ))}
            </Select>
            <WeatherButtonListContainer>
              {weatherList.map((weatherType, idx) => (
                <WeatherButton
                  type="button"
                  key={v4()}
                  active={idx === weather}
                  onClick={() => setWeather(idx)}
                >
                  <Icon icon={weatherType} />
                </WeatherButton>
              ))}
            </WeatherButtonListContainer>
          </DiaryStyleContainer>
          <ColorAndPositionContainer>
            <ColorButtonListContainer>
              {DIARY_COLOR_LIST.map((color, idx) => (
                <ColorButton
                  type="button"
                  key={color}
                  backgroundColor={color}
                  active={idx === diaryColor}
                  onClick={() => setDiaryColor(idx)}
                />
              ))}
            </ColorButtonListContainer>
            {isEditMode ? (
              <PositionContainer>
                <BsFillGeoAltFill />
                {diaryData?.data?.location}
              </PositionContainer>
            ) : (
              <MyLocation
                {...{ isFetchingLocation, locationData, refetchLocation }}
              />
            )}
          </ColorAndPositionContainer>
          <MainContainer>
            <TabContainer>
              <input
                type="radio"
                name="tab"
                id="writing"
                checked={mode === "writing"}
                onChange={changeMode}
                value="writing"
              />
              <input
                type="radio"
                name="tab"
                id="decoration"
                checked={mode === "decoration"}
                onChange={changeMode}
                value="decoration"
              />
              <label htmlFor="writing" className="writing">
                다이어리 쓰기
              </label>
              <label htmlFor="decoration" className="decoration">
                다이어리 꾸미기
              </label>
              <div className="tab" />
            </TabContainer>

            <DiaryController
              backgroundcolor={DIARY_COLOR_LIST[diaryColor]}
              ref={diaryRef}
            >
              {mode === "decoration" && (
                <button
                  type="button"
                  onClick={deleteSticker}
                  style={{ position: "absolute" }}
                >
                  스티커 삭제하기
                </button>
              )}
              {stickerList.map((sticker, index) => (
                <Draggable
                  nodeRef={nodeRef}
                  position={{ x: sticker.x, y: sticker.y }}
                  // positionOffset={{ x: "-50%", y: "-50%" }}
                  onStart={(_, data) => handleStart(data, index)}
                  onDrag={(_, data) => handleDrag(data, index)}
                  onStop={(event, data) => handleStop(data, index)}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <StickerImg
                    src={sticker.tokenURI}
                    ref={nodeRef}
                    alt="#"
                    width="100"
                    isDragging={sticker.isDragging}
                    draggable
                  />
                </Draggable>
              ))}
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <AutosizedTextarea
                    minRows={1}
                    fonttype={watch("fontType")}
                    placeholder={MESSAGE_LIST.DIARY_INTRO}
                    {...field}
                    ref={textAreaRef}
                    diarywidth={diaryWidth}
                    disabled={mode === "decoration"}
                  />
                )}
              />
              {photo.imageSrc && (
                <div style={{ position: "relative" }}>
                  <TodayPhoto
                    src={photo.imageSrc}
                    alt="미리보기"
                    ref={imageRef}
                    diaryWidth={diaryWidth}
                  />
                  {mode === "writing" && (
                    <DeleteButton type="button" onClick={onDelete}>
                      <HiTrash />
                    </DeleteButton>
                  )}
                </div>
              )}
            </DiaryController>
          </MainContainer>
          {mode === "writing" && (
            <FileUploadContainer>
              <Label htmlFor="todayPhoto">오늘의 PHOTO</Label>
              <input
                style={{ display: "none" }}
                type="file"
                id="todayPhoto"
                accept="image/jpg, image/jpeg, image/png"
                onChange={onLoadFile}
                ref={fileInput}
              />
              <ImageControlContainer>
                <p>{photo.todayPhoto?.name}</p>
                <FileSelectionButton
                  type="button"
                  onClick={() => fileInput.current?.click()}
                >
                  파일 선택
                </FileSelectionButton>
              </ImageControlContainer>
            </FileUploadContainer>
          )}
          {mode === "decoration" && (
            <label htmlFor="isShared">
              <Checkbox
                id="isShared"
                name="isShared"
                checked={isShared}
                onChange={() => setIsShared((prev) => !prev)}
              />
              다른 사람에게 프레임 공유하기
            </label>
          )}

          <div>
            <HandleButtonListContainer mode={mode}>
              <ColoredRoundButton
                type="submit"
                color="mainLight"
                text="일기 작성"
              />
              <ColoredRoundButton
                type="button"
                color="gray400"
                text="취소"
                func={onCancel}
              />
            </HandleButtonListContainer>
          </div>
        </Form>

        <StickerZone
          ref={stickerRef}
          style={{ visibility: mode !== "decoration" ? "hidden" : "visible" }}
        >
          <button type="button" onClick={onClick}>
            보유한 스티커
          </button>
          <div ref={stickerBoxRef}>
            {dummyStickerList.map((sticker, index) => (
              <MemoizedImageButton
                onClick={addSticker}
                sticker={sticker}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              />
            ))}
          </div>
        </StickerZone>

        {open && (
          <DecorationModal
            setOpen={setOpen}
            open={open}
            stickerList={stickerList}
            diaryBox={sizes}
            postData={isEditMode ? postEditData : postData}
          />
        )}
      </Container>
    </>
  );
}

export default DiaryManagementPage;
