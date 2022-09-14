import React from "react";
import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import { pixelToRem } from "../../utils/functions/util";

import { ReactComponent as StarIcon } from "../../assets/starplus.svg";
import { fetchData } from "../../utils/apis/api";

const MainBox = styled.div`
  height: 80%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 20px 20px;
  padding: 30px 0 30px 0;
  background: ${(props) => props.theme.colors.mainGradient};
`;

const MiddleTitle = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h3};
  letter-spacing: -2px;
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
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 20px 0 0 20px;
  text-align: center;
`;

const InsideRightBox = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  border-style: solid solid solid hidden;
  border-width: 3px;
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 0 20px 20px 0;
  text-align: center;
`;

const InsideContent = styled.div`
  position: absolute;
  top: 20%;
  left: 15%;
  right: 15%;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.gray300};
`;

const InnerTextTitle = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.s1};
`;

const InnerTextBody = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s3};
`;

const IconPosition = styled.div`
  margin: 3.125rem 0;
`;

const MiddleTitlePosition = styled.div`
  margin: 20px;
  text-align: center;
`;

const FooterText = styled.div`
  color: #434343;
  font-size: ${(props) => props.theme.fontSizes.s2};
  letter-spacing: 1px;
`;

// NFT 알려주는 박스 - 추후 위치 기반으로 돌려서 여러개 자동 생성되도록 함
const GetStickerBox = styled.div`
  width: 201px;
  height: 238px;
  background-color: ${(props) => props.theme.colors.gray200};
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
              <InnerTextTitle>현재 진행 중인 여행</InnerTextTitle>
              <IconPosition>
                <StarIcon width="77" height="77" fill="#d4d4d4" />
              </IconPosition>
              <InnerTextBody>
                현재 진행중인 여행이 없습니다. <br />
                여행을 등록해주세요.
              </InnerTextBody>
            </InsideContent>
          </InsideLeftBox>
          <InsideRightBox>
            <InsideContent>티켓 이미지 들어갈 공간</InsideContent>
          </InsideRightBox>
        </MiddleBoxes>
      </MainBox>
      <MiddleTitlePosition>
        <MiddleTitle>
          📍 현재 이 곳에서 스티커를 발급받을 수 있어요!
        </MiddleTitle>
      </MiddleTitlePosition>
      <GetStickerBox />
      <MiddleTitlePosition>
        <FooterText>Copyright ⓒ2022 여행조각 All rights reserved.</FooterText>
      </MiddleTitlePosition>
    </Box>
  );
}

export default MainPage;
