import * as React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GiTicket } from "react-icons/gi";
import { BiTrip, BiShareAlt } from "react-icons/bi";
import {
  MdOutlineLogout,
  MdOutlineMenu,
  MdOutlineClose,
  MdModeEditOutline,
  MdEditCalendar,
  MdOutlineAddReaction,
  MdShoppingCart,
  MdOutlineFestival,
  MdLocationOn,
  MdQrCodeScanner,
} from "react-icons/md";
import { FaBook, FaEthereum } from "react-icons/fa";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { pixelToRem } from "../../utils/functions/util";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

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

const OngoingTripBox = styled.div<{ active?: boolean | null }>`
  margin: ${pixelToRem(15)};
  width: 93%;
  height: 24%;
  box-shadow: 0 0.18rem 0.25rem 0.125rem rgb(0 0 0/10%);
  background: ${(props) => props.theme.colors.white};
  border-radius: ${pixelToRem(20)};
  color: ${(props) =>
    props.active ? props.theme.colors.blue : props.theme.colors.gray400};
  text-align: center;
  > .with-icon {
    display: flex;
    justify-content: space-evenly;
    > .trip-notice {
      display: block;
      margin-top: 9%;
      > .typo {
        > p {
          color: ${(props) =>
            props.active
              ? props.theme.colors.mainDark
              : props.theme.colors.gray400};
        }
      }
      > button {
        width: 50%;
        height: ${pixelToRem(30)};
        border-radius: ${pixelToRem(20)};
        margin-top: ${pixelToRem(10)};
        background: ${(props) =>
          props.active ? props.theme.colors.blue : props.theme.colors.gray400};
        color: ${(props) => props.theme.colors.white};
      }
    }
    > .icon {
      margin-top: 8%;
      width: 20%;
      height: 100%;
      color: ${(props) =>
        props.active ? props.theme.colors.blue : props.theme.colors.gray400};
    }
  }
`;

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
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
    navigate("/place/map");
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <React.Fragment key={"top"}>
        <AppBar position="static" sx={{ bgcolor: "#282B44", boxShadow: 0 }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              여행조각
            </Typography>
            <MdOutlineMenu size="30px" onClick={toggleDrawer(true)} />
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={"top"}
          variant="persistent"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              minWidth: "320px",
              maxWidth: "550px",
              height: "100%",
              margin: "auto",
            },
          }}
        >
          <Box role="presentation" onKeyDown={toggleDrawer(false)}>
            <DrawerHeader>
              <button>
                <MdOutlineLogout />
              </button>
              <button>
                <MdOutlineClose onClick={toggleDrawer(false)} />
              </button>
            </DrawerHeader>
            <TopBackgroundBox>
              <UserInformation>
                <div className="username">
                  아무개
                  <h5>여행자님</h5>
                  <button>
                    <MdModeEditOutline />
                  </button>
                </div>
                <div className="wallet-info">
                  <FaEthereum className="icon" />
                  <p>209509</p>
                </div>
              </UserInformation>
              <TopMainBox>
                <div className="right-line">
                  <BiTrip className="icon" />
                  <p>5번의 여정</p>
                </div>
                <div>
                  <MdEditCalendar className="icon" />
                  <p>16일의 기록</p>
                </div>
              </TopMainBox>
            </TopBackgroundBox>
            <BottomArea>
              <MiddleLongBox>
                <button onClick={moveToSticker}>
                  <MdOutlineAddReaction className="icon" />
                  보유 스티커
                </button>
                <div className="middle-bar" />
                <button onClick={moveToFrame}>
                  <BsFillBookmarkHeartFill className="icon" />
                  찜한 프레임
                </button>
                <div className="middle-bar" />
                <button onClick={moveToTrip}>
                  <FaBook className="icon" />내 다이어리
                </button>
              </MiddleLongBox>
              <MiddleBoxes>
                <button onClick={moveToShare}>
                  <BiShareAlt className="icon" />
                  프레임 공유
                </button>
                <button className="QRButton" onClick={moveToQR}>
                  <MdQrCodeScanner className="QRIcon" />
                </button>
                <button onClick={moveToMarket}>
                  <MdShoppingCart className="icon" /> NFT 마켓
                </button>
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
                    <button onClick={moveToPlace}>보러가기</button>
                  </h5>
                </div>
              </MiddleLongBox>
              <OngoingTripBox>
                <div className="with-icon">
                  <GiTicket className="icon" />
                  <div className="trip-notice">
                    <div className="typo">
                      <p>현재 진행중인 여행이 없어요</p>
                      <p>여행을 등록해 주세요!</p>
                    </div>
                    <button>등록하기</button>
                  </div>
                </div>
              </OngoingTripBox>
            </BottomArea>
          </Box>
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
