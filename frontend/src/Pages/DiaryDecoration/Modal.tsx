import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import html2canvas from "html2canvas";
import { useCallback, useRef, useState } from "react";
import { v4 } from "uuid";
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
  border: 2px solid black;
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

  const encodeFileToBase64 = useCallback((fileBlob: File) => {
    if (!fileBlob) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      const tmpImage = reader.result as string;
      setImageSrc(tmpImage);
    };
  }, []);

  const dataURLtoFile = (dataurl: string, fileName: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const onClick = () => {
    html2canvas(imageRef.current, {
      logging: true,
      useCORS: true,
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const file = dataURLtoFile(imageData, v4());
      encodeFileToBase64(file);
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
          {stickerList.map((sticker, index) => (
            <StickerImg
              top={sticker.originY * diaryBox.height * 0.7}
              left={sticker.originX * diaryBox.width * 0.7}
              src={sticker.tokenURI}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </DiaryFrame>
        {imgSrc && <img src={imgSrc} alt="#" width="200px" />}
        <button type="button" onClick={onClick}>
          버튼 찰칵
        </button>
      </Wrapper>
    </Modal>
  );
}

export default DecorationModal;
