import React, { useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { QueryFunctionContext } from "react-query";
import Masonry from "react-masonry-css";
import { useRecoilState } from "recoil";
import RegionButton from "./RegionButton";
import { MemoCard } from "./Card";
import { REGIONLIST } from "../../utils/constants/constant";
import { frameApis } from "../../utils/apis/frameApis";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import axiosInstance from "../../utils/apis/api";
import useObserver from "../../utils/hooks/useObserver";

import "./masonry.css";
import { frameRegionListState } from "../../store/atom";

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

const RegionalFrameTitle = styled.div`
  padding: 1rem;
  width: 100%;
  text-align: center;
  height: 56px;
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
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  // const [scrap, setScrap] = useState<boolean>(false);
  const [regionList, setRegionList] = useRecoilState(frameRegionListState);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const checkedItemHandler = (code: number, isChecked: boolean) => {
    if (isChecked) {
      setRegionList((prev) => [...prev, code]);
    } else if (!isChecked && regionList.includes(code)) {
      const filter = regionList.filter((one: any) => one !== code);
      if (isAll) setIsAll(false);
      setRegionList([...filter]);
    }
  };

  const onCheckAll = (checked: boolean) => {
    if (checked) {
      const checkedItemArray: ((prevState: never[]) => never[]) | number[] = [];
      REGIONLIST.slice(1).forEach((region, idx) =>
        checkedItemArray.push(idx + 1),
      );
      setRegionList(checkedItemArray);
      setIsAll(true);
    } else {
      setIsAll(false);
      setRegionList([]);
    }
  };

  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      const res = await axiosInstance.get(
        `${frameApis.getSharedFrames(regionList)}&page=${pageParam}`,
      );
      return { result: res?.data, page: pageParam };
    } catch {
      setHasError(true);
      return undefined;
    }
  };

  const { data, error, fetchNextPage, hasNextPage, refetch } =
    useFetchTripsInformation({
      queryKey: ["frameList"],
      getTargetComponentList,
    });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();
  const bottom = useRef(null);

  const targetList = useMemo(
    () =>
      data &&
      data.pages?.flatMap(
        (page) => page?.result?.content?.length && page?.result.content,
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
              <RegionalFrameTitle>지역별 프레임 조회</RegionalFrameTitle>
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
                {REGIONLIST.slice(1).map((region, idx) => (
                  <RegionButton
                    data={region}
                    checkedItems={regionList}
                    checkedItemHandler={checkedItemHandler}
                    index={idx + 1}
                    key={idx}
                  />
                ))}
              </div>
              <div className="searchPart">
                <button
                  type="button"
                  className="searchButton"
                  onClick={() => refetch()}
                >
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
