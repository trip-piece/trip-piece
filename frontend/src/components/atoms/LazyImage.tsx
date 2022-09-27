import styled from "@emotion/styled";
import { memo } from "react";
import { pixelToRem } from "../../utils/functions/util";
import useLazyImageObserver from "../../utils/hooks/useLazyImageObserver";

interface LazyImageProps {
  src: string;
  diaryWidth: number;
}

const Img = styled.img<{ diaryWidth: number }>`
  width: ${(props) => pixelToRem(props.diaryWidth / 8)};
`;

function Image({ src, diaryWidth }: LazyImageProps) {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return (
    <Img
      ref={imageRef}
      src={imageSrc}
      alt="#"
      width="100"
      diaryWidth={diaryWidth}
    />
  );
}

const LazyImage = memo(Image);
export default LazyImage;
