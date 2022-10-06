import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnotherRouter from "./AnotherRouter";
import { Landing } from "./Pages";
import { getCookie, removeCookie } from "./utils/cookie";

function Router() {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();

    if (getCookie("isLogin")) {
      removeCookie("isLogin");
    }

    e.returnValue = ""; // Chrome에서 동작하도록;
  };
  useEffect(() => {
    (() => {
      window.addEventListener("unload", preventClose);
    })();
    return () => {
      window.removeEventListener("unload", preventClose);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/*" element={<AnotherRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
