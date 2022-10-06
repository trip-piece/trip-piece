import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRequestedSticker } from "../../utils/interfaces/diarys.interface";

const Container = styled.button<{
  isRightSide: boolean;
  isBottomSide: boolean;
}>`
  position: absolute;
  z-index: 99;
  top: 10vh;
  left: 0;
  align-items: center;
  padding: 8px;
  max-width: 200%;
  margin-top: 16px;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSizes.s2};
  color: ${(props) => props.theme.colors.white};

  &::before {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    top: -16px;
    left: 32px;
    z-index: 99;
    border-bottom: 16px solid rgba(0, 0, 0, 0.8);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  ${(props) =>
    props.isBottomSide && {
      top: "unset",
      bottom: "10vh",
      "&::before": {
        transform: "rotate(180deg)",
        top: "unset",
        bottom: "-16px",
      },
    }}

  ${(props) =>
    props.isRightSide && {
      left: "-50px",
      "&::before": {
        right: "32px",
        left: "unset",
      },
    }}
`;

interface ToolTipProps {
  pointX: number;
  pointY: number;
  width: number;
  ratio: number;
  sticker: IRequestedSticker;
}

function Tooltip({ pointX, pointY, width, ratio, sticker }: ToolTipProps) {
  const [side, setSide] = useState({
    isRightSide: false,
    isBottomSide: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const isRightSide = pointX * 1.5 > width / 2;
    const isBottomSide = pointY * 1.5 > (width * ratio) / 2;
    setSide({ isRightSide, isBottomSide });
  }, [width]);

  const moveToMarket = () => {
    navigate(`../../market?search=${sticker.tokenName}`);
  };

  return (
    <Container
      isBottomSide={side.isBottomSide}
      isRightSide={side.isRightSide}
      type="button"
      onClick={moveToMarket}
    >
      {sticker.tokenName} 사러가기
    </Container>
  );
}

export default Tooltip;
