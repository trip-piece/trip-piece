import styled from "@emotion/styled";
import { memo } from "react";
import useLazyImageObserver from "../../utils/hooks/useLazyImageObserver";

interface LazyImageProps {
  src: string;
}

const Img = styled.img`
  width: 100%;
`;

function Image({ src }: LazyImageProps) {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return <Img ref={imageRef} src={imageSrc} alt="#" width="100" />;
}

const LazyImage = memo(Image);
export default LazyImage;
