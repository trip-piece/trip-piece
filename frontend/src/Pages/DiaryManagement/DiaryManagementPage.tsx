import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/offline";
import sunIcon from "@iconify/icons-twemoji/sun";
import cloudIcon from "@iconify/icons-noto-v1/cloud";
import umbrellaWithRainDrops from "@iconify/icons-twemoji/umbrella-with-rain-drops";
import snowmanwithoutsnowIcon from "@iconify/icons-fxemoji/snowmanwithoutsnow";
import { v4 } from "uuid";
import { FONTTYPELIST } from "../../utils/constants/constant";

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

const Select = styled.select`
  display: block;
  border: none;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
`;

const DiaryStyleContainer = styled.div`
  background-color: ${(props) => props.theme.colors.mainLight};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const DiaryArea = styled.textarea<{ fontType: number }>`
  display: block;
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  width: 100%;
  height: 80%;
  font-size: 50%;
  outline: none;
  border: none;
  padding: 1rem;
`;

const WeatherButton = styled.button<{ active: boolean }>`
  color: black;
  background-color: transparent;
  font-size: 33px;
  display: block;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.active ? 1.0 : 0.2)};
`;

const ButtonListContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface RouteState {
  state: {
    date: string;
  };
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
  const [fontType, setFontType] = useState(0);
  const [weather, setWeather] = useState(0);
  const [dottedDate, setDottedDate] = useState("");
  const {
    state: { date },
  } = useLocation() as RouteState;

  useEffect(() => {
    setDottedDate(date.replaceAll("-", "."));
  }, []);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    setFontType(Number(value));
  };

  const handleWeather = (idx: number) => {
    setWeather(idx);
  };

  return (
    <Container>
      <DateConatiner>
        <h2>{dottedDate}</h2>
      </DateConatiner>
      <DiaryStyleContainer>
        <Select name="font" id="font" onChange={onChange}>
          {FONTTYPELIST.map((font, idx) => (
            <option key={font} value={idx}>
              {font}
            </option>
          ))}
        </Select>
        <ButtonListContainer>
          <>
            {weatherList.map((weatherType, idx) => (
              <WeatherButton
                type="button"
                key={v4()}
                active={idx === weather}
                onClick={() => handleWeather(idx)}
              >
                <Icon icon={weatherType} />
              </WeatherButton>
            ))}
          </>
        </ButtonListContainer>
      </DiaryStyleContainer>
      <DiaryArea defaultValue={tmp} fontType={fontType} />
    </Container>
  );
}

export default DiaryManagementPage;
