import { debounce } from "@mui/material";
import { useEffect, useState } from "react";

interface IWindowSize {
  width: number | undefined;
}

function useWindowResize() {
  const [windowSize, setWindowRezise] = useState<IWindowSize>({
    width: undefined,
  });

  const handleResize = debounce(() => {
    setWindowRezise({ width: window.innerWidth });
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default useWindowResize;
