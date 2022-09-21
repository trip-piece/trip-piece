import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      Landing
      <button type="button">키키키</button>
      <NavLink to="trips/123/diarys">button</NavLink>
    </div>
  );
}

export default LandingPage;
