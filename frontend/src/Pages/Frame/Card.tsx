import styled from "@emotion/styled";
import { memo, useState } from "react";
// import { InfiniteData, QueryObserverResult } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { frameApis } from "../../utils/apis/frameApis";
import axiosInstance from "../../utils/apis/api";

interface FrameProps {
  frame: {
    frameId: number;
    diaryId: number;
    image: string;
    isScrapped: boolean;
  };

  // refetch: () => Promise<
  //   QueryObserverResult<
  //     InfiniteData<
  //       | {
  //           result: any;
  //           page: any;
  //         }
  //       | undefined
  //     >,
  //     unknown
  //   >
  // >;
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
function Card({ frame }: FrameProps) {
  const [scrap, setScrap] = useState<boolean>(frame.isScrapped);
  // const checkScrap = () => {
  //   if (frame.isScrapped) {
  //     <BsFillBookmarkHeartFill className="scrapicon" />;
  //   } else {
  //     <BsBookmarkHeart className="unscrapicon" />;
  //   }
  // };
  // const postSaveFrame = (frameId: number) => {
  //   const body = {
  //     frameId,
  //   };
  //   axiosInstance.post(frameApis.saveFrame, body);
  // };

  const changeScrap = () => {
    // if (scrap === false) {
    //   // 스크랩 설정하는 api 요청
    // } else {
    //   // 스크랩 해제하는 api 요청
    // }
    setScrap(!scrap);
  };

  const navigate = useNavigate();
  const moveToFrame = () => {
    navigate(`/frames/${frame.frameId}`);
  };

  return (
    <Container>
      <LiContainer>
        {scrap ? (
          <div onClick={changeScrap}>
            <BsFillBookmarkHeartFill className="scrapicon" />{" "}
          </div>
        ) : (
          <div onClick={changeScrap}>
            <BsBookmarkHeart className="unscrapicon" />
          </div>
        )}

        {/* <button type="button" onClick={() => postSaveFrame(frame.frameId)}>
          gdgd
        </button> */}

        <div onClick={moveToFrame}>
          <img src={frame.image} alt="기본이미지" />
        </div>
      </LiContainer>
    </Container>
  );
}

export default Card;
export const MemoCard = memo(Card);
