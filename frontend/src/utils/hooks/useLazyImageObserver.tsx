import { useEffect, useRef, useState } from "react";

interface UseLazyImageObserverProps {
  src: string;
}

function useLazyImageObserver({ src }: UseLazyImageObserverProps) {
  const [imageSrc, setImageSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imageRef.current && !imageSrc) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            if (imageRef.current) observer.unobserve(imageRef.current);
          }
        },
        { threshold: [0.25] },
      );
      observer.observe(imageRef.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [imageRef, imageSrc, src]);
  return { imageSrc, imageRef };
}

export default useLazyImageObserver;
