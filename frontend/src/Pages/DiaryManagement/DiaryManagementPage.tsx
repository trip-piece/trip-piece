import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/offline";
import sunIcon from "@iconify/icons-twemoji/sun";
import cloudIcon from "@iconify/icons-noto-v1/cloud";
import umbrellaWithRainDrops from "@iconify/icons-twemoji/umbrella-with-rain-drops";
import snowmanwithoutsnowIcon from "@iconify/icons-fxemoji/snowmanwithoutsnow";
import { v4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import { BsFillGeoAltFill } from "react-icons/bs";
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import { pixelToRem } from "../../utils/functions/util";

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
  padding: 1rem;
`;

const HandleButtonListContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 10%;
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
  font-family: ${(props) => FONTTYPELIST[Number(props.fonttype)]};
  background-color: ${(props) => props.backgroundcolor};
  width: 100%;
  min-height: 5vh;
  font-size: 24px;
  outline: none;
  border: none;
  padding: 1rem;
  resize: none;
  transition: background-color 0.5s ease-in;
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

interface RouteState {
  state: {
    date: string;
  };
}
interface IDiaryStyle {
  fonttype: string;
  backgroundcolor: string;
}
interface IFormInput {
  fontType: string;
  content: string;
}

const weatherList = [
  sunIcon,
  cloudIcon,
  umbrellaWithRainDrops,
  snowmanwithoutsnowIcon,
];

const tmp =
  "이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈 가을 타 겨울 내릴 눈 일 년 네 번 또다시 봄 정들었던 내 젊은 날 이제는 안녕 아름답던 우리의 봄 여름 가을겨울 (Four seasons with no reason) 비 갠 뒤에 비애 대신 a happy end 비스듬히 씩 비웃듯 칠색 무늬의 무지개 철없이 철 지나 철들지 못해 (still 철부지에 철 그른지 오래 Marchin' 비발디, 차이코프스키 오늘의 사계를 맞이해 (boy) 마침내, 마치 넷이 못내 저 하늘만 바라보고서 사계절 잘 지내고 있어, goodbye 떠난 사람 또 나타난 사람 머리 위 저세상, 난 떠나 영감의 amazon 지난 밤의 트라우마 다 묻고 목숨 바쳐 달려올 새 출발 하는 왕복선 변할래 전보다는 더욱더 좋은 사람 더욱더, 더 나은 사람 더욱더";
function DiaryManagementPage() {
  const [weather, setWeather] = useState(0);
  const [diaryColor, setDiaryColor] = useState(0);
  const [dottedDate, setDottedDate] = useState("");
  const [todayPhoto, setTodayPhoto] = useState<File | string>("");
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const {
    state: { date },
  } = useLocation() as RouteState;
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });
  const navigate = useNavigate();
  useEffect(() => {
    setDottedDate(date.replaceAll("-", "."));
  }, []);

  const onSubmit = () => {};

  const onCancel = () => {
    if (window.confirm("다이어리 작성을 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    const tmpImage = reader.result as string;
    reader.onload = () => {
      setImageSrc(tmpImage);
    };
  };

  const onLoadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file) {
      setTodayPhoto(file);
      encodeFileToBase64(file);
    }
  };
  console.log(imageSrc);

  return (
    <Container>
      <DateConatiner>
        <h2>{dottedDate}</h2>
      </DateConatiner>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DiaryStyleContainer>
          <Select id="font" defaultValue="0" {...register("fontType")}>
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
              {...field}
              backgroundcolor={DIARY_COLOR_LIST[diaryColor]}
            />
          )}
        />
        <FileUploadContainer>
          <label htmlFor="todayPhoto">오늘의 PHOTO</label>
          {imageSrc && <img src={imageSrc} alt="today" width="100%" />}
          <input
            type="file"
            id="todayPhoto"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onLoadFile}
          />
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
  );
}

export default DiaryManagementPage;
