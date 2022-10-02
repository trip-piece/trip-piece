import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { MdOutlineAddReaction } from "react-icons/md";
import { useRecoilState } from "recoil";
import { pixelToRem } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import { IQrInfo, QrInfoState } from "../../store/atom";
import { urlSource } from "ipfs-http-client/dist/src";
// import { pixelToRem } from "../../utils/functions/util";
// import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${pixelToRem(350)};
  height: ${pixelToRem(300)};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  outline: 0;
`;

const Title = styled.div`
  margin: 10% 10% 10% 10%;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: bolder;
  text-align: center;
`;

const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 15% 0 15% 0;
  align-items: center;
`;

function NestedModal({ validateLink }) {
  const [open, setOpen] = useState(false);
  const [recoilQrState, setRecoilQrState] = useRecoilState(QrInfoState);

  const handleOpen = () => {
    setOpen(true);
    setRecoilQrState({ url: recoilQrState.url, modalFlag: true });
  };
  const handleClose = () => {
    setOpen(false);
    setRecoilQrState({ url: recoilQrState.url, modalFlag: false });
  };

  const MoveToLink = () => {
    const url: string = recoilQrState.url as string;
    // const baseUrl = "j7a607.q.ssafy.io";
    // const baseUrl2 = "http://localhost:3000/";

    // 정규표현식
    const regax =
      /^(http(s)?:\/\/)(localhost:3000)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;
    if (regax.test(url)) {
      validateLink(true);
      window.location = recoilQrState.url;
    } else {
      validateLink(true);
      console.log("올바르지않은 URL 형식");
    }

    setOpen(false);
  };

  useEffect(() => {
    if (recoilQrState.modalFlag === true) handleOpen();
  }, [recoilQrState.modalFlag]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Title>NFT 스티커 받으러가기</Title>
        <MdOutlineAddReaction size="90" color="#FDD835" />
        <ResultBox>
          <ColoredRoundButton
            text="  확인  "
            color="mainLight"
            type="button"
            func={MoveToLink}
          />
        </ResultBox>
      </Container>
    </Modal>
  );
}

export default NestedModal;
