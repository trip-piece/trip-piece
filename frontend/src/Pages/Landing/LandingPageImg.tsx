import React from "react";
import styled from "@emotion/styled";
import TripLogo from "../../assets/image/trippiece_logo.png";
import SubCopy from "../../assets/image/tripsubcopy.gif";
import PageOne from "../../assets/image/Page1.png";
import PageTwo from "../../assets/image/Page2.png";
import PageThree from "../../assets/image/Page3.png";
import PageFour from "../../assets/image/Page4.png";
import ToTheTop from "./ToTheTopButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const PageImg = styled.img`
  width: auto;
  height: 100vh;
`;

function LandingPageImg() {
  return (
    <Container>
      <div style={{ height: "100vh", textAlign: "center" }}>
        <img
          src={TripLogo}
          alt="로고"
          style={{ width: "auto", height: "6%" }}
        />
        <img
          src={SubCopy}
          alt="서브카피"
          style={{
            width: "auto",
            height: "10%",
            margin: "-3vh 2vh 3vh 2vh",
          }}
        />
        <PageImg src={PageOne} style={{ width: "auto", height: "80%" }} />
      </div>
      <PageImg src={PageTwo} style={{ width: "90%", height: "auto" }} />
      <PageImg src={PageThree} />
      <PageImg src={PageFour} />
      <ToTheTop />
    </Container>
  );
}

export default LandingPageImg;
