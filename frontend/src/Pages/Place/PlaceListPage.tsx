import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationOn, MdArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { REGIONLIST } from "../../utils/constants/constant";
import { pixelToRem } from "../../utils/functions/util";
import { placeApis } from "../../utils/apis/placeApis";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";

const Container = styled.div`
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

const TitleGroup = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  margin-top: 3vh;
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

const ToggleGroup = styled.div`
  width: fit-content;
  height: 30px;
  background-color: ${(props) => props.theme.colors.gray200};
  text-align: center;
  margin: auto;
  border-radius: 15px;
  margin-bottom: 1.5rem;

  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

const PlaceList = styled.div`
  width: 100%;
  height: 75%;
  max-width: 550px;
  min-width: 320px;
`;

function PlaceListPage() {
  const [type, setType] = useState(0);
  const { regionId } = useParams();
  const navigate = useNavigate();
  const moveToMyLocation = () => {
    navigate(`/places/list/mylocation`);
  };
  const moveToMap = () => {
    navigate(`/places/map`);
  };

  const changeType = (type: number) => {
    setType(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>이벤트 리스트 | 여행조각</title>
      </Helmet>
      <Container>
        <TitleGroup>
          <div style={{ width: "100%", textAlign: "left" }}>
            <MdArrowBack size="30" onClick={moveToMap} />
          </div>
          <ToggleGroup>
            <button
              type="button"
              className={type === 0 ? "active" : "inactive"}
              onClick={() => changeType(0)}
            >
              스팟
            </button>
            <button
              type="button"
              className={type === 1 ? "active" : "inactive"}
              onClick={() => changeType(1)}
            >
              축제
            </button>
          </ToggleGroup>
          <h1 className="main">{REGIONLIST[Number(regionId)]}</h1>
          <div style={{ width: "100%", textAlign: "right" }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="myLocationBtn"
              onClick={moveToMyLocation}
            >
              <MdLocationOn />
              <p>내 주변</p>
            </motion.button>
          </div>
        </TitleGroup>
        {type === 0 && (
          <PlaceList>
            <MemoInfiniteList
              url={placeApis.getPlaces(Number(regionId), 0)}
              queryKey={["spotList"]}
              CardComponent={MemoCard}
              SkeletonCardComponent={Skeleton}
              zeroDataText="발급 가능한 스팟이 없습니다."
              count={1}
              listName="content"
            />
          </PlaceList>
        )}
        {type === 1 && (
          <PlaceList>
            <MemoInfiniteList
              url={placeApis.getPlaces(Number(regionId), 1)}
              queryKey={["festivalList"]}
              CardComponent={MemoCard}
              SkeletonCardComponent={Skeleton}
              zeroDataText="발급 가능한 축제가 없습니다."
              count={1}
              listName="content"
            />
          </PlaceList>
        )}
      </Container>
    </motion.div>
  );
}

export default PlaceListPage;
