import styled from "@emotion/styled";
import { MdLocationOn } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { pixelToRem } from "../../utils/functions/util";
import { REGIONLIST } from "../../utils/constants/constant";
import puzzle from "../../assets/image/puzzle.png";

const Container = styled.div`
  max-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  width: inherit;
  height: 90vh;
`;

const TitleGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  height: 25%;

  > .main {
    font-size: ${(props) => props.theme.fontSizes.h2};
    font-weight: bold;
    letter-spacing: ${pixelToRem(-1)};
    margin: ${pixelToRem(8)} 0;
  }

  .myLocationBtn {
    position: relative;
    width: ${pixelToRem(100)};
    height: ${pixelToRem(30)};
    border-radius: ${pixelToRem(10)};
    background: ${(props) => props.theme.colors.mainDark};
    margin: ${pixelToRem(10)} 0;
    padding: ${pixelToRem(3)};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.s1};
    font-weight: bold;
    > svg {
      position: absolute;
      margin-right: 2px;
      color: ${(props) => props.theme.colors.red};
      font-size: ${(props) => props.theme.fontSizes.h4};
      top: ${pixelToRem(4)};
      left: ${pixelToRem(10)};
    }
    > p {
      position: absolute;
      color: ${(props) => props.theme.colors.gray0};
      font-size: ${(props) => props.theme.fontSizes.s1};
      font-weight: bold;
      top: ${pixelToRem(5)};
      right: ${pixelToRem(15)};
    }
  }
`;

const KoreaMap = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: center;
  position: relative;
  margin-top: 20px;

  img {
    z-index: 998;
    position: absolute;
    width: auto;
    height: 90%;
    top: 0;
  }

  .buttonDiv {
    z-index: 999;
    width: 100%;
    height: 97%;
    position: absolute;
    top: 0;
  }

  div {
    z-index: 999;
    width: 100%;
    height: 19%;

    button {
      background-color: transparent;
      width: 25%;
      height: 100%;
    }
  }
`;

function PlaceMainPage() {
  const navigate = useNavigate();
  const moveToList = (regionId: number) => {
    navigate(`/places/${regionId}/list`);
  };
  const moveToMyLocation = () => {
    navigate(`/places/list/mylocation`);
  };
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>이벤트 지역 | 여행조각</title>
      </Helmet>
      <Container>
        <TitleGroup>
          <h1 className="main">발급 가능 지역</h1>
          <h1>관심 지역의 스티커를 확인하세요</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={moveToMyLocation}
            className="myLocationBtn"
          >
            <MdLocationOn />
            <p>내 주변</p>
          </motion.button>
        </TitleGroup>
        <KoreaMap>
          <img src={puzzle} alt="기본이미지" />
          <div className="buttonDiv">
            <div className="first">
              {REGIONLIST.map(
                (region, idx) =>
                  idx > 0 &&
                  idx <= 4 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={idx}
                      type="button"
                      onClick={() => moveToList(idx)}
                    />
                  ),
              )}
            </div>
            <div className="second">
              {REGIONLIST.map(
                (region, idx) =>
                  idx > 4 &&
                  idx <= 8 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={idx}
                      type="button"
                      onClick={() => moveToList(idx)}
                    />
                  ),
              )}
            </div>
            <div className="third">
              {REGIONLIST.map(
                (region, idx) =>
                  idx > 8 &&
                  idx <= 12 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={idx}
                      type="button"
                      onClick={() => moveToList(idx)}
                    />
                  ),
              )}
            </div>
            <div className="fourth">
              {REGIONLIST.map(
                (region, idx) =>
                  idx > 12 &&
                  idx <= 16 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={idx}
                      type="button"
                      onClick={() => moveToList(idx)}
                    />
                  ),
              )}
            </div>
            <div className="fifth">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => moveToList(17)}
              />
            </div>
          </div>
        </KoreaMap>
      </Container>
    </motion.div>
  );
}

export default PlaceMainPage;
