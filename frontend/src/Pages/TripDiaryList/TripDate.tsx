import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import { isSameDay } from "date-fns";
import {
  changeDateFormatToHyphen,
  pixelToRem,
} from "../../utils/functions/util";

interface TripDateProps {
  date: Date;
}

const DateContainer = styled(NavLink)<{ color: string }>`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.black};
  display: block;
  position: relative;
  > svg {
    display: block;
    font-size: ${pixelToRem(75)};
    color: ${(props) => props.color};
  }
  > p {
    position: absolute;
    color: black;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: calc(16px + 0.1vw);
    height: calc(16px + 0.1vw);
  }
`;

function TripDate({ date }: TripDateProps) {
  const tripDate = date.getDate();
  const tripMonth = date.getMonth() + 1;
  const diaryDate = changeDateFormatToHyphen(date);

  let color;
  if (isSameDay(new Date(), date)) {
    color = "yellow";
  } else if (date < new Date()) {
    color = "#BBA8F2";
  } else {
    color = "gray";
  }

  return (
    <DateContainer to={diaryDate} color={color}>
      <TiStarFullOutline />
      <p>
        {tripMonth}/{tripDate}
      </p>
    </DateContainer>
  );
}

export default TripDate;
