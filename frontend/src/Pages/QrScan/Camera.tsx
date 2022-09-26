import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { QrReader } from "react-qr-reader";
import { pixelToRem } from "../../utils/functions/util";
import NestedModal from "./Modal";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;

const GetNftButtonBox = styled.div`
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  display: flex;
  justify-content: center;
  padding: 0 0 20% 0;
  align-items: center;
`;

function QrReaderComponent() {
  const delay = 500;

  const [result, setResult] = useState("No result");

  useEffect

  const handleScan = (result) => {
    if (result) {
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
      <p>{result}</p>
      <GetNftButtonBox>버튼</GetNftButtonBox>
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
