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
import Tx from "ethereumjs-tx";
import Web3 from "web3";
import { sign } from "crypto";
import { qrApis } from "../../utils/apis/QrApis";

interface placeResponse {
  data: {
    lat: number;
    lng: number;
    regionName: string;
    enableStickerList: [
      {
        id: number;
        tokenId: number;
        tokenName: string;
        tokenURL: string;
      },
    ];
    distinctStickerList: [
      {
        id: Number;
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
  id: number;
  tokenName: string;
  tokenId: number;
  tokenURL: string;
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

  const web3 = new Web3(
    new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
  );

  const sendNFT = async (tokenId: number) => {
    const userAddress: string = userInfo.address;
    const privateKey = import.meta.env.VITE_ADMIN_PRIVATE_KEY;
    const adminAccount: string = import.meta.env.VITE_ADMIN_ADDRESS;
    const transferFrom = NFTContract.methods.transferFrom(
      adminAccount,
      userAddress,
      tokenId,
    );
    const encodeABI = transferFrom.encodeABI();
    console.log(encodeABI);
    const tx = {
      from: adminAccount,
      to: import.meta.env.VITE_NFT_CA,
      gas: 2000000,
      data: encodeABI,
    };
    try {
      web3.eth.accounts.signTransaction(tx, privateKey).then((signed) => {
        var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
        tran.on("transactionHash", (hash) => {
          console.log("hash");
          console.log(hash);
        });

        tran.on("receipt", (receipt) => {
          console.log("reciept");
          console.log(receipt);
        });

        tran.on("error", console.error);
      });
    } catch (error) {
      console.log("주다가 에러났다 ", error);
      contentPropsInit.result = "fail";
      contentPropsInit.stickerName = sticker.tokenName;
      contentPropsInit.stickerUrl = sticker.tokenURL;
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

  const validationCode = async (placeId: string) => {
    console.log("코드 검증 시작 ");
    const userLocation: any = await getLocation();

    try {
      axiosInstance
        .get(placeApis.getDetailedPlace(placeId))
        .then((response: placeResponse) => {
          console.log(response);

          if (response.data.code === code) {
            console.log(userLocation.latitude);
            console.log(userLocation.longitude);

            console.log("distance 계산하삼");

            //console.log(`lat ${userLat}`);
            //console.log(`lng${userLng}`);

            const distance = getDistanceFromLatLonInKm(
              response.data.lat,
              response.data.lng,
              response.data.lat,
              response.data.lng,
              // userLocation.latitude,
              // userLocation.longitude,
            );

            console.log(distance);

            if (distance < 5) {
              // 스티커를 발급하거라
              const listLength = response.data.enableStickerList.length;
              const rand = Math.floor(Math.random() * listLength);

              console.log(rand);

              const selectedSticker = response.data.enableStickerList[rand];
              console.log(response.data.enableStickerList[rand]);
              console.log(
                `tokenID : ${response.data.enableStickerList[rand].tokenId}`,
              );
              sendNFT(selectedSticker.tokenId);
              setSticker(response.data.enableStickerList[rand]);
            } else {
              // 스티커 발급을 실패하노라
              contentPropsInit.result = "fail";
              contentPropsInit.stickerName = response.data.regionName;
              contentPropsInit.stickerUrl = response.data.posterImage;
              setState(contentPropsInit);
              setLoading(false);
            }

            /// 합격 @!@
            const data = {
              stickerId: sticker.id,
              placeId: placeId,
            };

            try {
              axiosInstance.patch(qrApis.qrLog, data).then((response) => {
                console.log(response);
              });
            } catch (err) {
              console.log(err);
              contentPropsInit.result = "fail";
              contentPropsInit.stickerName = response.data.regionName;
              contentPropsInit.stickerUrl = response.data.posterImage;
              setState(contentPropsInit);
              setLoading(false);
              return;
            }

            contentPropsInit.result = "success";
            contentPropsInit.stickerName = sticker.tokenName;
            console.log(sticker);
            getToken(sticker.tokenURL);
            contentPropsInit.stickerUrl = imagePath;
            console.log(imagePath);

            setState(contentPropsInit);
            setLoading(false);
          } else {
            //  불합격 ~ !
            console.log("발급실패 ㅋ");

            contentPropsInit.result = "fail";
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
      console.log("정규식 성공");
      contentPropsInit.result = "success";
      validationCode(regionId);
    } else {
      // 이상한 큐알이라구함
      console.log("정규식 실패");
      contentPropsInit.result = "incorrect";
      setState(contentPropsInit);
      setLoading(false);
    }
  };

  //  const mounted = useRef(false);
  useEffect(() => {
    // 맨 처음 렌더링 될 때 실행
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
          <Title title="어딘가" />
          <Content
            result={state.result}
            stickerName={state.stickerName}
            stickerUrl={state.stickerUrl}
          />
        </>
      )}
    </>
  );
}

export default NftResponse;
