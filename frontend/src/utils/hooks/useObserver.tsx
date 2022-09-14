import { useEffect } from "react";

interface IOberserProps {
  target: any;
  onIntersect: any;
  hasError: boolean;
  error: any;
  root?: any;
  rootMargin?: string;
  threshold?: number;
}

function useObserver({
  target,
  onIntersect,
  hasMore,
  error,
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: IOberserProps) {
  useEffect(() => {
    let observer: any;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }
    console.log(observer);

    console.log("hasMore", hasMore, error);

    if (!hasMore || error) {
      console.log(hasMore, error);
      observer.disconnect();
    }
    return () => observer.disconnect();
  }, [hasMore, target, rootMargin, threshold]);
}

export default useObserver;
