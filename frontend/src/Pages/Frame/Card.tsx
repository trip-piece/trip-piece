import styled from "@emotion/styled";
import { memo } from "react";
// import { InfiniteData, QueryObserverResult } from "react-query";
import { Link } from "react-router-dom";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
 import { frameApis } from "../../utils/apis/frameApis";

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

const LinkContainer = styled(Link)`
  height: 100%;
  display: block;
  position: relative;
  background-color: transparent;

  .scrapicon {
    height: auto;
    width: 15%;
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
  return (
    <Container>
      <LinkContainer to={`${frame.frameId}`}>
        {/* <div onClick={frameApis.save}>
          {frame.isScrapped ? (
            <BsFillBookmarkHeartFill className="scrapicon" />
          ) : (
            <BsBookmarkHeart className="unscrapicon" />
          )}
        </div> */}

        <img src={frame.image} alt="기본이미지" />
      </LinkContainer>
    </Container>
  );
}
export default Card;
export const MemoCard = memo(Card);
