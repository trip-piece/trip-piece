import React, { useState } from "react";
import styled from "@emotion/styled";
import { QrReader } from "react-qr-reader";
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

function QrReaderComponent() {
  const delay = 500;

  const previewStyle = {
    height: 320,
    width: 320,
  };

  const [result, setResult] = useState("No result");

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  };

  const handleError = (error: Error) => {
    console.log(error);
  };

  return (
    <>
      <QrReader
        scanDelay={delay}
        onResult={handleScan}
        constraints={{ facingMode: "environment" }}
      />
      <p>{result}</p>
    </>
  );
}

function Camera() {
  return (
    <Box>
      <QrReaderComponent />
    </Box>
  );
}

export default Camera;
