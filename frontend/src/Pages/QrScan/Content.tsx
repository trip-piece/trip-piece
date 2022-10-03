import React from "react";
import styled from "@emotion/styled";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { pixelToRem } from "../../utils/functions/util";
import { ContentProps } from "../../utils/interfaces/qrscan.inteface";

// eslint-disable-next-line import/no-named-as-default
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";

const Box = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: ${pixelToRem(18)} ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};
  justify-content: center;
  min-height: 78vh;
  background: ${(props) => props.theme.colors.white};
`;
const MainBox = styled.div`
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  justify-content: center;
  padding: 0 0 20% 0;
`;
const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 15% 0 15% 0;
  align-items: center;
`;
const ResultIconBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 14% 0 0 0;
  align-items: center;
`;
const ResulButtontBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 10% 0;
  align-items: center;
`;

const StickerName = styled.div`
  margin : 10% 0 0 0;
  background: : ${(props) => props.theme.colors.white};
  display:flex;
  justify-content  :center;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
const ResultImg = styled.div`
  margin: 5% 25% 0 25%;
  background: ${(props) => props.theme.colors.red};
  display: flex;
  justify-content: center;

  height: 160px;
`;

const ResultText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;

  justify-content: center;
`;

function NFTInfo({ stickerName, stickerUrl }: ContentProps) {
  return (
    <>
      <StickerName>{stickerName}</StickerName>
      <ResultImg>{stickerUrl}</ResultImg>
    </>
  );
}

function QrInfo({ stickerName, stickerUrl }: ContentProps) {
  return (
    <>
      <StickerName>{stickerName}</StickerName>
      <ResultImg>{stickerUrl}</ResultImg>
    </>
  );
}

function Result({ result }: ContentProps): EmotionJSX.Element {
  const flag: string = result;

  let insultText: string = "Loading";
  if (flag === "success") {
    insultText = "스티커 발급 완료";
  } else if (flag === "fail") {
    insultText = "스티커 발급 실패";
  } else if (flag === "incorrect") {
    insultText = "올바르지 않은 QR 요청";
  }

  return (
    <>
      <ResultIconBox>
        <BsXLg size="70" color="#D35B5B" />
      </ResultIconBox>
      <ResultBox>
        <ResultText>{insultText}</ResultText>
      </ResultBox>
    </>
  );
}

function Content({ result, stickerName, stickerUrl }: ContentProps) {
  const flag: string = result;
  let condition: boolean = true;

  if (flag === "success" || "fail") {
    condition = true;
  } else {
    condition = false;
  }
  return (
    <Box>
      <MainBox>
        {condition ? (
          <NFTInfo
            stickerName={stickerName}
            stickerUrl={stickerUrl}
            result={result}
          />
        ) : (
          <QrInfo stickerName={null} stickerUrl={stickerUrl} result={result} />
        )}
      </MainBox>

      <Result result={result} />
      <ResulButtontBox>
        <ColoredRoundButton text="  확인  " color="mainLight" type="submit" />
      </ResulButtontBox>
    </Box>
  );
}

export default Content;
