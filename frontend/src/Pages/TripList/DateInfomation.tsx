import styled from "@emotion/styled";
import React from "react";

const DateInformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  > p {
    display: table-cell;
    vertical-align: middle;
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-weight: 600;
    height: ${(props) => props.theme.fontSizes.h1};
  }
  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: ${(props) => props.theme.fontSizes.s2};
  }
`;

const DateInformationWrapper = styled.div<{ active?: boolean | null }>`
  width: 100%;
  padding: 0 0.5rem;
  color: ${(props) =>
    props.active ? props.theme.colors.blue : props.theme.colors.gray400};
  border-right: ${(props) =>
    props.active && `1px dashed ${props.theme.colors.gray300}`};
  h4 {
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

interface IDateInformation {
  year: null | number | undefined;
  month: number | string | undefined;
  date: string | undefined;
  day: string;
}

interface DateInformationProps extends IDateInformation {
  type: string;
}

function DateInfomation({
  date,
  year,
  month,
  day,
  type,
}: DateInformationProps) {
  return (
    <DateInformationWrapper active={type === "시작"}>
      <h4>{type}</h4>
      <DateInformationContainer>
        <p>{date}</p>
        {year && (
          <div>
            {year}년 {month}월<p>{day}</p>
          </div>
        )}
      </DateInformationContainer>
    </DateInformationWrapper>
  );
}

export default DateInfomation;
