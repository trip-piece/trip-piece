import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { pixelToRem } from "../../utils/functions/util";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/DatePicker.css";

// 지역리스트 가져오기
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  input {
    color: ${(props) => props.theme.colors.white};
  }
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

const InfoBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 5px;
  padding: ${pixelToRem(20)};
  height: ${pixelToRem(121)};
  width: 100%;
  background: ${(props) => props.theme.colors.white};
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  div {
    text-align: center;
    width: 25%;
    height: 2rem;
    border-radius: 20px;

    label {
      padding: 0.5rem;
      color: ${(props) => props.theme.colors.white};
    }
  }
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

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    height: ${pixelToRem(40)};
    border-radius: 5px;
    width: 100%;
    color: ${(props) => props.theme.colors.gray900};
    padding: 1rem;
  }
`;

function AdminPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Helmet>
        <title>관리자페이지 | 여행조각</title>
      </Helmet>
      <Container>
        <Title>이벤트 등록(수정)</Title>
        <RadioGroup>
          <div>
            <input type="radio" checked id="spot" />
            <label htmlFor="spot">스팟</label>
          </div>
          <div>
            <input type="radio" id="festival" />
            <label htmlFor="festival">축제</label>
          </div>
        </RadioGroup>
        <TitleInput placeholder="축제 / 지역 명" maxLength={10} />
        <Select options={options} />
        <TitleInput placeholder="장소" />
        <TitleInput placeholder="담당자 이메일" />
        <Flex>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
          />
        </Flex>
        <InfoBox>
          <h5>NFT 스티커 목록</h5>
          <div>
            <input type="checkbox" id="sticker" />
            <label htmlFor="sticker">NFT 스티커</label>
          </div>
        </InfoBox>
        <input type="file" id="fileUpload" />
        <ButtonGroup>
          <button type="button" className="register">
            등록하기
          </button>
          <button type="button">취소하기</button>
        </ButtonGroup>
      </Container>
    </>
  );
}
export default AdminPage;
