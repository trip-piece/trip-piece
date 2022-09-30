import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationOn, MdArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { REGIONLIST } from "../../utils/constants/constant";
import { pixelToRem } from "../../utils/functions/util";
import Container from "../../components/atoms/Container";
import { placeApis } from "../../utils/apis/placeApis";
import { MemoInfiniteList } from "../../components/modules/infinite/ParamsInfiniteList";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";

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
  margin-top: ${pixelToRem(7)};
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

const ToggleGroup = styled.div`
  width: 35%;
  height: 30px;
  background-color: ${(props) => props.theme.colors.gray200};
  text-align: center;
  margin: auto;
  border-radius: 15px;
  margin-bottom: 1.5rem;

  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

const PlaceList = styled.div``;

function PlaceListPage() {
  const [type, setType] = useState(0);
  const { regionId } = useParams();
  const navigate = useNavigate();
  const moveToMyLocation = () => {
    navigate(`/places/list/mylocation`);
  };

  const changeType = (type: number) => {
    setType(type);
  };

  return (
    <>
      <Helmet>
        <title>이벤트 리스트 | 여행조각</title>
      </Helmet>
      <Container hasPadding>
        <TitleGroup>
          <div style={{ width: "100%", textAlign: "left" }}>
            <MdArrowBack size="30" />
          </div>
          <ToggleGroup>
            <button
              type="button"
              className={type === 0 ? "active" : "inactive"}
              onClick={() => changeType(0)}
            >
              스팟
            </button>
            <button
              type="button"
              className={type === 1 ? "active" : "inactive"}
              onClick={() => changeType(1)}
            >
              축제
            </button>
          </ToggleGroup>
          <h1 className="main">{REGIONLIST[Number(regionId)]}</h1>
          <div style={{ width: "100%", textAlign: "right" }}>
            <NearbyMyLocationBtn onClick={moveToMyLocation}>
              <MdLocationOn />
              <p>내 주변</p>
            </NearbyMyLocationBtn>
          </div>
        </TitleGroup>
        {type === 0 && (
          <PlaceList>
            <MemoInfiniteList
              url={placeApis.getPlaces(Number(regionId), type)}
              queryKey={["spotList"]}
              CardComponent={MemoCard}
              SkeletonCardComponent={Skeleton}
              zeroDataText="NFT 스티커 발급 가능한 스팟이 없습니다."
              count={1}
              listName="spotList"
            />
          </PlaceList>
        )}
        {type === 1 && (
          <PlaceList>
            <MemoInfiniteList
              url={placeApis.getPlaces(Number(regionId), type)}
              queryKey={["festivalList"]}
              CardComponent={MemoCard}
              SkeletonCardComponent={Skeleton}
              zeroDataText="NFT 스티커 발급 가능한 축제가 없습니다."
              count={1}
              listName="festivalList"
            />
          </PlaceList>
        )}
      </Container>
    </>
  );
}

export default PlaceListPage;
