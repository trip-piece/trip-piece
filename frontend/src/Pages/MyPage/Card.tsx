import React, { memo } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { frameApis } from "../../utils/apis/frameApis";
import img from "../../assets/image/activeTicket.png";

interface IMyScrappedFrameProps {
  // scrapId?: number;
  // diaryId?: number;
  frameId: number;
  image?: string;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray400};
  height: auto;
  width: 100%;
  position: relative;
`;

const LinkContainer = styled(Link)`
  height: 100%;
  display: block;
`;

const ScrapImg = styled.img`
  width: 100%;
  height: auto;
`;

function ScrappedFrameCard({ frameId, image }: IMyScrappedFrameProps) {
  const imgUrl: string = `https://trippiece607.s3.ap-northeast-2.amazonaws.com/${image}`;
  return (
    <Container>
      <LinkContainer to={frameApis.getDetailedFrames(frameId)}>
        <ScrapImg src={imgUrl} />
      </LinkContainer>
    </Container>
  );
}

export default ScrappedFrameCard;
export const MemoCard = memo(ScrappedFrameCard);
