import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { BiCurrentLocation } from "react-icons/bi";
import { ReactComponent as StarIcon } from "../../assets/svgs/starplus.svg";
import { UserInfoState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import tripApis from "../../utils/apis/tripsApis";
import {
  changeDateFormatToHyphen,
  getLocation,
} from "../../utils/functions/util";
import { ITrip } from "../../utils/interfaces/trips.interface";
import upcomingIcon from "../../assets/image/homeicon.png";
import { REGIONLIST } from "../../utils/constants/constant";
import Card from "./PlaceCard";
import { IPlace } from "../../utils/interfaces/places.interface";
import { placeApis } from "../../utils/apis/placeApis";
import { useNavigate } from "react-router-dom";

const MainBox = styled.div`
  height: 60%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 1.25rem 1.25rem;
  padding: 30px 0 30px 0;
  background: ${(props) => props.theme.colors.mainGradient};
  display: flex;
  justify-content: center;
`;

const SubBox = styled.div`
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray400};
  }
`;

const MiddleTitle = styled.div`
  width: 100%;
  height: 15%;
  padding: 0 1rem 0 1rem;
  font-size: ${(props) => props.theme.fontSizes.h5};
  letter-spacing: -2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InsideLeftBox = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-top-style: solid;
  border-right-style: dashed;
  border-bottom-style: solid;
  border-left-style: solid;
  border-style: solid dashed solid solid;
  border-width: 0.188rem;
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 1.25rem 0 0 1.25rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InsideRightBox = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-style: solid solid solid hidden;
  border-width: 0.188rem;
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 0 1.25rem 1.25rem 0;
  text-align: center;
`;

const InsideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 85%;
  width: 100%;
  color: ${(props) => props.theme.colors.gray300};
`;

const InnerTextTitle = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
`;

const RegionTextTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const InnerTextBody = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s2};
`;

const MiddleTitlePosition = styled.div`
  margin: 1.25rem;
  background-color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

const FooterText = styled.div`
  color: #434343;
  font-size: ${(props) => props.theme.fontSizes.s2};
  letter-spacing: 1px;
`;

const PlaceList = styled.div`
  height: 75%;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  .swiper-wrapper {
    width: 100%;
    height: 100%;
    display: -webkit-inline-box;
  }
`;

const BoxContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 90vh;

  button {
    background-color: ${(props) => props.theme.colors.yellow};
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.dark};
    border-radius: 20px;
    height: 25px;
    width: 70px;
  }
`;

function MainPage() {
  const [upcoming, setUpcoming] = useState<ITrip | any>();
  const [places, setPlaces] = useState<IPlace[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo] = useRecoilState(UserInfoState);
  const today = changeDateFormatToHyphen(new Date());
  const [isProgress, setIsProgress] = useState(0);
  const [locationInfo, setLocationInfo] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const {
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    data: data1,
  } = useQuery<AxiosResponse<ITrip>, AxiosError>(
    [`${userInfo.id}-upcomingTrip`],
    () => axiosInstance.get(tripApis.upcomingTrip(today)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const myLocation = async () => {
    const userLocation: any = await getLocation();
    setLocationInfo(userLocation.location);
    setLat(userLocation.latitude);
    setLng(userLocation.longitude);
  };

  const updateLocation = async () => {
    await myLocation();
    axiosInstance
      .get(placeApis.getLocationPlaces(lat, lng))
      .then((response) => {
        setPlaces(response.data);
      });
  };

  const {
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    data: data2,
  } = useQuery<AxiosResponse<IPlace[]>, AxiosError>(
    [`${userInfo.id}-MyLocationPlaces`],
    async () => {
      const userLocation: any = await getLocation();
      const firstlat = userLocation.latitude;
      const firstlng = userLocation.longitude;
      setLat(firstlat);
      setLng(firstlng);
      setLocationInfo(userLocation.location);
      return axiosInstance.get(placeApis.getLocationPlaces(firstlat, firstlng));
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (data1) {
      setUpcoming(data1);
      if (data1?.data.startDate) {
        setIsProgress(2);
      } else setIsProgress(1);
    }
  }, [data1]);

  useEffect(() => {
    if (data2) {
      setPlaces(data2);
    }
  }, [data2]);

  useEffect(() => {
    setLoading(true);
  }, [data1, data2]);

  const navigate = useNavigate();
  const moveToDiary = () => {
    navigate(`/trips/${upcoming.tripId}/diarys`);
  };
  const moveToPlace = () => {
    navigate("/places/map");
  };
  const moveToTrip = () => {
    navigate("/trips");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <BoxContainer>
        <MainBox>
          {isLoading1 && (
            <div
              style={{
                width: "90%",
                border: "0.188rem solid #F8F8F8",
                borderRadius: "1.25rem",
                textAlign: "center",
                color: "#F8F8F8",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p>Loading...</p>
            </div>
          )}
          {!isLoading1 && !isSuccess1 && (
            <div
              style={{
                width: "90%",
                border: "0.188rem solid #F8F8F8",
                borderRadius: "1.25rem",
                textAlign: "center",
                color: "#F8F8F8",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p>ERROR !</p>
            </div>
          )}
          {isSuccess1 && loading && (
            <>
              <InsideLeftBox>
                <InsideContent>
                  {isProgress === 2 ? (
                    <InnerTextTitle>예정된 여정</InnerTextTitle>
                  ) : (
                    <InnerTextTitle>진행 중인 여정</InnerTextTitle>
                  )}
                  {isProgress === 0 && (
                    <>
                      <StarIcon width="77" height="77" fill="#d4d4d4" />
                      <InnerTextBody>
                        현재 진행중인 여행이 없습니다.
                        <br />
                        여행을 등록해주세요.
                      </InnerTextBody>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={moveToTrip}
                      >
                        등록하기
                      </motion.button>
                    </>
                  )}
                  {isProgress === 1 && (
                    <>
                      <RegionTextTitle>
                        {REGIONLIST[upcoming.regionId]}
                      </RegionTextTitle>
                      <motion.div
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                          opacity: 1,
                          scale: [1, 1, 1, 1],
                          x: [-40, 40, 45, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <img
                          src={upcomingIcon}
                          alt="기본이미지"
                          style={{ width: "85px", height: "85px" }}
                        />
                      </motion.div>
                      <InnerTextTitle>{upcoming.title}</InnerTextTitle>
                      <InnerTextBody>
                        {upcoming.startDate} ~ <br />
                        {upcoming.endDate}
                      </InnerTextBody>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={moveToDiary}
                      >
                        기록하기
                      </motion.button>
                    </>
                  )}
                  {isProgress === 2 && (
                    <>
                      <RegionTextTitle>
                        {REGIONLIST[upcoming.regionId]}
                      </RegionTextTitle>
                      <motion.div
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                          opacity: 1,
                          scale: [1, 1, 1, 1],
                          x: [-40, 40, 45, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <img
                          src={upcomingIcon}
                          alt="기본이미지"
                          style={{ width: "85px", height: "85px" }}
                        />
                      </motion.div>
                      <InnerTextTitle>{upcoming.title}</InnerTextTitle>
                      <InnerTextBody>
                        {upcoming.startDate} ~ <br />
                        {upcoming.endDate}
                      </InnerTextBody>
                      <InnerTextBody
                        style={{
                          color: "#ffb9b9",
                        }}
                      >
                        아직은 기록할 수 없어요 !
                      </InnerTextBody>
                    </>
                  )}
                </InsideContent>
              </InsideLeftBox>
              <InsideRightBox>
                {isProgress === 0 && (
                  <InsideContent>여행이 없을때 티켓</InsideContent>
                )}
                {isProgress === 1 && (
                  <InsideContent>여행이 진행중일때 티켓</InsideContent>
                )}
                {isProgress === 2 && (
                  <InsideContent>예정된 여행이 있을때 티켓</InsideContent>
                )}
              </InsideRightBox>
            </>
          )}
        </MainBox>
        <SubBox>
          <MiddleTitle>
            📍 내 주변에서 NFT 발급받기
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                textAlign: "right",
                fontSize: "11pt",
                color: "#4B659C",
                background: "transparent",
                width: "fit-content",
              }}
              onClick={moveToPlace}
            >
              전체 보기
            </motion.button>
          </MiddleTitle>
          <PlaceList>
            <span
              style={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <p>{locationInfo}</p>
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
            </span>
            {isLoading2 && (
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  border: "1px solid lightgray",
                  marginTop: "7px",
                }}
              >
                <p>Loading...</p>
              </div>
            )}
            {!isLoading2 && !isSuccess2 && (
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  border: "1px solid lightgray",
                  marginTop: "7px",
                }}
              >
                <p>ERROR !</p>
              </div>
            )}
            {isSuccess2 && loading && (
              <Swiper slidesPerView={2.1} spaceBetween={13}>
                {places.length &&
                  places.map((place: IPlace) => (
                    <SwiperSlide>
                      <Card place={place} />
                    </SwiperSlide>
                  ))}
                {places.length === 0 && (
                  <p>근처에 발급 가능한 지역이 없어요.</p>
                )}
              </Swiper>
            )}
          </PlaceList>
        </SubBox>
        <MiddleTitlePosition>
          <FooterText style={{ textAlign: "center" }}>
            Copyright ⓒ2022 여행조각 All rights reserved.
          </FooterText>
        </MiddleTitlePosition>
      </BoxContainer>
    </motion.div>
  );
}

export default MainPage;
