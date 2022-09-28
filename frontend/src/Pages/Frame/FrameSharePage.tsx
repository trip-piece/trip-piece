// import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";

// import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
// import { frameApis } from "../../utils/apis/frameApis";
// import { FrameCard } from "./Card";
// import Skeleton from "./Skeleton";

import * as React from "react";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Card from "./Card";
import { REGIONLIST } from "../../utils/constants/constant";

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const Root = styled.div`
  height: "100%";
  background: ${(props) => props.theme.colors.gray100};
`;

const StyledBox = styled(Box)`
  background: ${(props) => props.theme.colors.white};
`;
const ButtonList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  .RegionButton {
    font-size: 5vw;
    width: 100%;
    height: 3rem;
    border-radius: 25px;
    border: 2px solid ${(props) => props.theme.colors.mainDark};
    background: ${(props) => props.theme.colors.white};

    &.active {
      color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors.mainDark};
    }
  }
`;

const Puller = styled(Box)`
  width: 30;
  height: 6;
  background: ${(props) => props.theme.colors.gray300};
  border-radius: 3px;
  position: "absolute";
  paddingtop: 8;
  paddingleft: "calc(50% - 15px)";
`;

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;

  button {
    width: 30%;
    height: 2rem;
    border-radius: 20px;
  }

  .CardList {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: auto;
      overflow-y: hidden;
    }

    .swiper-wrapper {
      width: 100%;
      height: auto;
    }
  }
`;

function FrameSharePage(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [btnActive, setBtnActive] = React.useState("");
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const result = [
    {
      frameId: 0,
      image:
        "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
      isScrapped: true,
      diaryId: 123.5,
    },
    {
      frameId: 1,
      image:
        "https://www.infura-ipfs.io/ipfs/QmRkTWeyoREXuJ9s2vCtPTwvA1iaPjGS29Ei2fKZFZisGL",
      isScrapped: true,
      diaryId: 123.5,
    },
    {
      frameId: 2,
      image:
        "https://www.infura-ipfs.io/ipfs/QmXyV1fnFM4EYv42KyfAyzXNX8bu73zpqQndoJBQPbL5pF",
      isScrapped: true,
      diaryId: 123.5,
    },
    {
      frameId: 3,
      image:
        "https://www.infura-ipfs.io/ipfs/QmPPEWSC7qX7rzxE76XJLkNQk2d95r6BSfiPMS3tNs4p1y",
      isScrapped: true,
      diaryId: 123.5,
    },
    {
      frameId: 4,
      image:
        "https://www.infura-ipfs.io/ipfs/QmQyqcdu8HhnN3tfJtzAduS59GJt4ZNxjSXnTaim72fxCU",
      isScrapped: false,
      diaryId: 123.5,
    },
  ];
  // const regionList = useState<[] | undefined>([0]);

  const toggleActive = (e) => {
    setBtnActive(() => {
      return e.target.value;
    });
  };
  return (
    <>
      <Helmet>
        <title>공유페이지 | 여행조각</title>
      </Helmet>
      <Container>
        <button onClick={toggleDrawer(true)} type="button">
          지역별 조회
        </button>
        {/* <MemoInfiniteList
          url={frameApis.getSharedFrames(regionList, 2)}
          queryKey={["frameList"]}
          CardComponent={FrameCard}
          SkeletonCardComponent={Skeleton}
          zeroDataText="공유한 프레임 없슴미다.."
          count={2}
          listName="frameList"
        /> */}
        <div className="CardList">
          <Swiper slidesPerView={4} spaceBetween={13}>
            {result.length &&
              result.map((frame) => (
                <SwiperSlide>
                  <Card frame={frame} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Root>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: "visible",
              },
            }}
          />

          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}
            >
              <Puller />
              <Typography sx={{ p: 2, color: "text.secondary" }}>
                지역별 프레임 조회
              </Typography>
            </StyledBox>
            <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: "100%",
                overflow: "auto",
              }}
            >
              <ButtonList>
                {REGIONLIST.map((region, idx) => (
                  <button
                    type="button"
                    value={idx}
                    className={`RegionButton${
                      idx == btnActive ? " active" : ""
                    }`}
                    onClick={toggleActive}
                  >
                    {region}
                  </button>
                ))}
              </ButtonList>
            </StyledBox>
          </SwipeableDrawer>
        </Root>
      </Container>
    </>
  );
}
export default FrameSharePage;
