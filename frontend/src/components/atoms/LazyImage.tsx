import { memo } from "react";
import useLazyImageObserver from "../../utils/hooks/useLazyImageObserver";

interface LazyImageProps {
  src: string;
}

function Image({ src }: LazyImageProps) {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });

  return <img ref={imageRef} src={imageSrc} alt="#" width="40" />;
}

const LazyImage = memo(Image);
export default LazyImage;
