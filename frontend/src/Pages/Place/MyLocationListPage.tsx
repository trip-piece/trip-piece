import styled from "@emotion/styled";
import { MdArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { getLocation, pixelToRem } from "../../utils/functions/util";
import Container from "../../components/atoms/Container";
import { placeApis } from "../../utils/apis/placeApis";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";
import { motion } from "framer-motion";
import { BiCurrentLocation } from "react-icons/bi";

const TitleGroup = styled.div`
  width: 100%;
  display: block;
  justify-content: center;
  text-align: center;
  margin-top: 3vh;
  > .main {
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-weight: bold;
    letter-spacing: ${pixelToRem(-1)};
    margin: ${pixelToRem(8)} 0;
  }
`;

const NearbyMyLocationBtn = styled.button`
  position: relative;
  width: ${pixelToRem(100)};
  height: ${pixelToRem(30)};
  border-radius: ${pixelToRem(10)};
  background: ${(props) => props.theme.colors.mainDark};
  margin-top: ${pixelToRem(7)};
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
`;

const ToggleGroup = styled.div`
  width: 35%;
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

const PlaceList = styled.div``;

function MyLocationListPage() {
  const [locationInfo, setLocationInfo] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const myLocation = async () => {
    const userLocation: any = await getLocation();
    setLocationInfo(userLocation.location);
    setLat(userLocation.latitude);
    setLng(userLocation.longitude);
  };

  const updateLocation = async () => {
    await myLocation();
  };

  useEffect(() => {
    myLocation();
  }, []);

  return (
    <>
      <Helmet>
        <title>이벤트 리스트 | 여행조각</title>
      </Helmet>
      <Container hasPadding>
        <TitleGroup>
          <div style={{ width: "100%", textAlign: "left" }}>
            <MdArrowBack size="30" />
          </div>
          <h1 className="main">내 주변</h1>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                color: "#D35B5B",
                background: "transparent",
                width: "7%",
              }}
              onClick={updateLocation}
            >
              <BiCurrentLocation size="18" />
            </motion.button>
            <p>{locationInfo}</p>
          </div>
        </TitleGroup>
        <PlaceList>
          <MemoInfiniteList
            url={placeApis.getLocationPlaces(lat, lng)}
            queryKey={["mylocationList"]}
            CardComponent={MemoCard}
            SkeletonCardComponent={Skeleton}
            zeroDataText="NFT 스티커 발급 가능한 스팟이 없습니다."
            count={1}
            listName="mylocationList"
          />
        </PlaceList>
      </Container>
    </>
  );
}

export default MyLocationListPage;
