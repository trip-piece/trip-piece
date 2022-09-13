import React from "react";
import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import { ReactComponent as StarplusIcon } from "../../assets/starplus.svg";

import { fetchData } from "../../utils/apis/api";

// 으녈이한테 색상 적용하는거 배우기 - 왜 공식문서대로 해도 모르겠음 ?! 짜증남^.^

const MainBox = styled.div`
  height: 80%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 20px 20px;
  padding: 30px 0 30px 0;
  background-color: ${(props) => props.theme.colors.mainGradient};
`;

const Notice = styled.div`
  font-size: ${(props) => props.theme.fontSizes};
`;

const MiddleBoxes = styled.div`
  display: flex;
  justify-content: center;
`;

const InsideLeftBox = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  border-top-style: solid;
  border-right-style: dashed;
  border-bottom-style: solid;
  border-left-style: solid;
  border-style: solid dashed solid solid;
  border-width: 3px;
  border-color: theme.colors.gray300;
  border-radius: 20px 0 0 20px;
  text-align: center;
`;

const InsideRightBox = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  border-style: solid solid solid hidden;
  border-width: 3px;
  border-color: gray300;
  border-radius: 0 20px 20px 0;
  text-align: center;
`;

const InsideContent = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 22%;
  justify-content: center;
  align-items: center;
`;

const MiddleTitle = styled.div`
  margin: 20px;
  text-align: center;
`;

// NFT 알려주는 박스 - 추후 위치 기반으로 돌려서 여러개 자동 생성되도록 함
const GetStickerBox = styled.div`
  width: 201px;
  height: 238px;
  background-color: gray;
  border-radius: 15px;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  margin: 13px;
`;

function MainPage() {
  return (
    <Box>
      <MainBox>
        <MiddleBoxes>
          <InsideLeftBox>
            <InsideContent>
              <p>현재 진행 중인 여행</p>
              <StarplusIcon width={77} height={77} fill="#dd9c4f" />
              <p>현재 진행중인 여행이 없습니다.</p>
              <p>여행을 등록해주세요.</p>
            </InsideContent>
          </InsideLeftBox>
          <InsideRightBox>
            <InsideContent>
              <p>티켓 이미지 들어갈 공간</p>
            </InsideContent>
          </InsideRightBox>
        </MiddleBoxes>
      </MainBox>
      <MiddleTitle>
        <h3>📍 현재 이 곳에서 스티커를 발급받을 수 있어요!</h3>
      </MiddleTitle>
      <GetStickerBox />
    </Box>
  );
}

export default MainPage;
