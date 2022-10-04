import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import html2canvas from "html2canvas";
import { v4 } from "uuid";
import { useRecoilState } from "recoil";
import { ISticker } from "../../utils/interfaces/diarys.interface";
import { pixelToRem } from "../../utils/functions/util";
import StickerImg from "../../components/atoms/StickerImg";
import { formDataDiaryState } from "../../store/diaryAtoms";

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
  height: ${(props) => pixelToRem(props.diaryHeight * 0.7)};
  border-radius: 15px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  z-index: 10;
`;

interface DiaryProps {
  diaryWidth: number;
  diaryHeight: number;
}

interface ModalProps {
  setOpen: (bool: boolean) => void;
  open: boolean;
  stickerList: ISticker[];
  diaryBox: any;
  postData: (diary: FormData, frameImage?: File) => void;
}

function DecorationModal({
  setOpen,
  open,
  stickerList,
  diaryBox,
  postData,
}: ModalProps) {
  const handleClose = () => setOpen(false);
  const [diary, setDiary] = useRecoilState(formDataDiaryState);

  const onClick = (dom: HTMLElement) => {
    html2canvas(dom, {
      logging: true,
      useCORS: true,
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      import("../../utils/functions/changeFileType").then((change) => {
        const file = change.dataURLtoFile(imageData, v4());
        postData(diary, file);
        setDiary(null);
        handleClose();
      });
    });
  };

  const elRef = (node: HTMLElement) => {
    if (node !== null) {
      onClick(node);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper diarywidth={diaryBox.width}>
        <LoadingContainer>프레임 공유중</LoadingContainer>
        <DiaryFrame
          diaryWidth={diaryBox.width}
          diaryHeight={diaryBox.height}
          ref={elRef}
        >
          {stickerList.map((sticker, index) => (
            <StickerImg
              up={sticker.originY * diaryBox.height * 0.7}
              left={sticker.originX * diaryBox.width * 0.7}
              src={sticker.imagePath}
              alt="스티커"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </DiaryFrame>
      </Wrapper>
    </Modal>
  );
}

export default DecorationModal;
