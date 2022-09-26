import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { MdOutlineAddReaction } from "react-icons/md";
import { pixelToRem } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
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

function NestedModal() {
  const [open, setOpen] = React.useState(false);
  // const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const { handleSubmit } = useForm<Inickname>();

  // const onSubmit: SubmitHandler<Inickname> = async (data: Inickname) => {
  //  let response = await axiosInstance.patch(userApis.modifyNickname, data);

  // if (response.status === 200) {
  // setUserInfo({ nickname: data.nickname });
  //  }
  // }
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
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
            />
          </ResultBox>
        </Container>
      </Modal>
    </>
  );
}

export default NestedModal;
