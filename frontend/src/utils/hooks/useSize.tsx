import useResizeObserver from "@react-hook/resize-observer";
import { MutableRefObject, useLayoutEffect, useState } from "react";

const useSize = (target: MutableRefObject<HTMLElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const wrapper = target?.current?.getBoundingClientRect();
    if (wrapper) {
      setSize({ width: wrapper?.width, height: wrapper?.height });
    }
  }, [target]);

  useResizeObserver(target, (entry) => {
    setSize({
      width: entry?.contentRect.width,
      height: entry?.contentRect.height,
    });
  });
  return size;
};

export default useSize;
