import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { pixelToRem } from "../../utils/functions/util";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  padding: 1rem;
`;

const TitleGroup = styled.div`
  width: 100%;
  display: block;
  justify-content: center;
  text-align: center;
  margin-top: 3vh;
  > .main {
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-weight: bold;
    letter-spacing: ${pixelToRem(-1)};
    margin: ${pixelToRem(8)} 0;
  }
`;

const NearbyMyLocationBtn = styled.button`
  position: relative;
  width: ${pixelToRem(100)};
  height: ${pixelToRem(30)};
  border-radius: ${pixelToRem(10)};
  background: ${(props) => props.theme.colors.mainDark};
  margin: ${pixelToRem(15)} 0 0 75%;
  padding: ${pixelToRem(3)};
  > svg {
    position: absolute;
    margin-right: 2px;
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes.h4};
    top: ${pixelToRem(4)};
    left: ${pixelToRem(10)};
  }
  > p {
    position: absolute;
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.s1};
    font-weight: bold;
    top: ${pixelToRem(5)};
    right: ${pixelToRem(15)};
  }
`;

// 스티커 정보 보여주는 박스 - 기능 연결 시 해당 박스들을 목록으로 보여주면 됨
const StickerInformationBox = styled.div`
  margin: ${pixelToRem(15)};
  > .card-title-info {
    display: flex;
    justify-content: space-between;
    > .location-title {
      display: flex;
      margin-bottom: ${pixelToRem(5)};
      > h3 {
        font-size: ${(props) => props.theme.fontSizes.h3};
        font-weight: bold;
      }
      > p {
        margin-left: ${pixelToRem(5)};
        padding-top: ${pixelToRem(15)};
        font-size: ${(props) => props.theme.fontSizes.s3};
      }
    }
    > .duration {
      padding-top: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.s3};
    }
  }
  > .sticker-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    background: ${(props) => props.theme.colors.gray200};
    border-radius: ${pixelToRem(10)};
    padding: ${pixelToRem(10)};
    > p {
      margin: ${pixelToRem(4)};
      width: 20%;
      font-size: ${(props) => props.theme.fontSizes.h4};
    }
    > .location-info {
      position: absolute;
      font-size: ${(props) => props.theme.fontSizes.s3};
      top: ${pixelToRem(78)};
      left: ${pixelToRem(10)};
    }
  }
`;
const ToggleBox = styled.div`
  margin-top: 5%;
  text-align: center;

  button {
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
  }
`;

export default function StickerMapMain() {
  const [choose, setChoose] = React.useState("0");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setChoose(newAlignment);
  };

  return (
    <Container>
      <ToggleBox>
        <ToggleButtonGroup
          value={choose}
          exclusive
          onChange={handleChange}
          aria-label="event"
        >
          <ToggleButton value="0">축제</ToggleButton>
          <ToggleButton value="1">스팟</ToggleButton>
        </ToggleButtonGroup>
      </ToggleBox>
      <TitleGroup>
        <h1 className="main">제주도</h1>
        <h1>현재 발급 가능한 OO곳의 스팟이 있어요</h1>
        <NearbyMyLocationBtn>
          <MdLocationOn />
          <p>내 주변</p>
        </NearbyMyLocationBtn>
      </TitleGroup>
      {choose && (
        <StickerInformationBox>
          <div className="card-title-info">
            <div className="location-title">
              <h3>한라산</h3>
              <p>1.3km</p>
            </div>
            <div className="duration">12.12 ~ 12.13</div>
          </div>
          <div className="sticker-box">
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <div className="location-info">
              <h5>주소 : 경기도 양평군 용문면</h5>
            </div>
          </div>
        </StickerInformationBox>
      )}
      {!choose && (
        <StickerInformationBox>
          <div className="card-title-info">
            <div className="location-title">
              <h3>멀티캠퍼스 퇴실 축제</h3>
              <p>10km</p>
            </div>
            <div className="duration">12.12 ~ 12.13</div>
          </div>
          <div className="sticker-box">
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <p>스티커</p>
            <div className="location-info">
              <h5>주소 : 서울시 강남구 </h5>
            </div>
          </div>
        </StickerInformationBox>
      )}
    </Container>
  );
}
