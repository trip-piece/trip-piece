import styled from "@emotion/styled";
import { Icon } from "@iconify/react/dist/offline";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Draggable, { DraggableCore } from "react-draggable";
import { v4 } from "uuid";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import Container from "../../components/atoms/Container";
import DateContainer from "../../components/atoms/DateContainer";
import TransparentRoundButton from "../../components/atoms/TransparentRoundButton";
import { writedDiaryState } from "../../store/diaryAtoms";
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";
import { weatherList } from "../../utils/constants/weatherList";
import { pixelToRem } from "../../utils/functions/util";
import useWindowResize from "../../utils/hooks/useWindowResize";
import { IWritedDiary } from "../../utils/interfaces/diarys.interface";
import { dummyStickerList } from "../../utils/constants/dummyData";

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
`;

const DiaryContents = styled.div<{
  fontType: number;
  diaryWidth: number;
  backgroundColor: number;
}>`
  white-space: pre-line;
  min-height: 60vh;
  background-color: ${(props) => DIARY_COLOR_LIST[props.backgroundColor]};
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  padding: 1rem
    ${(props) => `${pixelToRem(16 + (props.diaryWidth - 320) / 20)}`};
  resize: none;
  transition: background-color 0.5s ease-in;
  font-size: ${(props) => pixelToRem(props.diaryWidth / 20)};
`;

const StickerZone = styled.div<{ active: boolean }>`
  position: fixed;
  max-height: ${(props) => (props.active ? "50vh" : "120px")};
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
    overflow-y: ${(props) => (props.active ? "scroll" : "hidden")};
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

const ButtonListContainer = styled.div`
  margin-bottom: 125px;
`;

const Picture = styled.picture`
  display: flex;
  justify-content: center;
`;

const DiaryImag = styled.img`
  max-width: 100%;
  width: fit-content;
`;

const DragBox = styled.div`
  position: absolute;
`;

interface ISticker {
  tokenId: number;
  x: number;
  y: number;
}

function DiaryDecorationPage() {
  const [dottedDate, setDottedDate] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [diaryWidth, setDiaryWidth] = useState<number>(320);
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [stickerList, setStickerList] = useState<ISticker[]>([]);
  const { tripId, diaryDate } = useParams();
  const nodeRef = useRef<HTMLDivElement>(null);
  const diary = useRecoilValue<IWritedDiary<File | null>>(
    writedDiaryState(`${tripId}-${diaryDate}`),
  );
  const diaryRef = useRef<HTMLDivElement>(null);
  const size = useWindowResize();

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
    if (diaryDate) {
      setDottedDate(diaryDate?.replaceAll("-", "."));
    }
    if (diary?.todayPhoto) encodeFileToBase64(diary.todayPhoto);
  }, []);

  useEffect(() => {
    if (!diaryRef.current?.offsetWidth) return;
    const tmpSize = diaryRef.current.offsetWidth;
    setDiaryWidth(tmpSize);
  }, [size]);

  const onClick = () => {
    setToggle(!toggle);
  };

  const addSticker = (event) => {
    setStickerList((prev) => [...prev, { tokenId: 0, x: 0, y: 0 }]);
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
            <DiaryContents
              diaryWidth={diaryWidth}
              backgroundColor={diary.diary.backgroundColor}
              ref={diaryRef}
              fontType={diary.diary.fontType}
            >
              <Draggable
                nodeRef={nodeRef}
                defaultPosition={{ x: 0, y: 0 }}
                scale={1}
                // onStart={this.handleStart}
                // onDrag={this.handleDrag}
                // onStop={this.handleStop}
              >
                <div ref={nodeRef}>
                  <img
                    className="handle"
                    src="https://cdn.pixabay.com/photo/2020/12/27/20/25/smile-5865209_1280.png"
                    alt="#"
                    width="40"
                  />
                </div>
              </Draggable>

              {diary.diary.content}
              {imageSrc && (
                <Picture>
                  <DiaryImag
                    src={imageSrc}
                    alt="미리보기"
                    width="550"
                    loading="lazy"
                  />
                </Picture>
              )}
            </DiaryContents>
          </div>
          <ButtonListContainer>
            <ColoredRoundButton
              text="일기 꾸미기"
              color="mainLight"
              type="button"
            />
            <ColoredRoundButton text="취소" color="gray400" type="button" />
          </ButtonListContainer>
          <StickerZone active={toggle}>
            <button type="button" onClick={onClick}>
              보유한 스티커
            </button>
            <div>
              {dummyStickerList.map((sticker) => (
                <TransparentRoundButton type="button" key={v4()}>
                  <img
                    src={sticker.tokenURI}
                    alt="#"
                    width="100"
                    loading="lazy"
                  />
                </TransparentRoundButton>
              ))}
            </div>
          </StickerZone>
        </>
      )}
    </Container>
  );
}

export default DiaryDecorationPage;
