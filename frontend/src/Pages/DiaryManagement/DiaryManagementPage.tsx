import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FONTTYPELIST } from "../../utils/constants/constant";

const Container = styled.section`
  height: 1px;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
`;

const Select = styled.select`
  display: block;
`;

const DiaryStyleContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const Paragraph = styled.textarea<{ fontType: number }>`
  display: block;
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

interface RouteState {
  state: {
    date: string;
  };
}

function DiaryManagementPage() {
  const [fontType, setFontType] = useState(0);
  const [dottedDate, setDottedDate] = useState("");
  const {
    state: { date },
  } = useLocation() as RouteState;

  useEffect(() => {
    setDottedDate(date.replaceAll("-", "."));
  }, []);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    setFontType(Number(value));
  };

  return (
    <Container>
      {dottedDate}
      <DiaryStyleContainer>
        <Select name="font" id="font" onChange={onChange}>
          {FONTTYPELIST.map((font, idx) => (
            <option key={font} value={idx}>
              {font}
            </option>
          ))}
        </Select>
      </DiaryStyleContainer>
      <Paragraph fontType={fontType} />
    </Container>
  );
}

export default DiaryManagementPage;
