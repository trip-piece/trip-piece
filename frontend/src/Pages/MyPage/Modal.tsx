import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
import { ReactComponent as PencilIcon } from "../../assets/svgs/pencilIcon.svg";
import axiosInstance from "../../utils/apis/api";
import userApis, { Inickname } from "../../utils/apis/userApis";
import { useRecoilState } from "recoil";
import { UserInfoState } from "../../store/atom";
import { useForm } from "react-hook-form";

const ModifiedNicknameModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  outline: 0;
`;

const Container = styled.div`
  width: 80%;
  margin: 5% 0 13% 0;
`;

const LeftContainer = styled.div`
  float: left;
  margin-left: 1.3rem;
`;
const RightContainer = styled.div`
  float: right;
  margin-right: 1.3rem;
`;

const Title = styled.div`
  margin: 10% 10% 10% 10%;

  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: bolder;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const InputBox = styled.input`
  border: none;
  width: 100%;
  height: ${pixelToRem(33)};
  padding: 0 1rem;
  margin: 0 0 ${pixelToRem(32)} 0;
  border-radius: 5px;
  border: solid 1px #ccc;
  outline: none;
  text-align: center;
`;

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { handleSubmit } = useForm<Inickname>();

  const onSubmit: SubmitHandler<Inickname> = async (data: Inickname) => {
    let response = await axiosInstance.patch(userApis.modifyNickname, data);

    if (response.status === 200) {
      setUserInfo({ nickname: data.nickname });
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>
        <PencilIcon width="25" height="26" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModifiedNicknameModal>
          <Container>
            <Title>닉네임 수정</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputBox placeholder="1 ~ 8자 이내로 입력" />
            </Form>

            <LeftContainer>
              <ColoredRoundButton
                text=" 수정 "
                color="mainLight"
                type="submit"
              />
            </LeftContainer>
            <RightContainer>
              <ColoredRoundButton
                text="취소"
                color="gray400"
                type="button"
                func={handleClose}
              />
            </RightContainer>
          </Container>
        </ModifiedNicknameModal>
      </Modal>
    </>
  );
}
