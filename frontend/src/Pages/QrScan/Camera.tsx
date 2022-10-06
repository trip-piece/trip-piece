import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import styled from "@emotion/styled";
import { QrReader } from "react-qr-reader";
import { pixelToRem } from "../../utils/functions/util";
import NestedModal from "./Modal";
import { QrInfoState } from "../../store/atom";
import { ContentProps } from "../../utils/interfaces/qrscan.inteface";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

const BottonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 18% 0 30% 0;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

function QrReaderComponent() {
  const delay = 500;

  const [result, setResult] = useState();
  const [recoilQrState, setRecoilQrInfo] = useRecoilState(QrInfoState);

  useEffect(() => {
    //console.log(result);
    if (!!result) {
    //  console.log("react hook checks");
      setRecoilQrInfo({ url: result, modalFlag: true });
    }
  }, [result]);

  const handleScan = (result: any) => {
    if (!!result) {
    //  console.log("function handleScan checks");
      setResult(result);
    }
  };

  return (
    <>
      <QrReader
        scanDelay={delay}
        onResult={handleScan}
        constraints={{ facingMode: "environment" }}
      />
      <BottonContainer>QR코드를 카메라에 비춰주세요</BottonContainer>
    </>
  );
}

function Camera() {
  return (
    <Box>
      <QrReaderComponent />
      <NestedModal />
    </Box>
  );
}

export default Camera;
