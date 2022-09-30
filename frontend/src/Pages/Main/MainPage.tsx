import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { BiCurrentLocation } from "react-icons/bi";
import { BsMoonStarsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
import activeTicket from "../../assets/image/activeTicket.png";
import unactiveTicket from "../../assets/image/unactiveTicket.png";

const MainBox = styled.div`
  height: 55%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 1.25rem 1.25rem;
  padding: 30px 0 30px 0;
  background: ${(props) => props.theme.colors.mainGradient};
  display: flex;
  justify-content: center;
`;

const SubBox = styled.div`
  height: 40%;
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

const RightInsideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: auto;
    height: 80%;
  }

  .ticket {
    width: 70%;
    height: 80%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .ticketMain {
      width: 95%;
      height: 65%;
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      border-radius: 3px;

      .imageBox {
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        border-radius: 3px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          opacity: 0.6;
          border-radius: 3px;
        }
      }

      .textBox {
        width: 90%;
        height: 80%;
        position: absolute;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          color: ${(props) => props.theme.colors.white};
        }

        hr {
          width: 80%;
        }

        .regionName {
          height: 17%;
          font-size: ${(props) => props.theme.fontSizes.h3};
          font-weight: bold;
        }

        .tripTitle {
          display: flex;
          align-items: center;
          height: 40%;
          font-size: ${(props) => props.theme.fontSizes.s1};
        }

        .date {
          height: fit-content;
          text-align: left;
          font-size: ${(props) => props.theme.fontSizes.s2};
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
    .ticketSub {
      width: 90%;
      height: 20%;
      background-color: transparent;
    }
  }
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
  const [upcoming, setUpcoming] = useState<ITrip>();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo] = useRecoilState(UserInfoState);
  const today = changeDateFormatToHyphen(new Date());
  const [isProgress, setIsProgress] = useState(0);
  const [locationInfo, setLocationInfo] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [regionImage, setRegionImage] = useState("");

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
    if (data1?.data) {
      setUpcoming(data1.data);
      setRegionImage(`/image/region/${REGIONLIST[data1?.data.regionId]}.png`);
      if (data1.data.startDate) {
        setIsProgress(2);
      } else setIsProgress(1);
    }
    if (data2?.data) {
      if (data2.data.length) {
        setPlaces(data2.data);
      }
    }
    setLoading(true);
  }, [data1, data2]);

  const navigate = useNavigate();
  const moveToDiary = () => {
    navigate(`/trips/${upcoming?.tripId}/diarys`);
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
                  {isProgress === 1 && upcoming && (
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
                      <InnerTextTitle>{upcoming?.title}</InnerTextTitle>
                      <InnerTextBody>
                        {upcoming?.startDate} ~ <br />
                        {upcoming?.endDate}
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
                  {isProgress === 2 && upcoming && (
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
                      <InnerTextTitle>{upcoming?.title}</InnerTextTitle>
                      <InnerTextBody>
                        {upcoming?.startDate} ~ <br />
                        {upcoming?.endDate}
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
                  <RightInsideContent>
                    <img src={unactiveTicket} alt="기본이미지" />
                    <div className="ticket">
                      <div
                        className="ticketMain"
                        style={{
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <BsMoonStarsFill
                          style={{
                            width: "auto",
                            height: "35%",
                            color: "#737373",
                          }}
                        />
                        <div
                          style={{
                            width: "100%",
                            height: "fit-content",
                            color: "#737373",
                          }}
                        >
                          등록된 티켓이
                          <br />
                          없어요 !
                        </div>
                      </div>
                      <div className="ticketSub" />
                    </div>
                  </RightInsideContent>
                )}
                {isProgress === 1 && upcoming && (
                  <RightInsideContent>
                    <img src={activeTicket} alt="기본이미지" />
                    <div className="ticket">
                      <div className="ticketMain">
                        <div className="imageBox">
                          <img src={regionImage} alt="기본이미지" />
                        </div>
                        <div className="textBox">
                          <p className="regionName">
                            {REGIONLIST[upcoming.regionId]}
                          </p>
                          <hr />
                          <p className="tripTitle">{upcoming?.title}</p>
                          <p className="date">
                            <span>{upcoming?.startDate} ~ </span>
                            <span style={{ textAlign: "right" }}>
                              {upcoming?.endDate}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="ticketSub" />
                    </div>
                  </RightInsideContent>
                )}
                {isProgress === 2 && upcoming && (
                  <RightInsideContent>
                    <img src={unactiveTicket} alt="기본이미지" />
                    <div className="ticket">
                      <div className="ticketMain">
                        <div className="imageBox">
                          <img
                            src={regionImage}
                            alt="기본이미지"
                            style={{ filter: "grayscale(90%)" }}
                          />
                        </div>
                        <div className="textBox">
                          <p className="regionName">
                            {REGIONLIST[upcoming.regionId]}
                          </p>
                          <hr />
                          <p className="tripTitle">{upcoming.title}</p>
                          <p className="date">
                            <span>{upcoming.startDate} ~ </span>
                            <span style={{ textAlign: "right" }}>
                              {upcoming.endDate}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="ticketSub" />
                    </div>
                  </RightInsideContent>
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
              더보기
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
            {isSuccess2 && loading && (
              <>
                {places?.length ? (
                  <Swiper slidesPerView={2.1} spaceBetween={13}>
                    {places.map((place: IPlace) => (
                      <SwiperSlide>
                        <Card place={place} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p>
                    <br />
                    근처에 발급 가능한 지역이 없어요.
                  </p>
                )}
              </>
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
