import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Title from "./Title";
import Content from "./Content";
import { QrInfoState, UserInfoState } from "../../store/atom";
import {
  ContentProps,
  contentPropsInit,
} from "../../utils/interfaces/qrscan.inteface";
import Loading from "./Loading";
import { NFTContract } from "../../utils/common/NFT_ABI";
import axiosInstance from "../../utils/apis/api";
import { placeApis } from "../../utils/apis/placeApis";
import { getLocation } from "../../utils/functions/util";

interface placeResponse {
  data: {
    lat: number;
    lng: number;
    regionName: string;
    enableStickerList: [
      {
        stickerId: number;
        tokenId: number;
        tokenName: string;
        tokenURL: string;
      },
    ];
    distinctStickerList: [
      {
        stickerId: Number;
        tokenId: Number;
        tokenName: string;
        tokenURL: string;
        amount: Number;
      },
    ];
    posterImage: string;
    code: string;
  };
}

interface ISticker {
  tokenName: string;
  tokenId: number;
  tokenUrl: string;
}

function NftResponse() {
  const { regionId, code } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const [locationInfo, setLocationInfo] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [imagePath, setImagePath] = useState("");

  const [sticker, setSticker] = useState<ISticker>();

  const [state, setState] = useState<ContentProps>({
    result: "null",
    stickerName: null,
    stickerUrl: null,
  });

  const [recoilQrState, setRecoilQrState] = useRecoilState(QrInfoState);

  const link = window.location.href;

  const getToken = (tokenURI: string) => {
    fetch(`https://www.infura-ipfs.io/ipfs/${tokenURI}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImagePath(String(data[0].image));
      });
  };

  const sendNFT = async (tokenId: number) => {
    const adminAccount: string = import.meta.env.VITE_ADMIN_ADDRESS;
    const userAddress: string = userInfo.address;

    try {
      await NFTContract.methods
        .transferFrom(adminAccount, userAddress, tokenId)
        .send({ from: adminAccount });

      contentPropsInit.result = "success";
      contentPropsInit.stickerName = sticker.tokenName;

      getToken(sticker.tokenUrl);
      contentPropsInit.stickerUrl = imagePath;

      setState(contentPropsInit);

      setLoading(false);
    } catch (error) {
      console.log("주다가 에러났다 ", error);

      contentPropsInit.result = "fail";
      contentPropsInit.stickerName = sticker.tokenName;
      contentPropsInit.stickerUrl = sticker.tokenUrl;

      setState(contentPropsInit);
       setLoading(false);
    }
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number => {
    const R: number = 6371; // Radius of the earth in km
    const dLat: number = deg2rad(lat2 - lat1); // deg2rad below
    const dLon: number = deg2rad(lng2 - lng1);
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d: number = R * c; // Distance in km
    return d;
  };

  const validationCode = (placeId: number) => {
    try {
      axiosInstance
        .get(placeApis.getDetailedPlace(placeId))
        .then((response: placeResponse) => {
          if (response.data.code === code) {
            const userLocation: any = getLocation();
            const userLat = userLocation.latitude;
            const userLng = userLocation.longitude;

            const distance = getDistanceFromLatLonInKm(
              response.data.lat,
              response.data.lng,
              userLat,
              userLng,
            );

            if (distance < 5) {
              // 스티커를 발급하거라
              const listLength = response.data.enableStickerList.length;
              const rand = Math.floor(Math.random() * listLength);

              const selectedSticker = response.data.enableStickerList[rand];

              setSticker({
                tokenName: selectedSticker.tokenName,
                tokenId: selectedSticker.tokenId,
                tokenUrl: selectedSticker.tokenURL,
              });

              sendNFT(selectedSticker.tokenId);
            } else {
              // 스티커 발급을 실패하노라
              contentPropsInit.result = "fali";
              contentPropsInit.stickerName = response.data.regionName;
              contentPropsInit.stickerUrl = response.data.posterImage;
              setState(contentPropsInit);
              setLoading(false);
            }

            /// 합격 @!@
          } else {
            //  불합격 ~ !
            contentPropsInit.result = "fali";
            contentPropsInit.stickerName = response.data.regionName;
            contentPropsInit.stickerUrl = response.data.posterImage;
            setState(contentPropsInit);
            setLoading(false);
          }
        });
    } catch (error) {
      contentPropsInit.result = "incorrect";

      setState(contentPropsInit);
      setLoading(false);
      console.log("이상한 큐알이다 ! ");
    }
  };

  const validationLink = (url: string) => {
    // const baseUrl = "j7a607.q.ssafy.io";
    // const baseUrl2 = "http://localhost:3000/";

    console.log("실행");

    const regax =
      /^(http(s)?:\/\/)(localhost:3000)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;

    if (regax.test(url)) {
      console.log("정규식");
      contentPropsInit.result = "success";

      sendNFT();

      setLoading(false);
    } else {
      // 이상한 큐알이라구함
      contentPropsInit.result = "incorrect";
      setState(contentPropsInit);
      setLoading(false);
    }
  };

  //  const mounted = useRef(false);
  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    // } else {
    //   validationLink(link);
    // }
    validationLink(link);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>QR 스캔 | 여행조각</title>
          </Helmet>
          <Title title="서울 SEOUL" />
          <Content
            result={state.result}
            stickerName="2022 역삼 멀티캠퍼스"
            stickerUrl="이미지경로"
          />
          {state.result}
        </>
      )}
    </>
  );
}

export default NftResponse;
