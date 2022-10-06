import React, { useRef } from "react";
import { motion } from "framer-motion";
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
  width: 100%;
  flex-direction: column;
  max-width: 550px;
  min-width: 320px;
`;

const PageImg = styled.img`
  width: auto;
  height: 95vh;
  padding: 0.5%;
  text-align: center;
`;

const ClickButton = styled.button`
  width: 100%;
  height: 10vh;
  position: absolute;
  margin-top: 90vh;
  background: transparent;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const DivContainer = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .clickButton {
    width: 80%;
    height: 7vh;
    position: absolute;
    padding-left: 115px;
    margin-top: 90vh;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h4};
    cursor: pointer;
  }
`;

function LandingPageImg() {
  const pageTwoRef = useRef(null);
  const scrollTosecondElement = () =>
    pageTwoRef.current.scrollIntoView({ behavior: "smooth" });

  const pageThreeRef = useRef(null);
  const scrollTothirdElement = () =>
    pageThreeRef.current.scrollIntoView({ behavior: "smooth" });

  const pageFourRef = useRef(null);
  const scrollTofourthElement = () =>
    pageFourRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <Container>
      <DivContainer>
        <img
          src={TripLogo}
          alt="로고"
          style={{ width: "auto", height: "7vh", marginTop: "30px" }}
        />
        <br />
        <img
          src={SubCopy}
          alt="서브카피"
          style={{
            width: "auto",
            height: "13vh",
            margin: "-7vh 2vh 3vh 2vh",
          }}
        />
        <PageImg src={PageOne} style={{ width: "auto", height: "80vh" }} />
        <motion.div
          className="clickButton"
          animate={{ rotate: [10, -10, 10, -10, 10] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          onClick={scrollTosecondElement}
        >
          ⤺ Click Me!
        </motion.div>
      </DivContainer>
      <DivContainer ref={pageTwoRef}>
        <PageImg src={PageTwo} />
        <motion.div
          className="clickButton"
          animate={{ rotate: [10, -10, 10, -10, 10] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          onClick={scrollTothirdElement}
        >
          ⤺ Click Me!
        </motion.div>
      </DivContainer>
      <DivContainer ref={pageThreeRef}>
        <PageImg src={PageThree} />
        <motion.div
          className="clickButton"
          animate={{ rotate: [10, -10, 10, -10, 10] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          onClick={scrollTofourthElement}
        >
          ⤺ Click Me!
        </motion.div>
      </DivContainer>
      <DivContainer ref={pageFourRef}>
        <PageImg src={PageFour} style={{ width: "auto", height: "90vh" }} />
        <ToTheTop />
      </DivContainer>
    </Container>
  );
}

export default LandingPageImg;
