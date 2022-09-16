import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/DatePicker.css";
import {
  createDate,
  getDayName,
  PadZero,
  pixelToRem,
} from "../../utils/functions/util";
import { REGIONLIST, WEEK } from "../../utils/constants/constant";
import DateInfomation from "./DateInfomation";

const Wrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TripInformationWrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DurationWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.gray0};
  width: 100%;
  border-top-left-radius: ${pixelToRem(15)};
  border-top-right-radius: ${pixelToRem(15)};
`;

const DateInformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0.4rem;
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
  color: ${(props) =>
    props.active ? props.theme.colors.blue : props.theme.colors.gray400};
  border-right: ${(props) =>
    props.active && `1px dashed ${props.theme.colors.gray300}`};
`;

interface BasicModalProps {
  setOpen: (bool: boolean) => void;
  open: boolean;
}

interface IDateInformation {
  year: null | number | undefined;
  month: number | string | undefined;
  date: string | undefined;
  day: string;
}

function BasicModal({ setOpen, open }: BasicModalProps) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startDateInfomation, setStartDateInformation] =
    useState<IDateInformation>({
      year: null,
      month: "",
      date: "",
      day: "",
    });
  const [endDateInfomation, setEndDateInformation] = useState<IDateInformation>(
    {
      year: null,
      month: "",
      date: "",
      day: "",
    },
  );
  const onChange = (dates: Array<Date | null>) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleClose = () => setOpen(false);

  const handleMonthChange = (date: Date) => {
    setMonth(date.getMonth());
  };

  const setDayColor = (date: Date) => {
    if (date.getMonth() === month) {
      if (getDayName(createDate(date)) === "토") return "custom-day saturday";
      if (getDayName(createDate(date)) === "일") return "custom-day sunday";
      return "custom-day";
    }
    return "custom-day gray-day";
  };

  const handleModifiedStartDate = (
    date: Date | null,
    setDateInformation: Dispatch<SetStateAction<IDateInformation>>,
  ) => {
    if (!date) {
      setDateInformation({ year: null, month: "", date: "", day: "" });
      return;
    }
    const targetYear = date?.getFullYear();
    const targetMonth = PadZero((date?.getMonth() || 0) + 1);
    const targetDate = PadZero(date?.getDate());
    const targetDay = WEEK[date?.getDay() || 0];
    setDateInformation({
      year: targetYear,
      month: targetMonth,
      date: targetDate,
      day: targetDay,
    });
  };

  useEffect(() => {
    handleModifiedStartDate(startDate, setStartDateInformation);
    handleModifiedStartDate(endDate, setEndDateInformation);
  }, [startDate, endDate]);

  console.log(endDate);

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Wrapper>
            <TripInformationWrapper>
              <div>
                <div>
                  <h3>여행지</h3>
                  <select>
                    {REGIONLIST.slice(1).map((region, idx) => (
                      <option value={idx} key={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input />
              <DurationWrapper>
                <DateInfomation {...startDateInfomation} type="시작" />
                <DateInfomation {...endDateInfomation} type="종료" />
                {/* <DateInformationWrapper active>
                  <h4>시작</h4>
                  <DateInformationContainer>
                    <p>{startDateInfomation.date}</p>
                    <div>
                      {startDateInfomation.year}년 {startDateInfomation.month}월
                      <p>{startDateInfomation.day}</p>
                    </div>
                  </DateInformationContainer>
                </DateInformationWrapper>
                <DateInformationWrapper>
                  <h4>종료</h4>
                  <DateInformationContainer>
                    <p>{endDateInfomation.date}</p>
                    <div>
                      <div>
                        {endDateInfomation.year}년 {endDateInfomation.month}월
                      </div>
                      <p>{endDateInfomation.day}</p>
                    </div>
                  </DateInformationContainer>
                </DateInformationWrapper> */}
              </DurationWrapper>
            </TripInformationWrapper>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              selectsRange
              locale={ko}
              inline
              onMonthChange={handleMonthChange}
              dayClassName={setDayColor}
              popperPlacement="auto"
            />
            <button type="button">여행 추가하기</button>
          </Wrapper>
        </Modal>
      </div>
    </div>
  );
}

export default BasicModal;
