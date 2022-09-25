import { memo, React } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { frameApis } from "../../utils/apis/frameApis";
interface IStickerCardProps {
  stickerId: number;
}

interface IMyScrappedFrameProps {
  scrapId: number;
  diaryId: number;
  frameId: number;
  image: string;
  //  “scrapId” : int,
  //   “diaryId” : int,
  //   “image” : string
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray400};
  height: 200px;
  width: 100%;
  position: relative;
`;

const LinkContainer = styled(Link)`
  height: 100%;
  display: block;
`;

//const Sticker = styled.div``;

function ScrappedFrameCard({
  scrapId,
  diaryId,
  image,
  frameId,
}: IMyScrappedFrameProps) {
  return (
    <Container>
      <LinkContainer to={frameApis.getDetailedFrames(frameId)}>
        프레임프레임
      </LinkContainer>
    </Container>
  );
}

export default ScrappedFrameCard;
export const MemoCard = memo(ScrappedFrameCard);
