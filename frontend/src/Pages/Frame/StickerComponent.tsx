import styled from "@emotion/styled";
import { memo, MouseEvent } from "react";
import { IUseSize } from "../../utils/interfaces/common.interface";
import { IRequestedSticker } from "../../utils/interfaces/diarys.interface";
import Tooltip from "./Tooltip";

const Container = styled.div<{ x: number; y: number }>`
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  position: absolute;
  width: 20%;
  height: fit-content;
`;

const Img = styled.img`
  width: 100%;
  position: relative;
  cursor: pointer;
`;

interface IStickerComponentProps {
  sticker: IRequestedSticker;
  size: IUseSize;
  ratio: number;
  selectedSticker: number;
  onSelectSticker: (id: number | null) => void;
}

function StickerComponent({
  sticker,
  size,
  ratio,
  selectedSticker,
  onSelectSticker,
}: IStickerComponentProps) {
  const isSelected = selectedSticker === sticker.id;
  const onClick = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onSelectSticker(isSelected ? null : sticker.id);
  };
  return (
    <Container x={sticker.x * size.width} y={sticker.y * size.width * ratio}>
      {isSelected && (
        <Tooltip
          pointX={sticker.x * size.width}
          pointY={sticker.y * size.width * ratio}
          width={size.width}
          ratio={ratio}
          sticker={sticker}
        />
      )}
      <Img
        alt={sticker.tokenName}
        src={sticker.imagePath}
        key={sticker.y + sticker.x}
        onClick={onClick}
      />
    </Container>
  );
}

export default memo(StickerComponent);
