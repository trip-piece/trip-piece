import styled from "@emotion/styled";
import { Icon } from "@iconify/react/dist/offline";
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Draggable, { DraggableCore } from "react-draggable";
import { v4 } from "uuid";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import Container from "../../components/atoms/Container";
import DateContainer from "../../components/atoms/DateContainer";
import { writedDiaryState } from "../../store/diaryAtoms";
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";
import { weatherList } from "../../utils/constants/weatherList";
import { pixelToRem } from "../../utils/functions/util";
import useWindowResize from "../../utils/hooks/useWindowResize";
import { IWritedDiary } from "../../utils/interfaces/diarys.interface";
import { dummyStickerList } from "../../utils/constants/dummyData";
import LazyImage from "../../components/atoms/LazyImage";

interface DiaryContentsProps {
  fontType: number;
  diaryWidth: number;
  backgroundColor: number;
}

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
`;

const DiaryContents = styled.div<DiaryContentsProps>`
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

const ButtonListContainer = styled.div`
  margin-bottom: 125px;
`;

const Picture = styled.picture`
  display: flex;
  justify-content: center;
`;

const DiaryImg = styled.img<{ diaryWidth: number }>`
  width: ${(props) => pixelToRem(props.diaryWidth / 8)};
`;

// const DragBox = styled.div`
//   position: absolute;
// `;

const TransparentRoundButton = styled.button`
  background-color: transparent;
  height: fit-content;
`;

interface StickerProps {
  tokenId: number;
  tokenURI: string;
}
interface ISticker extends StickerProps {
  x: number;
  y: number;
}

interface ImageButtonProps {
  onClick: (sticker: StickerProps) => void;
  sticker: StickerProps;
  diaryWidth: number;
}

function ImageButton({ onClick, sticker, diaryWidth }: ImageButtonProps) {
  return (
    <TransparentRoundButton onClick={() => onClick(sticker)}>
      <LazyImage src={sticker.tokenURI} key={v4()} diaryWidth={diaryWidth} />
    </TransparentRoundButton>
  );
}

const MemoizedImageButton = memo(ImageButton);

function DiaryDecorationPage() {
  const [dottedDate, setDottedDate] = useState<string>("");
  const [diaryWidth, setDiaryWidth] = useState<number>(320);
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [stickerList, setStickerList] = useState<ISticker[]>([]);
  const { tripId, diaryDate } = useParams();
  const nodeRef = useRef<HTMLDivElement>(null);
  const diary = useRecoilValue<IWritedDiary<File | null>>(
    writedDiaryState(`${tripId}-${diaryDate}`),
  );
  const diaryRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerBoxRef = useRef<HTMLDivElement>(null);
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
    if (stickerRef.current.style.maxHeight === "50vh") {
      stickerRef.current.style.maxHeight = "120px";
      stickerRef.current.style.backgroundColor = "rgba(40, 43, 68, 0.6)";
      stickerBoxRef.current.style.overflowY = "hidden";
    } else {
      stickerRef.current.style.maxHeight = "50vh";
      stickerRef.current.style.backgroundColor = "rgba(40, 43, 68, 0.9)";
      stickerBoxRef.current.style.overflowY = "scroll";
    }
  };
  const addSticker = useCallback((sticker: StickerProps) => {
    setStickerList((prev) => [
      ...prev,
      { tokenId: sticker.tokenId, tokenURI: sticker.tokenURI, x: 0, y: 0 },
    ]);
  }, []);
  console.log(stickerList);
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
              {stickerList.map((sticker) => (
                <Draggable
                  nodeRef={nodeRef}
                  defaultPosition={{ x: 0, y: 0 }}
                  scale={1}

                  // onStart={this.handleStart}
                  // onDrag={this.handleDrag}
                  // onStop={this.handleStop}
                >
                  <div ref={nodeRef} style={{ position: "absolute" }}>
                    <DiaryImg
                      src={sticker.tokenURI}
                      alt="#"
                      width="100"
                      diaryWidth={diaryWidth}
                    />
                  </div>
                </Draggable>
              ))}

              {diary.diary.content}
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
          <StickerZone ref={stickerRef}>
            <button type="button" onClick={onClick}>
              보유한 스티커
            </button>
            <div ref={stickerBoxRef}>
              {dummyStickerList.map((sticker) => (
                <MemoizedImageButton
                  onClick={addSticker}
                  sticker={sticker}
                  diaryWidth={diaryWidth}
                />
              ))}
            </div>
          </StickerZone>
        </>
      )}
    </Container>
  );
}

export default DiaryDecorationPage;
