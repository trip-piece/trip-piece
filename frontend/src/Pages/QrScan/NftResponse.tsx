import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Title from "./Title";
import Content from "./Content";
import { QrInfoState } from "../../store/atom";
import {
  ContentProps,
  contentPropsInit,
} from "../../utils/interfaces/qrscan.inteface";
import Loading from "./Loading";

function ResultView({ result, stickerName }) {
  return (
    <>
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="서울 SEOUL" />
      <Content
        result="success"
        //result={state.result}
        stickerName="2022 역삼 멀티캠퍼스"
        stickerUrl="이미지경로"
      />
    </>
  );
}

function NftResponse() {
  const { regionId, code } = useParams();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<ContentProps>({
    result: "null",
    stickerName: null,
    stickerUrl: null,
  });

  const [recoilQrState, setRecoilQrState] = useRecoilState(QrInfoState);

  const link = window.location.href;

  const validationLink = (url: string) => {
    // const baseUrl = "j7a607.q.ssafy.io";
    // const baseUrl2 = "http://localhost:3000/";

    console.log("실행");

    const regax =
      /^(http(s)?:\/\/)(localhost:3000)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;

    if (regax.test(url)) {
      console.log("정규식");
      contentPropsInit.result = "success";
      console.log(contentPropsInit);
      //setState(contentPropsInit);
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
