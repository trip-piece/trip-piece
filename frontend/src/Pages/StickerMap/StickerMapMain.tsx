import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import {
  changeDateFormatToHyphen,
  pixelToRem,
} from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import axiosInstance from "../../utils/apis/api";

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
  margin: ${pixelToRem(20)} 0 0 0;
  padding: ${pixelToRem(3)};
  color: ${(props) => props.theme.colors.gray0};
  font-size: ${(props) => props.theme.fontSizes.s1};
  font-weight: bold;
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

const KoreaMap = styled.div`
  margin: ${pixelToRem(10)} 0;
  width: 100%;
  height: 100%;
  > .colorized {
    width: 100%;
    height: 90vh;
    background: ${(props) => props.theme.colors.red};
  }
  > svg {
    margin: ${pixelToRem(10)};
  }
`;

function StickerMapMain() {
  return (
    <Container>
      <TitleGroup>
        <h1 className="main">발급 지역 확인</h1>
        <h1>관심 지역의 스티커를 확인하세요</h1>
        <NearbyMyLocationBtn>
          <MdLocationOn />
          <p>내 주변</p>
        </NearbyMyLocationBtn>
      </TitleGroup>
      <KoreaMap>
        <div className="colorized">여기에 지도가 들어감</div>
      </KoreaMap>
    </Container>
  );
}

export default StickerMapMain;
