import React, { useState } from "react";
import styled from "@emotion/styled";
import QrReader from "react-qr-reader";
import { pixelToRem } from "../../utils/functions/util";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

const CameraBox = styled.div`   
  display: flex;
  justify-content: center;
  padding: 10% 10% 10% 10%;
  height:500px;
  align - items: center;
  background: ${(props) => props.theme.colors.gray400};
`;

function QrReaderComponent() {
  const [scanned, setScanned] = useState("");

  const onScan = (result: string | null) => {
    setScanned(result || "");
  };
  return (
    <>
      <QrReader
        delay={100}
        onError={() => {}}
        onScan={onScan}
        className="scanner"
        facingMode="environment"
      />
      <div className="result">{scanned}</div>
      <div>url: {scanned}</div>
    </>
  );
}

function Camera() {
  return (
    <Box>
      <CameraBox>
        <QrReaderComponent />
      </CameraBox>
    </Box>
  );
}

export default Camera;
