import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { pixelToRem } from "../../utils/functions/util";

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;

  input {
    color: ${(props) => props.theme.colors.white};
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: ${pixelToRem(400)};
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  height: ${pixelToRem(40)};
  padding: 0 1rem;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    width: 30%;
    height: 2rem;
    border-radius: 20px;
  }

  .register {
    margin-right: 1rem;
    background: ${(props) => props.theme.colors.yellow};
  }
`;

function NftRegisterPage() {
  return (
    <>
      <Helmet>
        <title>관리자페이지-Nft등록 | 여행조각</title>
      </Helmet>
      <Container>
        <FormContainer>
          <Title>Nft 등록</Title>
          <input type="file" id="fileUpload" />
          <TitleInput placeholder="NFT 스티커 이름" />
          <TitleInput placeholder="개인키" />
          <ButtonGroup>
            <button type="button" className="register">
              등록하기
            </button>
            <button type="button">취소하기</button>
          </ButtonGroup>
        </FormContainer>
      </Container>
    </>
  );
}
export default NftRegisterPage;
