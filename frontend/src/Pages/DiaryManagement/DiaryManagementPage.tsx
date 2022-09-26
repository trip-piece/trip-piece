import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/offline";
import sunIcon from "@iconify/icons-twemoji/sun";
import cloudIcon from "@iconify/icons-noto-v1/cloud";
import umbrellaWithRainDrops from "@iconify/icons-twemoji/umbrella-with-rain-drops";
import snowmanwithoutsnowIcon from "@iconify/icons-fxemoji/snowmanwithoutsnow";
import { v4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import { BsFillGeoAltFill } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import {
  DIARY_COLOR_LIST,
  FONTTYPELIST,
  IMAGE_SIZE_LIMIT_NUMBER,
  MESSAGE_LIST,
} from "../../utils/constants/constant";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import { pixelToRem } from "../../utils/functions/util";
import { shake } from "../../style/animations";
import axiosInstance from "../../utils/apis/api";
import diaryApis from "../../utils/apis/diaryApis";
import useWriteDiary from "../../utils/hooks/useWriteDiary";
import useWindowResize from "../../utils/hooks/useWindowResize";
import { writedDiaryState } from "../../store/diaryAtoms";
import {
  IDiaryListState,
  IWritedDiary,
} from "../../utils/interfaces/diarys.interface";

const Container = styled.section`
  height: 1px;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  position: relative;
`;

const DateConatiner = styled.div`
  padding: 1rem;
  text-align: center;
  > h2 {
    font-size: ${(props) => props.theme.fontSizes.h4};
    height: ${(props) => props.theme.fontSizes.h4};
    font-weight: bold;
  }
`;

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

const HandleButtonListContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 10%;
  margin-bottom: 1rem;
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
  background-color: ${(props) => props.backgroundcolor};
  width: 100%;
  min-height: 5vh;
  font-size: 24px;
  outline: none;
  border: none;
  padding: 1rem
    ${(props) => `${pixelToRem(16 + (props.diarywidth - 320) / 20)}`};
  resize: none;
  transition: background-color 0.5s ease-in;
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

const PreviewImage = styled.img`
  width: 100%;
  max-height: 8rem;
  object-fit: contain;
`;

const PreviewContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem;
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

interface RouteState {
  state: {
    date: string;
  };
}
interface IDiaryStyle {
  fonttype: number;
  backgroundcolor: string;
  diarywidth: number;
}
interface IFormInput {
  fontType: number;
  content: string;
}

const weatherList = [
  sunIcon,
  cloudIcon,
  umbrellaWithRainDrops,
  snowmanwithoutsnowIcon,
];

function DiaryManagementPage() {
  const [weather, setWeather] = useState<number>(0);
  const [diaryColor, setDiaryColor] = useState<number>(0);
  const [dottedDate, setDottedDate] = useState<string>("");
  const [diaryWidth, setDiaryWidth] = useState<number>(320);
  const [todayPhoto, setTodayPhoto] = useState<File | null>();
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { tripId, diaryDate } = useParams();
  const [diary, setDiary] = useRecoilState<IWritedDiary<File | null>>(
    writedDiaryState(`${tripId}-${diaryDate}`),
  );
  const {
    state: { date },
  } = useLocation() as RouteState;
  const { register, handleSubmit, control, watch, setValue } =
    useForm<IFormInput>({});
  const navigate = useNavigate();
  const size = useWindowResize();
  useEffect(() => {
    if (date) setDottedDate(date?.replaceAll("-", "."));
    else if (diaryDate) {
      setDottedDate(diaryDate?.replaceAll("-", "."));
    }
  }, []);

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
      const tmpImage = reader.result as string;
      setImageSrc(tmpImage);
    };
  }, []);
  useEffect(() => {
    if (diary) {
      setDiaryColor(diary.diary.backgroundColor);
      setWeather(diary.diary.weather);
      setTodayPhoto(diary.todayPhoto);
      if (diary.todayPhoto) encodeFileToBase64(diary.todayPhoto);
      setValue("fontType", diary.diary.fontType);
      setValue("content", diary.diary.content);
    }
  }, []);

  const onSubmit = (data: IFormInput) => {
    // const formData = new FormData();
    // if (todayPhoto) {
    //   formData.append("file", todayPhoto);
    // }
    const body = {
      diary: {
        ...data,
        weather,
        backgroundColor: diaryColor,
        tripId: Number(tripId),
        date,
      },
      todayPhoto: todayPhoto || null,
    };
    setDiary(body);
    navigate(`../trips/${tripId}/diarys/${diaryDate}/decoration`);
  };

  const onCancel = () => {
    if (window.confirm(MESSAGE_LIST.DIARY_CANCEL)) {
      navigate(-1);
    }
  };

  const onLoadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file && file?.size > IMAGE_SIZE_LIMIT_NUMBER) {
      alert(MESSAGE_LIST.PHOTO_LIMIT);
      return;
    }
    if (file) {
      setTodayPhoto(file);
      encodeFileToBase64(file);
    }
  };

  const onDlelete = () => {
    setImageSrc("");
    setTodayPhoto(null);
  };

  return (
    <>
      <Helmet>
        <title>다이어리 | 여행조각</title>
      </Helmet>
      <Container>
        <DateConatiner>
          <h2>{dottedDate}</h2>
        </DateConatiner>
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
            <PositionContainer>
              <BsFillGeoAltFill />
              서울 송파구
            </PositionContainer>
          </ColorAndPositionContainer>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <AutosizedTextarea
                minRows={10}
                fonttype={watch("fontType")}
                placeholder={MESSAGE_LIST.DIARY_INTRO}
                {...field}
                backgroundcolor={DIARY_COLOR_LIST[diaryColor]}
                ref={textAreaRef}
                diarywidth={diaryWidth}
              />
            )}
          />
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
              <p>{todayPhoto?.name}</p>
              <FileSelectionButton
                type="button"
                onClick={() => fileInput.current?.click()}
              >
                파일 선택
              </FileSelectionButton>
            </ImageControlContainer>
            <PreviewContainer>
              {imageSrc && <PreviewImage src={imageSrc} alt="today" />}
              {imageSrc && (
                <DeleteButton type="button" onClick={onDlelete}>
                  <HiTrash />
                </DeleteButton>
              )}
            </PreviewContainer>
          </FileUploadContainer>
          <HandleButtonListContainer>
            <ColoredRoundButton
              type="submit"
              color="mainLight"
              text="일기 꾸미기"
            />
            <ColoredRoundButton
              type="button"
              color="gray400"
              text="취소"
              func={onCancel}
            />
          </HandleButtonListContainer>
        </Form>
      </Container>
    </>
  );
}

export default DiaryManagementPage;
