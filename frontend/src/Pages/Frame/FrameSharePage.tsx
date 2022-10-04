import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import RegionButton from "./RegionButton";
import { MemoCard } from "./Card";
import { REGIONLIST } from "../../utils/constants/constant";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import Skeleton from "./Skeleton";
import { frameApis } from "../../utils/apis/frameApis";

const drawerBleeding = 56;

const Root = styled.div`
  height: "90%";
  background: ${(props) => props.theme.colors.gray100};
`;

const StyledBox = styled(Box)`
  background: ${(props) => props.theme.colors.white};

  .CheckAll {
    width: 30%;
    height: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: ${(props) => props.theme.fontSizes.h4};
    border-radius: 25px;
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.mainDark};
  }

  .noCheckAll {
    width: 30%;
    height: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: ${(props) => props.theme.fontSizes.h4};
    border-radius: 25px;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.mainDark};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.mainDark};
  }

  .ButtonList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 10px;
    column-gap: 10px;
    height: 60%;
  }
  .searchPart {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;
    border-top: 1px solid ${(props) => props.theme.colors.gray300};

    .searchButton {
      width: 100%;
      height: 60%;
      text-align: center;
      background: yellow;
      border-radius: 15px;
      color: ${(props) => props.theme.colors.white};
      font-size: ${(props) => props.theme.fontSizes.h4};
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
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function FrameSharePage(props: Props) {
  const regionList: number[] = [];
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [isAll, setIsAll] = useState<boolean>(false);
  // const [scrap, setScrap] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const checkedItemHandler = (code: any, isChecked: any) => {
    if (isChecked) {
      // 체크 추가할때
      setCheckedItems([...checkedItems, code]);
    } else if (!isChecked && checkedItems.find((one: any) => one === code)) {
      // 체크해제할때checkedItem에 있는 경우
      const filter = checkedItems.filter((one: any) => one !== code);
      setCheckedItems([...filter]);
    }
  };
  const onCheckAll = (checked: boolean) => {
    if (checked) {
      const checkedItemArray: ((prevState: never[]) => never[]) | string[] = [];
      REGIONLIST.forEach((region) => checkedItemArray.push(region));
      setCheckedItems(checkedItemArray);
      setIsAll(true);
    } else {
      setIsAll(false);
      setCheckedItems([]);
    }
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
        <MemoInfiniteList
          url={frameApis.getSharedFrames(regionList)}
          queryKey={["frameList"]}
          CardComponent={MemoCard}
          SkeletonCardComponent={Skeleton}
          zeroDataText="공유한 프레임 없슴미다.."
          count={2}
          listName="content"
        />
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
              <label onClick={onCheckAll}>
                <input
                  type="checkbox"
                  name="meal"
                  onChange={(e) => onCheckAll(e.target.checked)}
                  hidden
                />
                {isAll ? (
                  <p className="CheckAll">전제해제</p>
                ) : (
                  <p className="noCheckAll">전체선택</p>
                )}
              </label>
              <div className="ButtonList">
                {REGIONLIST.map((region, idx) => (
                  <RegionButton
                    data={region}
                    checkedItems={checkedItems}
                    checkedItemHandler={checkedItemHandler}
                  />
                ))}
              </div>
              <div className="searchPart">
                <button type="button" className="searchButton">
                  스티커 검색!
                </button>
              </div>
            </StyledBox>
          </SwipeableDrawer>
        </Root>
      </Container>
    </>
  );
}
export default FrameSharePage;
