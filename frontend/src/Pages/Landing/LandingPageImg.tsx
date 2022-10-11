import React, { useRef } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import TripLogo from "../../assets/image/trippiece_logo.png";
import TripLogoWebp from "../../assets/image/trippiece_logo.webp";
import SubCopy from "../../assets/image/tripsubcopy.gif";
import PageOne from "../../assets/image/Page1.png";
import PageOneWebp from "../../assets/image/Page1.webp";
import PageTwo from "../../assets/image/Page2.png";
import PageTwoWebp from "../../assets/image/Page2.webp";
import PageThree from "../../assets/image/Page3.png";
import PageThreeWebp from "../../assets/image/Page3.webp";
import PageFour from "../../assets/image/Page4.png";
import PageFourWebp from "../../assets/image/Page4.webp";
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
        <picture>
          <source srcSet={TripLogoWebp} type="image/webp" />
          <img
            src={TripLogo}
            alt="로고"
            style={{ width: "auto", height: "7vh", marginTop: "30px" }}
            width="230"
            height="66"
          />
        </picture>
        <br />
        <img
          src={SubCopy}
          alt="서브카피"
          width="346"
          height="137"
          style={{
            width: "auto",
            height: "13vh",
            margin: "-7vh 2vh 3vh 2vh",
          }}
        />
        <picture>
          <source srcSet={PageOneWebp} type="image/webp" />
          <PageImg
            src={PageOne}
            style={{ width: "auto", height: "80vh" }}
            alt="랜딩 첫번째 페이지"
            width="869"
            height="2262"
          />
        </picture>
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
        <picture>
          <source srcSet={PageTwoWebp} type="image/webp" />
          <PageImg
            src={PageTwo}
            alt="랜딩 두번째 페이지"
            width="869"
            height="2262"
          />
        </picture>
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
        <picture>
          <source srcSet={PageThreeWebp} type="iamge/webp" />
          <PageImg
            src={PageThree}
            alt="랜딩 세번째 페이지"
            width="869"
            height="2262"
          />
        </picture>
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
        <picture>
          <source srcSet={PageFourWebp} type="image/webp" />
          <PageImg
            src={PageFour}
            style={{ width: "auto", height: "90vh" }}
            alt="랜딩 네번째 페이지"
            width="869"
            height="2262"
          />
        </picture>
        <ToTheTop />
      </DivContainer>
    </Container>
  );
}

export default LandingPageImg;
