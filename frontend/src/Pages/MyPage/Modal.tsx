import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { pixelToRem } from "../../utils/functions/util";
import ColoredRoundButton, {
  CustomRoundButton,
} from "../../components/atoms/ColoredRoundButton";
import { ReactComponent as PencilIcon } from "../../assets/svgs/pencilIcon.svg";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IUserInfo, UserInfoState } from "../../store/atom";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import userApis, { Inickname } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";

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

const ButtonContainer = styled.div`
  margin: auto;
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
  const [open, setOpen] = useState(false);
  const [userInfoState, setUserInfoState] = useRecoilState(UserInfoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<Inickname>({
    mode: "onSubmit",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetField("nickname");
    setOpen(false);
  };
  // let validationChk: boolean = true;

  //useEffect();

  const onSubmit: SubmitHandler<Inickname> = async (data: Inickname) => {
    // if (data.nickname.length === 0) {
    //   validationChk = false;
    // }
    // validationChk = true;
    console.log(errors);
    if (data.nickname.length >= 1 && data.nickname.length <= 8) {
      const response = await axiosInstance.patch(userApis.modifyNickname, data);

      if (response.status === 200) {
        const info: IUserInfo = { ...userInfoState, nickname: data.nickname };
        // /console.log(userInfoSta);

        setUserInfoState(info);
      }

      handleClose();
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <MdModeEditOutline size={27} style={{ color: "#d4d4d4" }} />
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
              <InputBox
                placeholder="1~8자 사이로 입력해주세요"
                minLength={1}
                maxLength={8}
                {...register("nickname", {
                  minLength: { value: 1, message: "1글자" },
                  maxLength: { value: 8, message: "8글자" },
                })}
              />

              <ButtonContainer>
                <CustomRoundButton
                  text=" 수정 "
                  color="mainLight"
                  type="submit"
                />{" "}
                <CustomRoundButton
                  text="취소"
                  color="gray400"
                  type="button"
                  func={handleClose}
                />
              </ButtonContainer>
            </Form>
          </Container>
        </ModifiedNicknameModal>
      </Modal>
    </>
  );
}
