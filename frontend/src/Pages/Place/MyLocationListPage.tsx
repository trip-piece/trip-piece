import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { REGIONLIST } from "../../utils/constants/constant";
import { pixelToRem } from "../../utils/functions/util";
import Container from "../../components/atoms/Container";
import { IPlace } from "../../utils/interfaces/places.interface";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../utils/apis/api";
import { placeApis } from "../../utils/apis/placeApis";
import { useQuery } from "react-query";

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
  padding: ${pixelToRem(3)};
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

const PlaceList = styled.div``;

function MyLocationListPage() {
  const [festivals, setFestivals] = useState<IPlace[]>([]);
  const [spots, setSpots] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { regionId } = useParams();
  const navigate = useNavigate();
  const moveToMyLocation = () => {
    navigate(`/places/list/mylocation`);
  };

  const {
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    data: data1,
  } = useQuery<AxiosResponse<IPlace[]>, AxiosError>(
    [`${regionId}-festivals`],
    () => axiosInstance.get(placeApis.getPlaces(Number(regionId), 0)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  return (
    <>
      <Helmet>
        <title>내 주변 지역 | 여행조각</title>
      </Helmet>
      <Container hasPadding>
        <TitleGroup>
          <h1 className="main">{REGIONLIST[Number(regionId)]}</h1>
          <h1>현재 발급 가능한 00 곳의 스팟이 있어요 !</h1>
          <div style={{ width: "100%", textAlign: "right" }}>
            <NearbyMyLocationBtn onClick={moveToMyLocation}>
              <MdLocationOn />
              <p>내 주변</p>
            </NearbyMyLocationBtn>
          </div>
        </TitleGroup>
        <PlaceList></PlaceList>
      </Container>
    </>
  );
}

export default MyLocationListPage;
