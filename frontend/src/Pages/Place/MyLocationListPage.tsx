import styled from "@emotion/styled";
import { MdArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getLocation, pixelToRem } from "../../utils/functions/util";
import { placeApis } from "../../utils/apis/placeApis";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";
import spinner from "../../assets/image/spinner.gif";

const Container = styled.div`
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

const TitleGroup = styled.div`
  width: 100%;
  display: flex;
  height: 25%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 3vh;
  > .main {
    font-size: ${(props) => props.theme.fontSizes.h2};
    font-weight: bold;
    letter-spacing: ${pixelToRem(-1)};
    margin: ${pixelToRem(8)} 0;
  }
`;

const PlaceList = styled.div`
  width: 100%;
  height: 75%;
`;

function MyLocationListPage() {
  const [locationInfo, setLocationInfo] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(true);

  const myLocation = async () => {
    const userLocation: any = await getLocation();
    setLocationInfo(userLocation.location);
    setLat(userLocation.latitude);
    setLng(userLocation.longitude);
    setLoading(false);
  };

  const updateLocation = async () => {
    setLoading(true);
    await myLocation();
    setLoading(false);
  };

  useEffect(() => {
    myLocation();
  }, []);

  const navigate = useNavigate();
  const moveToMap = () => {
    navigate(`/places/map`);
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
          {loading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={spinner}
                style={{ width: "50%", height: "auto", textAlign: "center" }}
              />
            </div>
          )}{" "}
          {!loading && (
            <MemoInfiniteList
              url={placeApis.getLocationPlaces(lat, lng)}
              queryKey={["mylocationList"]}
              CardComponent={MemoCard}
              SkeletonCardComponent={Skeleton}
              zeroDataText="발급 가능한 위치가 없습니다."
              count={1}
              listName="content"
            />
          )}
        </PlaceList>
      </Container>
    </motion.div>
  );
}

export default MyLocationListPage;
