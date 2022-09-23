import React, { useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ColoredRoundButton from "../../components/atoms/ColoredRoundButton";
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
  min-height: 100vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 700;
  height: 3rem;
  display: flex;
  color: ${(props) => props.theme.colors.white};
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  display: block;
  height: ${pixelToRem(40)};
  padding: 0 1rem;
  border-radius: 5px;
  margin: ${pixelToRem(10)} 0;
`;

const InfoBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 5px;
  padding: 0 0 ${pixelToRem(30)} ${pixelToRem(32)};
  margin: ${pixelToRem(10)} 0;
  height: ${pixelToRem(121)};
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  display: flex;
`;

const ButtonText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  /* 색상 */
  font-color: ${(props) => props.theme.colors.MainDark};
`;

const Flex = styled.div`
  display: flex;
  height: ${pixelToRem(40)};
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
        <label>
          <input type="checkbox" />
          축제
          <input type="checkbox" />
          스팟
        </label>

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
          <h5>NFT스티커</h5>
        </InfoBox>
        <input type="file" id="fileUpload" />
        <br />
        <ColoredRoundButton color="yellow" type="button">
          <ButtonText>등록하기</ButtonText>
        </ColoredRoundButton>

        <ColoredRoundButton color="white" type="button" font-color="black">
          <ButtonText>취소하기</ButtonText>
        </ColoredRoundButton>
      </Container>
    </>
  );
}
export default AdminPage;
