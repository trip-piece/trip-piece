import useResizeObserver from "@react-hook/resize-observer";
import { MutableRefObject, useEffect, useLayoutEffect, useState } from "react";

const useSize = (target: MutableRefObject<HTMLElement>) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  console.log(target);
  console.log(target?.current?.clientHeight);
  useLayoutEffect(() => {
    const wrapper = target?.current?.getBoundingClientRect();
    if (wrapper) {
      setSize({ width: wrapper?.width, height: wrapper?.height });
    }
  }, [target]);
  useEffect(() => {
    const wrapper = target?.current?.getBoundingClientRect();
    console.log("useEffct");
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
