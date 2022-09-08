import { useEffect } from 'react';

interface IOberserProps {
  target: any;
  onIntersect: any;
  hasMore: boolean;
  isError: any;
  root: any;
  rootMargin: string;
  threshold: number;
}

function useObserver({
  target,
  onIntersect,
  hasMore,
  isError,
  root = null,
  rootMargin = '-200px',
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
    if (!hasMore || isError) observer && observer.disconnect();
    return () => observer && observer.disconnect();
  }, [hasMore, target, rootMargin, threshold]);
}

export default useObserver;
