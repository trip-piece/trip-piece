import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
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
`;

const MiddleTitle = styled.div`
  width: 100%;
  height: 15%;
  padding: 0 1rem 0 1rem;
  font-size: ${(props) => props.theme.fontSizes.h5};
  letter-spacing: -2px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;

  span {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray400};
    margin-left: 10px;
  }
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
  height: 80%;
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
  const userLocation = getLocation();
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

  const {
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    data: data2,
  } = useQuery<AxiosResponse<IPlace[]>, AxiosError>(
    [`${userInfo.id}-MyLocationPlaces`],
    () => axiosInstance.get(placeApis.getLocationPlaces(lat, lng)),
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

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

  const result = [
    {
      placeId: 0,
      image:
        "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
      name: "이이 축제",
      regionId: 1,
    },
    {
      placeId: 1,
      image:
        "https://www.infura-ipfs.io/ipfs/QmRkTWeyoREXuJ9s2vCtPTwvA1iaPjGS29Ei2fKZFZisGL",
      name: "치킨 축제",
      regionId: 12,
    },
    {
      placeId: 2,
      image:
        "https://www.infura-ipfs.io/ipfs/QmXyV1fnFM4EYv42KyfAyzXNX8bu73zpqQndoJBQPbL5pF",
      name: "춘식이 축제",
      regionId: 11,
    },
    {
      placeId: 3,
      image:
        "https://www.infura-ipfs.io/ipfs/QmPPEWSC7qX7rzxE76XJLkNQk2d95r6BSfiPMS3tNs4p1y",
      name: "학생 축제",
      regionId: 5,
    },
    {
      placeId: 4,
      image:
        "https://www.infura-ipfs.io/ipfs/QmQyqcdu8HhnN3tfJtzAduS59GJt4ZNxjSXnTaim72fxCU",
      name: "쭈압이 축제",
      regionId: 8,
    },
  ];

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
                      <button>등록하기</button>
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
            <span style={{ width: "35%" }}>서울시 송파구 어쩌구</span>
            <span
              style={{
                width: "10%",
                textAlign: "right",
                fontSize: "12pt",
                color: "#4B659C",
              }}
            >
              더보기
            </span>
          </MiddleTitle>
          <PlaceList>
            {isLoading2 && (
              <div
                style={{
                  width: "100%",
                  height: "90%",
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
                  height: "90%",
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
                  places.map((place: IPlace, idx: number) => (
                    <SwiperSlide key={idx}>
                      <Card place={place} />
                    </SwiperSlide>
                  ))}
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
