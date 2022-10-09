import styled from "@emotion/styled";
import { memo, useEffect, useState } from "react";
// import { InfiniteData, QueryObserverResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { BsFillBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { frameApis } from "../../utils/apis/frameApis";
import axiosInstance from "../../utils/apis/api";

interface FrameProps {
  frameId: number;
  diaryId: number;
  frameImage: string;
  scrapped: boolean;
}

const Container = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: transparent;
`;

const LiContainer = styled.div`
  height: 100%;
  display: block;
  position: relative;
  background-color: transparent;

  .scrapicon {
    height: auto;
    width: 20%;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  .unscrapicon {
    height: auto;
    width: 20%;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: contain;
  }
`;
function Card({ frameId, diaryId, frameImage, scrapped }: FrameProps) {
  const [scrap, setScrap] = useState<boolean>(scrapped);
  // const checkScrap = () => {
  //   if (frame.isScrapped) {
  //     <BsFillBookmarkHeartFill className="scrapicon" />;
  //   } else {
  //     <BsBookmarkHeart className="unscrapicon" />;
  //   }
  // };
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
      // 스크랩 설정하는 api 요청
      postSaveFrame();
    } else {
      // 스크랩 해제하는 api 요청
      deleteScrappedFrame();
    }
    setScrap(!scrap);
  };

  // useEffect(() => {
  //   console.log(frame);
  //   setScrap(frame.scrapped);
  // }, [frame]);

  const navigate = useNavigate();

  const moveToFrame = () => {
    navigate(`/frames/${frameId}`);
  };

  return (
    <Container>
      {frameImage && (
        <LiContainer>
          {scrap ? (
            <BsFillBookmarkHeartFill
              className="scrapicon"
              onClick={changeScrap}
            />
          ) : (
            <BsBookmarkHeart className="unscrapicon" onClick={changeScrap} />
          )}

          {/* <button type="button" onClick={() => postSaveFrame(frame.frameId)}>
          gdgd
        </button> */}

          <button type="button" onClick={() => moveToFrame()}>
            <img src={frameImage} alt="기본이미지" />
          </button>
        </LiContainer>
      )}
    </Container>
  );
}

export default Card;
export const MemoCard = memo(Card);
