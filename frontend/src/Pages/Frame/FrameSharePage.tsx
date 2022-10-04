import React, { useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { QueryFunctionContext } from "react-query";
import Masonry from "react-masonry-css";
import RegionButton from "./RegionButton";
import { MemoCard } from "./Card";
import { REGIONLIST } from "../../utils/constants/constant";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import Skeleton from "./Skeleton";
import { frameApis } from "../../utils/apis/frameApis";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import axiosInstance from "../../utils/apis/api";
import useObserver from "../../utils/hooks/useObserver";

import "./masonry.css";

const drawerBleeding = 56;

const Root = styled.div`
  height: 90%;
  background: ${(props) => props.theme.colors.gray100};
  margin: auto;
  max-width: 550px;
`;

const DrawerBox = styled(Box)`
  background: ${(props) => props.theme.colors.white};
  position: absolute;
  top: -${drawerBleeding}px;
  border-radius: 20px 20px 0 0;
  visibility: visible;
  right: 0;
  left: 0;
`;

const Label = styled.label<{ active: boolean }>`
  width: 30%;
  height: 10%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.mainDark};
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.mainDark};
  background-color: ${(props) =>
    props.active ? props.theme.colors.mainDark : props.theme.colors.white};
`;

const StyledBox = styled(Box)`
  background: ${(props) => props.theme.colors.white};
  padding: 0 1rem 1rem;
  width: 100%;
  height: 100%;
  overflow: auto;

  .ButtonList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
      text-align: center;
      padding: 0.5rem;
      border-radius: 50px;
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
  position: absolute;
  padding-top: 8;
  padding-left: calc(50% - 15px);
`;

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;

  button {
    padding: 0.5rem 1rem 0.5rem 1rem;
    margin: 0 0 3% 0;
    font-size: ${(props) => props.theme.fontSizes.h6};
    border-radius: 20px;
    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.mainDark};
    font-weight: bold;
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
  window?: () => Window;
}

function FrameSharePage(props: Props) {
  const regionList: number[] = [];
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
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

  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `${frameApis.getSharedFrames(regionList)}&page=${pageParam}`,
    );
    return { result: res?.data, page: pageParam };
  };

  const {
    isLoading,
    data,
    error,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchTripsInformation({
    queryKey: ["frameList"],
    getTargetComponentList,
  });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();
  const bottom = useRef(null);

  const targetList = useMemo(
    () =>
      data &&
      data.pages?.flatMap(
        (page) => page?.result?.content && page?.result.content,
      ),
    [data],
  );

  useObserver({
    target: bottom,
    hasMore: hasNextPage,
    hasError,
    error,
    onIntersect,
  });

  return (
    <>
      <Helmet>
        <title>공유페이지 | 여행조각</title>
      </Helmet>
      <Container>
        <button onClick={toggleDrawer(true)} type="button">
          지역별 조회
        </button>
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {targetList?.map((target, idx) => (
            <MemoCard {...target} key={idx} />
          ))}
          <div ref={bottom} />
        </Masonry>
        <Root>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                // height: `calc(50% - ${drawerBleeding}px)`,
                height: "fit-content",
                overflow: "visible",
                maxWidth: "550px",
                margin: "auto",
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
            <DrawerBox>
              <Puller />
              <Typography sx={{ p: 2, color: "text.secondary" }}>
                지역별 프레임 조회
              </Typography>
            </DrawerBox>
            <StyledBox>
              <Label active={isAll}>
                <input
                  type="checkbox"
                  name="meal"
                  onChange={(e) => onCheckAll(e.target.checked)}
                  hidden
                />
                {isAll ? "전제해제" : "전체선택"}
              </Label>
              <div className="ButtonList">
                {REGIONLIST.map((region, idx) => (
                  <RegionButton
                    data={region}
                    checkedItems={checkedItems}
                    checkedItemHandler={checkedItemHandler}
                    key={idx}
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
