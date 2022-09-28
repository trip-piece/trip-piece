import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { ISticker } from "../../utils/interfaces/diarys.interface";
import { pixelToRem } from "../../utils/functions/util";

const Wrapper = styled(Box)<{ diarywidth: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => pixelToRem(props.diarywidth * 0.8)};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  outline: 0;
`;

const DiaryFrame = styled.div<DiaryProps>`
  background-color: red;
  position: relative;
  width: ${(props) => pixelToRem(props.diaryWidth * 0.7)};
  height: ${(props) => pixelToRem(props.diaryWidth * 0.7 * props.diaryRatio)};
  border-radius: 15px;
`;

const StickerImg = styled.img<{ top: number; left: number }>`
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  width: 20%;
  position: absolute;
`;

interface DiaryProps {
  diaryWidth: number;
  diaryRatio: number;
}

interface ModalProps {
  setOpen: (bool: boolean) => void;
  open: boolean;
  stickerList: ISticker[];
  diaryBox: any;
}

function DecorationModal({ setOpen, open, stickerList, diaryBox }: ModalProps) {
  const handleClose = () => setOpen(false);
  const [imgSrc, setImageSrc] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);
  const onClick = () => {
    html2canvas(imageRef.current).then(function (canvas) {
      setImageSrc(canvas.toDataURL("image/jpeg"));
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper diarywidth={diaryBox.width}>
        <h3>프레임 </h3>
        <DiaryFrame
          diaryWidth={diaryBox.width}
          diaryRatio={diaryBox.ratio}
          ref={imageRef}
        >
          <div>아이고~</div>
          {stickerList.map((sticker, index) => (
            <StickerImg
              ref={imageRef}
              top={sticker.originY * diaryBox.height * 0.7}
              left={sticker.originX * diaryBox.width * 0.7}
              src={sticker.tokenURI}
              key={index}
            />
          ))}
        </DiaryFrame>
        <img src={imgSrc} alt="#" />
        <button type="button" onClick={onClick}>
          버튼 찰칼
        </button>
      </Wrapper>
    </Modal>
  );
}

export default DecorationModal;
