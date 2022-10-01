import styled from "@emotion/styled";
import { Icon } from "@iconify/react/dist/offline";
import {
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Draggable, { DraggableData } from "react-draggable";
import Checkbox from "@mui/material/Checkbox";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import Container from "../../components/atoms/Container";
import DateContainer from "../../components/atoms/DateContainer";
import { writedDiaryState } from "../../store/diaryAtoms";
import { weatherList } from "../../utils/constants/weatherList";
import useWindowResize from "../../utils/hooks/useWindowResize";
import {
  ISticker,
  IWritedDiary,
  StickerProps,
} from "../../utils/interfaces/diarys.interface";
import { dummyStickerList } from "../../utils/constants/dummyData";
import LazyImage from "../../components/atoms/LazyImage";
import Modal from "./Modal";
import useGetLocation from "../../utils/hooks/useGetLocation";
import MyLocation from "../../components/modules/MyLocation";
import useWriteDiary from "../../utils/hooks/useWriteDiary";
import useDecorateDiary from "../../utils/hooks/useDecorateDiary";
import DiaryContentContainer from "../../components/modules/DiaryContentContainer";
import TodayPhoto from "../../components/atoms/TodayPhoto";
import { NFTContract } from "../../utils/common/NFT_ABI";
import { UserInfoState } from "../../store/atom";

const PositionContainer = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.red};
  }
  color: ${(props) => props.theme.colors.gray400};
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

const StickerImg = styled.img<{ isDragging: boolean }>`
  width: 20%;
  position: absolute;
  cursor: move;
  -webkit-user-drag: none;
  user-select: none;
  opacity: ${(props) => (props.isDragging ? 0.6 : 1.0)};
`;

const TransparentRoundButton = styled.button`
  background-color: transparent;
  height: fit-content;
`;

interface ImageButtonProps {
  onClick: (sticker: StickerProps) => void;
  sticker: StickerProps;
}

function ImageButton({ onClick, sticker }: ImageButtonProps) {
  return (
    <TransparentRoundButton onClick={() => onClick(sticker)}>
      <LazyImage src={sticker.tokenURI} />
    </TransparentRoundButton>
  );
}

const MemoizedImageButton = memo(ImageButton);

interface TokenDetail {
  tokenName: string;
  imagePath: string;
}

interface NFT {
  tokenId: number;
  tokenURI: string;
}

function DiaryDecorationPage() {
  const [isShared, setIsShared] = useState(false);
  const [open, setOpen] = useState(false);
  const [dottedDate, setDottedDate] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [stickerList, setStickerList] = useState<ISticker[]>([]);
  const [diaryBox, setDiaryBox] = useState({ width: 0, height: 0, ratio: 0 });
  const [NFTDetailList, setNFTDetailList] = useState<TokenDetail[]>([]);
  const [NFTList, setNFTList] = useState<NFT[]>([]);

  const { tripId, diaryDate } = useParams();
  const navigate = useNavigate();
  const nodeRef = useRef<HTMLImageElement>(null);
  const diary = useRecoilValue<IWritedDiary<File | null>>(
    writedDiaryState(`${tripId}-${diaryDate}`),
  );
  const diaryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const stickerBoxRef = useRef<HTMLDivElement>(null);
  const size = useWindowResize();
  const userInfo = useRecoilValue(UserInfoState);
  // console.log(userInfo);
  const { mutate: mutateWriting } = useWriteDiary();
  const { mutate: mutateDecoration } = useDecorateDiary();
  const { isFetchingLocation, locationData, refetchLocation } =
    useGetLocation();

  const getNFTList = async () => {
    try {
      // setLoading(true);
      const result = await NFTContract.methods
        .getStickerList("0xBBE5b2e56a1CB9dd1Fa529DfaDDA0ef1c28E9C76")
        .call();
      console.log("여긴왜...", result);
      if (result) {
        setNFTList(result);
        const tokenList: SetStateAction<TokenDetail[]> = [];
        for (let i = 0; i < result.length; i++) {
          fetch(`https://www.infura-ipfs.io/ipfs/${result[i].tokenURI}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const token: TokenDetail = {
                tokenName: String(data[0].name),
                imagePath: String(data[0].image),
              };
              tokenList.push(token);
            });
        }
        setNFTDetailList(tokenList);
        // setLoading(false);
      }
    } catch (err) {
      console.log("Error getSticker : ", err);
    }
  };
  console.log(NFTList, NFTDetailList);
  useEffect(() => {
    if (diaryDate) {
      setDottedDate(diaryDate?.replaceAll("-", "."));
    }
    if (diary?.todayPhoto) {
      import("../../utils/functions/changeFileType").then(async (change) => {
        const base64Image = await change.encodeFileToBase64(diary.todayPhoto);
        setImageSrc(base64Image);
      });
    }
    getNFTList();
  }, []);

  const makeDiaryData = () => {
    const formData = new FormData();
    if (diary.todayPhoto) {
      formData.append("todayPhoto", diary.todayPhoto);
    }
    const _diary = JSON.stringify({
      ...diary.diary,
      location: locationData.location,
      ratio: diaryBox.ratio,
    });
    formData.append("diary", new Blob([_diary], { type: "application/json" }));
    return formData;
  };

  const makeDecorationData = (diaryId: number, frameImage?: File) => {
    const _stickerList = stickerList.map((sticker) => {
      return {
        tokenId: sticker.tokenId,
        x: sticker.originX,
        y: sticker.originY,
      };
    });

    const formData = new FormData();
    const _decoration = JSON.stringify({ diaryId, stickerList: _stickerList });
    formData.append(
      "decoration",
      new Blob([_decoration], { type: "application/json" }),
    );
    if (frameImage) {
      formData.append("frameImage", frameImage);
    }
    return formData;
  };

  useEffect(() => {
    if (diaryRef.current) {
      const wrapperBox = diaryRef.current.getBoundingClientRect();
      setDiaryBox({
        width: wrapperBox.width,
        height: wrapperBox.height,
        ratio: wrapperBox.height / wrapperBox.width,
      });
    }
  }, [size, diaryRef.current, imageSrc, imageRef.current]);

  useEffect(() => {
    setStickerList((prev) =>
      prev.map((sticker) => {
        return {
          ...sticker,
          x: sticker.originX * diaryBox.width,
          y: sticker.originY * diaryBox.height,
        };
      }),
    );
  }, [diaryBox]);

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
        prevState.map((state, idx) => {
          if (idx === index) {
            return {
              ...state,
              isDragging: false,
              originX: data.x,
              originY: data.y,
            };
          }
          return state;
        }),
      );
    },
    [diaryBox],
  );

  const handleDrag = useCallback(
    (data: DraggableData, index: number): any => {
      const imgSize = diaryBox.width * 0.2;
      setStickerList((prevState) =>
        prevState.map((state, idx) => {
          if (idx === index) {
            if (data.x < 0) {
              return {
                ...state,
                isDragging: true,
                x: 0,
                y: data.y,
              };
            }
            if (data.x >= diaryBox.width - imgSize) {
              return {
                ...state,
                isDragging: true,
                x: diaryBox.width - imgSize,
                y: data.y,
              };
            }
            if (data.y < 0) {
              return {
                ...state,
                isDragging: true,
                x: data.x,
                y: 0,
              };
            }
            if (data.y > diaryBox.height - imgSize) {
              return {
                ...state,
                isDragging: true,
                x: data.x,
                y: diaryBox.height - imgSize,
              };
            }
            return {
              ...state,
              isDragging: true,
              x: data.x,
              y: data.y,
            };
          }
          return state;
        }),
      );
    },
    [diaryBox],
  );
  const handleStop = useCallback(
    (data: DraggableData, index: number) => {
      setStickerList((prevState) =>
        prevState.map((state, idx) => {
          if (idx === index) {
            return {
              ...state,
              isDragging: false,
              originX: data.x / diaryBox.width,
              originY: data.y / diaryBox.height,
            };
          }
          return state;
        }),
      );
    },
    [diaryBox],
  );

  const deleteSticker = () => {
    setStickerList([]);
  };

  const handleOpen = () => setOpen(true);

  const postData = (frameImage?: File) => {
    mutateWriting(makeDiaryData(), {
      onSuccess: (data) => {
        mutateDecoration(makeDecorationData(data.data.diaryId, frameImage), {
          onSuccess: () => navigate(`/trips/${tripId}/diarys/${diaryDate}`),
        });
      },
    });
  };

  const onSubmit = () => {
    if (isShared) {
      handleOpen();
    } else postData();
  };

  // FIXME: map key 변경하기
  return (
    <Container>
      {diary && (
        <>
          <DateContainer>
            <h2>{dottedDate} </h2>
            <Icon icon={weatherList[diary.diary.weather]} />
          </DateContainer>
          <div>
            <MyLocation
              {...{ isFetchingLocation, locationData, refetchLocation }}
            />
            {/* <PositionContainer>
              <BsFillGeoAltFill />
              서울 송파구
            </PositionContainer> */}
            <button type="button" onClick={deleteSticker}>
              스티커 삭제하기
            </button>
            <DiaryContentContainer
              diaryWidth={diaryBox.width}
              backgroundColor={diary.diary.backgroundColor}
              ref={diaryRef}
              fontType={diary.diary.fontType}
              active
            >
              {stickerList.map((sticker, index) => (
                <Draggable
                  nodeRef={nodeRef}
                  position={{ x: sticker.x, y: sticker.y }}
                  positionOffset={{ x: "-50%", y: "-50%" }}
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
              {diary.diary.content}
              {imageSrc && (
                <TodayPhoto src={imageSrc} alt="미리보기" ref={imageRef} />
              )}
            </DiaryContentContainer>
          </div>
          <ButtonListContainer>
            <label htmlFor="isShared">
              <Checkbox
                id="isShared"
                name="isShared"
                checked={isShared}
                onChange={() => setIsShared((prev) => !prev)}
              />
              다른 사람에게 프레임 공유하기
            </label>
            <ColoredRoundButton
              text="일기 꾸미기"
              color="mainLight"
              type="button"
              func={onSubmit}
            />
            <ColoredRoundButton
              text="취소"
              color="gray400"
              type="button"
              func={onSubmit}
            />
          </ButtonListContainer>
          <StickerZone ref={stickerRef}>
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
            <Modal
              setOpen={setOpen}
              open={open}
              stickerList={stickerList}
              diaryBox={diaryBox}
              postData={postData}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default DiaryDecorationPage;
