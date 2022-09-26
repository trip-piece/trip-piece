import styled from "@emotion/styled";
import { Icon } from "@iconify/react/dist/offline";
import { useEffect, useRef, useState } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import Container from "../../components/atoms/Container";
import DateContainer from "../../components/atoms/DateContainer";
import { writedDiaryState } from "../../store/diaryAtoms";
import { weatherList } from "../../utils/constants/weatherList";
import { IWritedDiary } from "../../utils/interfaces/diarys.interface";

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
`;

const DiaryContents = styled.div`
  white-space: pre-line;
  min-height: 60vh;
  background-color: red;
`;

const StickerZone = styled.div<{ active: boolean }>`
  position: fixed;
  max-height: ${(props) => (props.active ? "50vh" : "100px")};
  bottom: 0;
  background-color: ${(props) =>
    props.active ? "rgba(40, 43, 68, 0.9)" : "rgba(40, 43, 68, 0.6)"};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  transition: all 0.8s ease-in;
  justify-content: center;

  & > div {
    min-height: 100px;
    overflow-y: ${(props) => (props.active ? "scroll" : "hidden")};
    padding: 2rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  transition: all 0.8s ease-in;
`;

const ButtonListContainer = styled.div`
  margin-bottom: 125px;
`;

function DiaryDecorationPage() {
  const [dottedDate, setDottedDate] = useState<string>("");
  const [toggle, setToggle] = useState(false);
  const { tripId, diaryDate } = useParams();
  const diary = useRecoilValue<IWritedDiary<File | null>>(
    writedDiaryState(`${tripId}-${diaryDate}`),
  );
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (diaryDate) {
      setDottedDate(diaryDate?.replaceAll("-", "."));
    }
  }, []);

  const onClick = () => {
    setToggle(!toggle);
  };
  return (
    <Container>
      {diary && (
        <>
          <DateContainer>
            <h2>{dottedDate} </h2>
            <Icon icon={weatherList[diary.diary.weather]} />
          </DateContainer>
          <div>
            <PositionContainer>
              <BsFillGeoAltFill />
              서울 송파구
            </PositionContainer>
            <DiaryContents>{diary.diary.content}</DiaryContents>
          </div>
          <ButtonListContainer>
            <ColoredRoundButton
              text="일기 꾸미기"
              color="mainLight"
              type="button"
            />
            <ColoredRoundButton text="취소" color="gray400" type="button" />
          </ButtonListContainer>
          <StickerZone ref={ref} active={toggle}>
            <button type="button" onClick={onClick}>
              버튼
            </button>
            <div>
              <div>
                이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈 가을 타 겨울 내릴 눈 일
                년 네 번 또다시 봄 정들었던 내 젊은 날 이제는 안녕 아름답던
                우리의 봄 여름 가을 겨울 (Four seasons with no reason) 비 갠
                뒤에 비애 대신 a happy end 비스듬히 씩 비웃듯 칠색 무늬의 무지개
                철없이 철 지나 철들지 못해 (still) 철부지에 철 그른지 오래
                Marchin' 비발디, 차이코프스키 오늘의 사계를 맞이해 (boy) 마침내,
                마치 넷이 못내 저 하늘만 바라보고서 사계절 잘 지내고 있어,
                goodbye 떠난 사람 또 나타난 사람 머리 위 저세상, 난 떠나 영감의
                amazon 지난 밤의 트라우마 다 묻고 목숨 바쳐 달려올 새 출발 하는
                왕복선 변할래 전보다는 더욱더 좋은 사람 더욱더, 더 나은 사람
                더욱더 아침 이슬을 맞고 (내 안에) 내 안에 분노 과거에 묻고 For
                life, do it away, away, away 울었던 웃었던 소년과 소녀가 그리워
                나 찬란했던 사랑했던 그 시절만 자꾸 기억나 계절은 날이 갈수록
                속절없이 흘러 붉게 물들이고 파랗게 멍들어 가슴을 훑고 언젠가
                다시 올 그날 그때를 위하여 (그대를 위하여) 아름다울 우리의 봄
                여름 가을 겨울 La, la-la-la-la, la-la-la-la, la, la La,
                la-la-la-la, la-la-la-la, la, la La, la-la-la-la, la-la-la-la,
                la, la La, la-la-la-la, la-la-la-la, la, la
              </div>
              <div>
                이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈 (음) 가을 타 겨울 내린 눈
                봄 여름 가을 겨울 (우) 이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈
                가을 타 겨울 내릴 눈 일 년 네 번 또다시 봄 정들었던 내 젊은 날
                이제는 안녕 아름답던 우리의 봄 여름 가을 겨울 (Four seasons with
                no reason) 비 갠 뒤에 비애 대신 a happy end 비스듬히 씩 비웃듯
                칠색 무늬의 무지개 철없이 철 지나 철들지 못해 (still) 철부지에
                철 그른지 오래 Marchin' 비발디, 차이코프스키 오늘의 사계를
                맞이해 (boy) 마침내, 마치 넷이 못내 저 하늘만 바라보고서 사계절
                잘 지내고 있어, goodbye 떠난 사람 또 나타난 사람 머리 위 저세상,
                난 떠나 영감의 amazon 지난 밤의 트라우마 다 묻고 목숨 바쳐
                달려올 새 출발 하는 왕복선 변할래 전보다는 더욱더 좋은 사람
                더욱더, 더 나은 사람 더욱더 아침 이슬을 맞고 (내 안에) 내 안에
                분노 과거에 묻고 For life, do it away, away, away 울었던 웃었던
                소년과 소녀가 그리워 나 찬란했던 사랑했던 그 시절만 자꾸 기억나
                계절은 날이 갈수록 속절없이 흘러 붉게 물들이고 파랗게 멍들어
                가슴을 훑고 언젠가 다시 올 그날 그때를 위하여 (그대를 위하여)
                아름다울 우리의 봄 여름 가을 겨울 La, la-la-la-la, la-la-la-la,
                la, la La, la-la-la-la, la-la-la-la, la, la La, la-la-la-la,
                la-la-la-la, la, la La, la-la-la-la, la-la-la-la, la, la
              </div>
              <div>
                이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈 (음) 가을 타 겨울 내린 눈
                봄 여름 가을 겨울 (우) 이듬해 질 녘 꽃 피는 봄 한여름 밤의 꿈
                가을 타 겨울 내릴 눈 일 년 네 번 또다시 봄 정들었던 내 젊은 날
                이제는 안녕 아름답던 우리의 봄 여름 가을 겨울 (Four seasons with
                no reason) 비 갠 뒤에 비애 대신 a happy end 비스듬히 씩 비웃듯
                칠색 무늬의 무지개 철없이 철 지나 철들지 못해 (still) 철부지에
                철 그른지 오래 Marchin' 비발디, 차이코프스키 오늘의 사계를
                맞이해 (boy) 마침내, 마치 넷이 못내 저 하늘만 바라보고서 사계절
                잘 지내고 있어, goodbye 떠난 사람 또 나타난 사람 머리 위 저세상,
                난 떠나 영감의 amazon 지난 밤의 트라우마 다 묻고 목숨 바쳐
                달려올 새 출발 하는 왕복선 변할래 전보다는 더욱더 좋은 사람
                더욱더, 더 나은 사람 더욱더 아침 이슬을 맞고 (내 안에) 내 안에
                분노 과거에 묻고 For life, do it away, away, away 울었던 웃었던
                소년과 소녀가 그리워 나 찬란했던 사랑했던 그 시절만 자꾸 기억나
                계절은 날이 갈수록 속절없이 흘러 붉게 물들이고 파랗게 멍들어
                가슴을 훑고 언젠가 다시 올 그날 그때를 위하여 (그대를 위하여)
                아름다울 우리의 봄 여름 가을 겨울 La, la-la-la-la, la-la-la-la,
                la, la La, la-la-la-la, la-la-la-la, la, la La, la-la-la-la,
                la-la-la-la, la, la La, la-la-la-la, la-la-la-la, la, la 이듬해
                질 녘 꽃 피는 봄 한여름 밤의 꿈 (음) 가을 타 겨울 내린 눈 봄
                여름 가을 겨울 (우)
              </div>
            </div>
          </StickerZone>
        </>
      )}
    </Container>
  );
}

export default DiaryDecorationPage;
