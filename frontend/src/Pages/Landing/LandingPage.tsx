import React from "react";
import styled from "@emotion/styled";
import { HelmetProvider, Helmet } from "react-helmet-async";
import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Text from "./Text";

function LandingPage() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Welcome | 여행조각</title>
        </Helmet>
      </HelmetProvider>

      <Text />
      <LoginButton />
      <LadingButton />
    </>
  );
}

export default LandingPage;
