import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { TiStarFullOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { ReactComponent as StarIcon } from "../../assets/svgs/starplus.svg";
import { UserInfoState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import tripApis from "../../utils/apis/tripsApis";
import { changeDateFormatToHyphen } from "../../utils/functions/util";
import { ITrip } from "../../utils/interfaces/trips.interface";
import upcomingIcon from "../../assets/image/homeicon.png";
import { REGIONLIST } from "../../utils/constants/constant";

const MainBox = styled.div`
  height: 60%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 1.25rem 1.25rem;
  padding: 30px 0 30px 0;
  background: ${(props) => props.theme.colors.mainGradient};
  display: flex;
  justify-content: center;
`;

const MiddleTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h5};
  letter-spacing: -2px;

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
  text-align: left;
`;

const FooterText = styled.div`
  color: #434343;
  font-size: ${(props) => props.theme.fontSizes.s2};
  letter-spacing: 1px;
`;

// NFT 알려주는 박스 - 추후 위치 기반으로 돌려서 여러개 자동 생성되도록 함
const GetStickerBox = styled.div`
  width: 201px;
  height: 170px;
  background-color: ${(props) => props.theme.colors.gray200};
  border-radius: 0.938rem;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  margin: 0.938rem;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo] = useRecoilState(UserInfoState);
  const today = changeDateFormatToHyphen(new Date());
  const [isProgress, setIsProgress] = useState(0);

  const { isLoading, isSuccess, data } = useQuery<
    AxiosResponse<ITrip>,
    AxiosError
  >(
    [`${userInfo.id}-upcomingTrip`],
    () => axiosInstance.get(tripApis.upcomingTrip(today)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (data) {
      setUpcoming(data);
      if (data?.data.startDate) {
        setIsProgress(2);
      } else setIsProgress(1);
      setLoading(true);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <BoxContainer>
        <MainBox>
          {isLoading && (
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
          {!isLoading && !isSuccess && (
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
          {isSuccess && loading && (
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
                <InsideContent>티켓 이미지 들어갈 공간</InsideContent>
              </InsideRightBox>
            </>
          )}
        </MainBox>
        <MiddleTitlePosition>
          <MiddleTitle>
            📍 내 주변에서 NFT 발급받기
            <span>서울시 송파구 어쩌구</span>
          </MiddleTitle>
        </MiddleTitlePosition>
        <GetStickerBox />
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
