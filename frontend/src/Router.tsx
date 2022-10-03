import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnotherRouter from "./AnotherRouter";
import { Landing } from "./Pages";

function Router() {
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
