import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { GiTicket } from "react-icons/gi";
import { BiTrip, BiShareAlt } from "react-icons/bi";
import { TbMenu2 } from "react-icons/tb";
import {
  MdOutlineLogout,
  MdOutlineClose,
  MdEditCalendar,
  MdOutlineAddReaction,
  MdShoppingCart,
  MdOutlineFestival,
  MdLocationOn,
  MdQrCodeScanner,
  MdLuggage,
} from "react-icons/md";
import { FaBook, FaEthereum } from "react-icons/fa";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { useRecoilState, useResetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import React, { useLayoutEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  changeDateFormatToHyphen,
  pixelToRem,
} from "../../utils/functions/util";
import { isLoggedinState, IUserInfo, UserInfoState } from "../../store/atom";
import trippieceLogo from "../../assets/image/trippiece_logo.png";
// import { ReactComponent as EtherIcon } from "../../assets/svgs/etherIcon.svg";
import axiosInstance from "../../utils/apis/api";
import { ITrip } from "../../utils/interfaces/trips.interface";
import tripApis from "../../utils/apis/tripsApis";
import { REGIONLIST } from "../../utils/constants/constant";
import { CodeProps } from "../../utils/interfaces/qrscan.inteface";
import NestedModal from "../MyPage/Modal";
import { getCookie, removeCookie, setCookie } from "../../utils/cookie";
import userApis, { Idata, IUserData } from "../../utils/apis/userApis";
import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => props.theme.colors.mainDark};
  padding: ${pixelToRem(10)} ${pixelToRem(10)} 0 0;
  > button {
    font-size: ${(props) => props.theme.fontSizes.h2};
    background: none;
    color: ${(props) => props.theme.colors.gray300};
  }
`;

const TopBackgroundBox = styled.div`
  box-shadow: 0 0.18rem 0.25rem 0.125rem rgb(0 0 0/10%);
  border-radius: 0 0 1.25rem 1.25rem;
  padding: ${pixelToRem(20)};
  background: ${(props) => props.theme.colors.mainGradient};
  display: block;
  justify-content: center;
  position: relative;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h2};
  padding: 0 ${pixelToRem(7)} 0 0;
  margin-top: auto;

  margin-top: auto;
  text-align: justify;
  display: flex;
`;

const NameSuffix = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h6};

  display: inline-block;
  white-space: nowrap;
  margin-top: auto;
  font-weight: bold;
`;
const IdCode = styled.div`
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  margin-top: auto;
  font-weight: bold;
  width: auto;
`;

const UserInformation = styled.div`
  display: block;
  > .username {
    display: flex;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;
    > h5 {
      font-size: ${(props) => props.theme.fontSizes.h5};
      font-weight: normal;
      margin: 0.3rem 0 0 0.3rem;
    }
    > button {
      margin-top: 0.3rem;
      font-size: ${(props) => props.theme.fontSizes.h5};
      color: ${(props) => props.theme.colors.white};
      background: none;
    }
  }
  > .wallet-info {
    display: flex;
    font-size: ${(props) => props.theme.fontSizes.h5};
    > .icon {
      margin: 0.2rem;
      color: ${(props) => props.theme.colors.yellow};
    }
    > p {
      margin-top: 0.2rem;
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const TopMainBox = styled.div`
  display: flex;
  justify-content: center;
  margin: ${pixelToRem(20)} 0 0 0;
  width: 100%;
  height: ${pixelToRem(110)};
  border-radius: ${pixelToRem(10)};
  background: ${(props) => props.theme.colors.white};
  padding: ${pixelToRem(20)} 0;
  > div {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    > p {
      // font-size: ${(props) => props.theme.fontSizes.s1};
      font-weight: bold;
      background: ${(props) => props.theme.colors.white};
    }
    > .icon {
      margin-bottom: ${pixelToRem(10)};
      width: 100%;
      height: 50%;
      color: ${(props) => props.theme.colors.blue};
    }
  }
  > .right-line {
    border-right-style: solid;
    border-color: ${(props) => props.theme.colors.gray200};
    border-width: ${pixelToRem(1.5)};
  }
`;

const BottomArea = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  height: ${pixelToRem(600)};
`;

const MiddleLongBox = styled.div`
  margin: ${pixelToRem(15)};
  display: flex;
  justify-content: space-evenly;
  width: 93%;
  height: 20%;
  box-shadow: 0 0.18rem 0.25rem 0.125rem rgb(0 0 0/10%);
  background: ${(props) => props.theme.colors.white};
  border-radius: ${pixelToRem(20)};
  padding: ${pixelToRem(10)} 0;
  > button {
    width: 30%;
    height: 100%;
    background: ${(props) => props.theme.colors.white};
    // font-size: ${(props) => props.theme.fontSizes.s2};
    border-radius: ${pixelToRem(20)};
    text-align: center;
    > .icon {
      margin-bottom: ${pixelToRem(10)};
      width: 100%;
      height: 40%;
      color: ${(props) => props.theme.colors.blue};
    }
  }
  > .middle-bar {
    height: 100%;
    border-right-style: solid;
    border-color: ${(props) => props.theme.colors.gray200};
    border-width: ${pixelToRem(1.5)};
  }
  > .check-spot {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    > h5 {
      margin-top: 12%;
      text-align: center;
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      > button {
        width: 40%;
        margin-left: 80%;
        // font-size: ${(props) => props.theme.fontSizes.s2};
        font-weight: bold;
        color: ${(props) => props.theme.colors.blue};
        background: none;
      }
    }
    > .icon-group {
      width: 25%;
      display: flex;
      justify-content: start;
      > .icon-red {
        position: relative;
        top: ${pixelToRem(-20)};
        left: ${pixelToRem(-20)};
        width: 50%;
        height: 100%;
        color: ${(props) => props.theme.colors.red};
      }
      > .spot-icon {
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.colors.blue};
      }
    }
  }
`;

const MiddleBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 93%;
  height: 20%;
  margin: ${pixelToRem(15)};
  > button {
    width: 30%;
    height: 100%;
    background: ${(props) => props.theme.colors.white};
    // font-size: ${(props) => props.theme.fontSizes.s2};
    border-radius: ${pixelToRem(20)};
    text-align: center;
    box-shadow: 0 0.25rem 0.25rem 0.125rem rgb(0 0 0/10%);
    > .icon {
      margin-bottom: ${pixelToRem(10)};
      width: 100%;
      height: 35%;
      color: ${(props) => props.theme.colors.blue};
    }
  }

  .QRButton {
    background-color: transparent;
    box-shadow: 0 0 0 0 rgb(0 0 0/10%);

    .QRIcon {
      width: 100%;
      height: 100%;
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const OngoingTripBox = styled.div`
  margin: ${pixelToRem(15)};
  width: 93%;
  height: 24%;
  box-shadow: 0 0.18rem 0.25rem 0.125rem rgb(0 0 0/10%);
  background: ${(props) => props.theme.colors.white};
  border-radius: ${pixelToRem(20)};
  color: ${(props) => props.theme.colors.gray400};
  text-align: center;
  > .with-icon {
    display: flex;
    justify-content: space-evenly;
    > .trip-notice {
      display: block;
      margin-top: 9%;
      > .typo {
        > p {
          color: ${(props) => props.theme.colors.gray400};
        }
      }
      > button {
        width: 50%;
        height: ${pixelToRem(30)};
        border-radius: ${pixelToRem(20)};
        margin-top: ${pixelToRem(10)};
        background: ${(props) => props.theme.colors.gray400};
        color: ${(props) => props.theme.colors.white};
      }
    }
    > .icon {
      margin-top: 8%;
      width: 20%;
      height: 100%;
      color: ${(props) => props.theme.colors.gray400};
    }
  }

  .isTrip {
    color: ${(props) => props.theme.colors.blue};
    display: flex;
    justify-content: space-evenly;
    > .trip-notice {
      display: block;
      margin-top: 9%;
      > .typo {
        > p {
          color: ${(props) => props.theme.colors.dark};
          font-weight: bold;
        }
      }
      > button {
        width: 50%;
        height: ${pixelToRem(30)};
        border-radius: ${pixelToRem(20)};
        margin-top: ${pixelToRem(10)};
        background: ${(props) => props.theme.colors.yellow};
        color: ${(props) => props.theme.colors.dark};
      }
    }
    > .icon {
      margin-top: 8%;
      width: 20%;
      height: 100%;
      color: ${(props) => props.theme.colors.dark};
    }
  }
`;

const BoxContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;

const ModifyNickNameButton = styled.div`
  background-color: transparent;
  height: ${pixelToRem(15)};
  width: auto;
`;

function IdCodeComponent({ id }: CodeProps) {
  const num: string = id.toString();
  let code: ReactJSXElement;
  if (num.length === 1) {
    code = <IdCode>#000{id}</IdCode>;
  } else if (num.length === 2) {
    code = <IdCode>#00{id}</IdCode>;
  } else if (num.length === 3) {
    code = <IdCode>#0{id}</IdCode>;
  } else code = <IdCode>#{id}</IdCode>;

  return code;
}

const injected = new InjectedConnector({ supportedChainIds: [5] });

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const [upcoming, setUpcoming] = useState<ITrip>();
  const [loading, setLoading] = useState<boolean>(false);
  const today = changeDateFormatToHyphen(new Date());
  const [isProgress, setIsProgress] = useState(0);
  const { account, active, deactivate, activate } = useWeb3React();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedinState);
  const mounted = useRef(false);

  console.log(`nav active ${active}`);
  const getUserInfo = () => {
    axiosInstance
      .get(userApis.getUser)
      .then((response: { data: IUserData }) => {
        console.log(response.data);

        console.log(userInfo);

        setUserInfo((prev) => ({
          ...prev,
          address: response.data.walletAddress,
          nickname: response.data.nickname,
          balance: "0.0",
          isLoggedIn: true,
          id: response.data.userId,
          tripCount: response.data.tripCount,
          diaryCount: response.data.diaryCount,
        }));
        return response.data.walletAddress;
      })
      .then((address) => {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
        );
        if (address) {
          web3.eth
            .getBalance(address)
            .then((balance) => {
              return web3.utils.fromWei(balance, "ether");
            })
            .then((eth) => {
              setUserInfo((prev) => ({ ...prev, balance: eth }));

              //setCookie("isLogin", "true");
              //moveToMain();
            });
        }
      });
  };
  const toggleDrawer =
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") {
        return;
      }

      setOpen(open);
    };

  const navigate = useNavigate();
  const moveToMarket = () => {
    navigate("/market");
    setOpen(false);
  };

  const moveToSticker = () => {
    navigate("/user/stickers");
    setOpen(false);
  };

  const moveToFrame = () => {
    navigate("/user/scraps");
    setOpen(false);
  };

  const moveToPlace = () => {
    navigate("/places/map");
    setOpen(false);
  };

  const moveToQR = () => {
    navigate("/qrscan");
    setOpen(false);
  };

  const moveToShare = () => {
    navigate("/frames");
    setOpen(false);
  };

  const moveToTrip = () => {
    navigate("/trips");
    setOpen(false);
  };

  const moveToMain = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    if (getCookie("accessToken")) {
      removeCookie("isLogin");
      navigate("/");
      console.log("로그아웃");
    } else if (!active) {
      if (getCookie("accessToken")) {
        console.log("메타마스크 연결 재시도");

        activate(injected, async () => {});
      }
    }
  }, [active]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log(account);
      if (getCookie("accessToken")) {
        getUserInfo();
      }
    }
  }, [account]);

  useLayoutEffect(() => {
    console.log(userInfo.tripCount);
    if (getCookie("accessToken")) {
      getUserInfo();
    }
  }, [userInfo]);

  const logout = () => {
    if (active) {
      console.log("로그아웃하기  ~ ");

      deactivate();
      // setUserInfo(userLogout);
    }
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setIsLoggedIn(false);
  };
  const moveToMyTrip = (tripId: number) => {
    navigate(`/trips/${tripId}/diarys`);
    setOpen(false);
  };

  const {
    isLoading: isLoading,
    isSuccess: isSuccess,
    data: data,
  } = useQuery<AxiosResponse<ITrip>, AxiosError>(
    [`${userInfo.id}-upcomingTrip`],
    () => axiosInstance.get(tripApis.upcomingTrip(today)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (data?.data) {
      setUpcoming(data.data);
      if (data.data.startDate) {
        setIsProgress(2);
      } else setIsProgress(1);
    }
    setLoading(true);
  }, [data]);

  return (
    <BoxContainer sx={{ flexGrow: 1 }} className="boxContainer">
      <React.Fragment key="top">
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282B44",
            boxShadow: 0,
            height: "10vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div style={{ width: "33%" }} />
          <div style={{ width: "33%" }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={moveToMain}
              style={{ background: "transparent" }}
            >
              <img
                src={trippieceLogo}
                alt="기본이미지"
                style={{ width: "100%" }}
              />
            </motion.button>
          </div>
          <div style={{ width: "33%", textAlign: "right" }}>
            <TbMenu2
              size="30%"
              style={{ paddingRight: "10px" }}
              onClick={toggleDrawer(true)}
            />
          </div>
        </AppBar>
        <Drawer
          anchor="top"
          variant="persistent"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              minWidth: "320px",
              maxWidth: "550px",
              height: "100vh",
              width: "100%",
              margin: "auto",
            },
          }}
        >
          <Box role="presentation" onKeyDown={toggleDrawer(false)}>
            <DrawerHeader>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={logout}
              >
                <MdOutlineLogout />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
              >
                <MdOutlineClose onClick={toggleDrawer(false)} />
              </motion.button>
            </DrawerHeader>
            <TopBackgroundBox>
              <UserInformation>
                <div className="username">
                  <Name>{userInfo.nickname}</Name>
                  <NameSuffix>여행자님</NameSuffix>&nbsp;
                  <IdCodeComponent id={userInfo.id} />
                  <ModifyNickNameButton>
                    <NestedModal />
                  </ModifyNickNameButton>
                </div>
                <div className="wallet-info">
                  <FaEthereum className="icon" />
                  <p>{userInfo.balance}</p>
                </div>
              </UserInformation>
              <TopMainBox>
                <div className="right-line">
                  <BiTrip className="icon" />
                  <p>{userInfo.tripCount}번의 여정</p>
                </div>
                <div>
                  <MdEditCalendar className="icon" />
                  <p>{userInfo.diaryCount}일의 기록</p>
                </div>
              </TopMainBox>
            </TopBackgroundBox>
            <BottomArea>
              <MiddleLongBox>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={moveToSticker}
                >
                  <MdOutlineAddReaction className="icon" />
                  보유 스티커
                </motion.button>
                <div className="middle-bar" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={moveToFrame}
                >
                  <BsFillBookmarkHeartFill className="icon" />
                  찜한 프레임
                </motion.button>
                <div className="middle-bar" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={moveToTrip}
                >
                  <FaBook className="icon" />내 다이어리
                </motion.button>
              </MiddleLongBox>
              <MiddleBoxes>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={moveToShare}
                >
                  <BiShareAlt className="icon" />
                  프레임 공유
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="QRButton"
                  onClick={moveToQR}
                >
                  <MdQrCodeScanner className="QRIcon" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={moveToMarket}
                >
                  <MdShoppingCart className="icon" /> NFT 마켓
                </motion.button>
              </MiddleBoxes>
              <MiddleLongBox onClick={moveToPlace}>
                <div className="check-spot">
                  <div className="icon-group">
                    <MdOutlineFestival className="spot-icon" />
                    <MdLocationOn className="icon-red" />
                  </div>
                  <h5>
                    현재 발급할 수 있는 축제/스팟
                    <br />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={moveToPlace}
                    >
                      보러가기
                    </motion.button>
                  </h5>
                </div>
              </MiddleLongBox>
              <OngoingTripBox>
                {!upcoming ? (
                  <div className="with-icon">
                    <GiTicket className="icon" />
                    <div className="trip-notice">
                      <div className="typo">
                        <p>현재 진행중인 여행이 없어요</p>
                        <p>여행을 등록해 주세요!</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={moveToTrip}
                      >
                        등록하기
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="isTrip">
                    <MdLuggage className="icon" />
                    <div className="trip-notice">
                      <div className="typo">
                        <p>
                          {REGIONLIST[upcoming.regionId]} ({upcoming.startDate}{" "}
                          - {upcoming.endDate})
                        </p>
                        <p>[{upcoming.title}]</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => moveToMyTrip(upcoming.tripId)}
                      >
                        기록하기
                      </motion.button>
                    </div>
                  </div>
                )}
              </OngoingTripBox>
            </BottomArea>
          </Box>
        </Drawer>
      </React.Fragment>
    </BoxContainer>
  );
}
