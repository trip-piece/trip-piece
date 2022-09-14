import { useEffect } from "react";

interface IOberserProps {
  target: any;
  onIntersect: any;
  hasMore: boolean;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!hasMore || error) observer && observer.disconnect();

    return () => observer && observer.disconnect();
  }, [hasMore, target, rootMargin, threshold]);
}

export default useObserver;
