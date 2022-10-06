import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../utils/apis/api";
import { frameApis } from "../../utils/apis/frameApis";
import { getNFTImagePath } from "../../utils/functions/getNFTImagePath";
import useSize from "../../utils/hooks/useSize";
import { IRequestedSticker } from "../../utils/interfaces/diarys.interface";
import StickerComponent from "./StickerComponent";

const Container = styled.article`
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

const StickerCard = styled.article<{ height: number }>`
  height: ${(props) => (props.height ? props.height : 500)}px;
  width: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.gray200};
  border: 2px solid ${(props) => props.theme.colors.gray300};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  p {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray700};
    font-weight: bold;
  }
`;

const BackSpaceBtn = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  margin: 0 0 2% 3%;
  color: ${(props) => props.theme.colors.gray800};
`;

const ScrapBtn = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  margin: 2% 0 2% 3%;
  margin-left: auto;
  color: ${(props) => props.theme.colors.red};
`;

const ScrapContainer = styled.div`
  width: auto;
  height: auto;
  padding-top: 0.5rem;
`;

const TagContainer = styled.div`
  width: 90%;
  height: auto;
  padding: 0.5rem;
`;

const HashtagButton = styled.button`
  border-radius: 15px;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  background: ${(props) => props.theme.colors.yellow};
  white-space: nowrap;
  margin: 0 0.5rem 0.5rem 0;
`;

const ScrapAndNameContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

interface IRequestedFrame {
  ratio: number;
  scrapped: boolean;
  stickerList: IRequestedSticker[];
}

function FrameDetailPage() {
  const navigate = useNavigate();
  const { frameId } = useParams();
  const [scrap, setScrap] = useState<boolean>();
  const [NFTStickerList, setNFTStickerList] = useState([]);
  const [stickerNameList, setStickerNameList] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const size = useSize(frameRef);

  const moveToFrameMain = () => {
    navigate(`/frames`);
  };
  useEffect(() => {
    setNFTStickerList([]);
  }, []);

  const getFrameDetail = () =>
    axiosInstance.get(frameApis.getDetailedFrames(Number(frameId)));

  const getNFTList = async (data: IRequestedFrame) => {
    if (!data) return;
    const { stickerList } = data;
    if (!stickerList || stickerList?.length < 1) return;
    const _list = await Promise.all(
      stickerList?.map((sticker: IRequestedSticker) =>
        getNFTImagePath(sticker.tokenId, sticker.tokenURL, { ...sticker }),
      ),
    );
    setNFTStickerList(_list);
  };

  const distinctStickerName = (stickerList: IRequestedSticker[]) => {
    const set = new Set<string>();
    stickerList.forEach((sticker) => set.add(sticker.tokenName));
    setStickerNameList([...set]);
  };

  const { data: frameDetailData } = useQuery<
    AxiosResponse<IRequestedFrame>,
    AxiosError
  >(["diary-detail", `frameId-${frameId}`], () => getFrameDetail(), {
    onSuccess: async (data) => {
      setScrap(data?.data.scrapped);
      await getNFTList(data?.data);
      if (data?.data?.stickerList) distinctStickerName(data?.data?.stickerList);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const postSaveFrame = () => {
    const body = {
      frameId,
    };
    axiosInstance.post(frameApis.saveFrame, body);
  };

  const deleteScrappedFrame = () => {
    const body = {
      frameId,
    };
    axiosInstance.delete(frameApis.deleteScrappedFrame, { data: body });
  };

  const changeScrap = () => {
    if (scrap === false) {
      postSaveFrame();
    } else {
      deleteScrappedFrame();
    }
    setScrap(!scrap);
  };
  const onSelectSticker = (id: number | null) => {
    setSelected(id);
  };
  return (
    <>
      <Helmet>
        <title>마켓 | 프레임 상세 조회</title>
      </Helmet>
      <Container>
        <BackSpaceBtn onClick={moveToFrameMain}>
          <FaArrowLeft size={30} />
        </BackSpaceBtn>
        <StickerCard
          ref={frameRef}
          height={
            frameDetailData?.data?.ratio &&
            size.width * frameDetailData.data.ratio
          }
          onClick={() => onSelectSticker(null)}
        >
          {NFTStickerList?.map((sticker: IRequestedSticker, idx) => (
            <StickerComponent
              sticker={sticker}
              size={size}
              ratio={frameDetailData.data.ratio}
              selectedSticker={selected}
              onSelectSticker={onSelectSticker}
              key={idx}
            />
          ))}
        </StickerCard>
        <ScrapAndNameContainer>
          <TagContainer>
            {stickerNameList?.map((stickerName, idx) => (
              <HashtagButton key={idx}>#{stickerName}</HashtagButton>
            ))}
          </TagContainer>
          <ScrapContainer>
            <ScrapBtn onClick={changeScrap}>
              {scrap ? (
                <BsFillBookmarkHeartFill size={40} />
              ) : (
                <BsBookmarkHeart size={40} />
              )}
            </ScrapBtn>
          </ScrapContainer>
        </ScrapAndNameContainer>
      </Container>
    </>
  );
}

export default FrameDetailPage;
