import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
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
import Web3 from "web3";
import { qrApis } from "../../utils/apis/QrApis";

interface placeResponse {
  data: {
    lat: number;
    lng: number;
    regionName: string;
    name: string;
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
  const { placeId, code } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const [recoilQrInfo, setRecoilQrInfo] = useRecoilState(QrInfoState);

  const [locationInfo, setLocationInfo] = useState("");
  const [state, setState] = useState<ContentProps>({
    result: "null",
    stickerName: null,
    stickerUrl: null,
  });

  const link = window.location.href;

  const web3 = new Web3(
    new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
  );

  const sendNFT = async (tokenId: number) => {
    const userAddress = userInfo.address;
    const privateKey = import.meta.env.VITE_ADMIN_PRIVATE_KEY;
    const adminAccount = import.meta.env.VITE_ADMIN_ADDRESS;
    const transferFrom = NFTContract.methods.transferFrom(
      adminAccount,
      userAddress,
      tokenId,
    );
    const encodeABI = transferFrom.encodeABI();
    const tx = {
      from: adminAccount,
      to: import.meta.env.VITE_NFT_CA,
      gas: 2000000,
      data: encodeABI,
    };
    try {
      web3.eth.accounts.signTransaction(tx, privateKey).then((signed) => {
        web3.eth.sendSignedTransaction(signed.rawTransaction);
      });
    } catch (error) {
      console.log("주다가 에러났다 ", error);
      contentPropsInit.result = "fail";
      contentPropsInit.stickerName = "ERROR !";
      contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
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

  const validationCode = async (placeId: number) => {
    const userLocation: any = await getLocation();
    try {
      axiosInstance.get(qrApis.qrCheck(placeId)).then((result: any) => {
        if (result.data) {
          console.log("이 사람 이미 발급 했음!!!!!");
          contentPropsInit.result = "check";
          contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
          setState(contentPropsInit);
          setLoading(false);
        } else {
          axiosInstance
            .get(placeApis.getDetailedPlace(placeId))
            .then((response: placeResponse) => {
              setLocationInfo(response.data.name);
              if (response.data.code === code) {
                const distance = getDistanceFromLatLonInKm(
                  response.data.lat,
                  response.data.lng,
                  userLocation.latitude,
                  userLocation.longitude,
                );

                if (placeId === 25 || distance < 5) {
                  const listLength = response.data.enableStickerList.length;
                  const rand = Math.floor(Math.random() * listLength);
                  const selectedSticker = response.data.enableStickerList[rand];
                  console.log(
                    `tokenID : ${response.data.enableStickerList[rand].tokenId}`,
                  );
                  sendNFT(selectedSticker.tokenId);

                  /// 합격 @!@
                  try {
                    const data = {
                      placeId: placeId,
                      stickerId: selectedSticker.id,
                    };
                    axiosInstance
                      .post(qrApis.qrLog, data)
                      .then(async (result1: any) => {
                        console.log(result1);
                        contentPropsInit.result = "success";
                        contentPropsInit.stickerName =
                          selectedSticker.tokenName;
                        await fetch(
                          "https://www.infura-ipfs.io/ipfs/" +
                            selectedSticker.tokenURL,
                        )
                          .then((res) => {
                            return res.json();
                          })
                          .then((data) => {
                            contentPropsInit.stickerUrl = String(data[0].image);
                            console.log(contentPropsInit.stickerUrl);
                          });
                        setState(contentPropsInit);
                        console.log(contentPropsInit);
                        setLoading(false);
                      });
                  } catch (err) {
                    console.log(err);
                    contentPropsInit.result = "fail";
                    contentPropsInit.stickerName = response.data.name;
                    contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
                    setState(contentPropsInit);
                    setLoading(false);
                  }
                } else {
                  // 스티커 발급을 실패하노라
                  contentPropsInit.result = "distance";
                  contentPropsInit.stickerName = "ERROR !";
                  contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
                  setState(contentPropsInit);
                  setLoading(false);
                }
              } else {
                //  불합격 ~ !
                console.log("발급실패");
                contentPropsInit.result = "incorrect";
                contentPropsInit.stickerName = "ERROR !";
                contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
                setState(contentPropsInit);
                setLoading(false);
              }
            });
        }
      });

      setRecoilQrInfo((prev) => ({ ...prev, modalFlag: false }));
    } catch (error) {
      contentPropsInit.result = "incorrect";
      contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
      setState(contentPropsInit);
      setLoading(false);
    }
  };

  const validationLink = (url: string) => {
    // const regax =
    //   /^(http(s)?:\/\/)(j7a607.q.ssafy.io)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;
    const regax =
      /^(http(s)?:\/\/)(localhost:3000)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;

    if (regax.test(url)) {
      console.log("validationLink Test 성공");
      contentPropsInit.result = "success";
      validationCode(Number(placeId));
    } else {
      console.log("validationLink Test 실패 ㅠㅠ");
      contentPropsInit.result = "incorrect";
      contentPropsInit.stickerUrl = "https://ifh.cc/g/V44V4O.png";
      setState(contentPropsInit);
      setLoading(false);
    }
  };

  useEffect(() => {
    validationLink(link);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>QR 스캔 | 여행조각</title>
          </Helmet>
          <Title title={locationInfo} />
          <Content
            result={state.result}
            stickerName={state.stickerName}
            stickerUrl={state.stickerUrl}
          />
        </>
      )}
    </motion.div>
  );
}

export default NftResponse;
