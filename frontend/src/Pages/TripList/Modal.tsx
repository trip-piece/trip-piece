/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/DatePicker.css";
import { AiFillCaretDown } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { InfiniteData, QueryObserverResult } from "react-query";
import {
  createDate,
  getDayName,
  PadZero,
  pixelToRem,
} from "../../utils/functions/util";
import { MESSAGE_LIST, REGIONLIST, WEEK } from "../../utils/constants/constant";
import DateInfomation from "./DateInfomation";
import tripApis from "../../utils/apis/tripsApis";
import { ITrip } from "../../utils/interfaces/trips.interface";
import axiosInstance from "../../utils/apis/api";

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
  border: none;
  outline: 0;
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

const ModalHeader = styled.article`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  > h3 {
    font-size: ${(props) => props.theme.fontSizes.h3};
    font-weight: 600;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
`;

const Select = styled.select`
  border: none;
  border-radius: 5px;
  width: ${pixelToRem(160)};
  padding: 0 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  height: ${pixelToRem(40)};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: ${(props) => props.theme.colors.gray900};
`;

const StyledAiFillCaretDown = styled(AiFillCaretDown)`
  margin-left: -28px;
  align-self: center;
  width: 24px;
  height: 24px;
`;

const TitleInputWrapper = styled.article`
  width: 100%;
  > label {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray800};
  }
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  height: ${pixelToRem(40)};
  padding: 0 1rem;
  border-radius: 5px;
`;

const MessageWrapper = styled.div`
  min-height: 2rem;
  width: 100%;
  padding: 0.25rem;
  font-size: ${(props) => props.theme.fontSizes.s2};
  color: ${(props) => props.theme.colors.red};
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  display: block;
  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.gray400};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

interface BasicModalProps {
  setOpen: (bool: boolean) => void;
  open: boolean;
  tripInformation?: ITrip;
  setIsCreated?: (bool: boolean) => void;
  refetch?: () => Promise<
    QueryObserverResult<
      InfiniteData<
        | {
            result: any;
            page: any;
          }
        | undefined
      >,
      unknown
    >
  >;
}

interface IDateInformation {
  year: null | number | undefined;
  month: number | string | undefined;
  date: string | undefined;
  day: string;
}

type FormValues = {
  regionId: number;
  title: string;
};

function BasicModal({
  setOpen,
  open,
  tripInformation,
  refetch,
  setIsCreated,
}: BasicModalProps) {
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

  useEffect(() => {
    if (setIsCreated) setIsCreated(false);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      regionId: 1,
      title: "",
    },
  });

  const onChange = (dates: Array<Date | null>) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleClose = () => setOpen(false);

  const handleMonthChange = (date: Date) => {
    setMonth(date.getMonth());
  };

  const setDayColor = useCallback((date: Date) => {
    if (date.getMonth() === month) {
      if (getDayName(createDate(date)) === "토") return "custom-day saturday";
      if (getDayName(createDate(date)) === "일") return "custom-day sunday";
      return "custom-day";
    }
    return "custom-day gray-day";
  }, []);

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
    if (tripInformation?.tripId) {
      setValue("regionId", tripInformation.regionId);
      setValue("title", tripInformation.title);
      setStartDate(new Date(tripInformation.startDate));
      setEndDate(new Date(tripInformation.endDate));
    }
  }, []);

  useEffect(() => {
    handleModifiedStartDate(startDate, setStartDateInformation);
    handleModifiedStartDate(endDate, setEndDateInformation);
  }, [startDate, endDate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!startDate || !endDate) return;
    const body = { startDate, endDate, ...data };
    let response;
    if (tripInformation?.tripId) {
      response = await axiosInstance.patch(
        tripApis.aTrip(tripInformation.tripId),
        body,
      );
    } else {
      response = await axiosInstance.post(tripApis.trip, body);
    }
    try {
      if (response.status === 200) {
        if (refetch) refetch();
        handleClose();
        setValue("regionId", 1);
        setValue("title", "");
        setStartDate(new Date());
        setEndDate(new Date());
        if (setIsCreated) setIsCreated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(MESSAGE_LIST.TRIP_DELETE)) return;
    try {
      const response = await axiosInstance.delete(
        tripApis.aTrip(tripInformation?.tripId),
      );
      if (response.status === 200) {
        if (refetch) refetch();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TripInformationWrapper>
            <ModalHeader>
              <h3>
                <label htmlFor="trip-destination">여행지</label>
              </h3>
              <SelectWrapper>
                <Select
                  id="trip-destination"
                  {...register("regionId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  {REGIONLIST.slice(1).map((region, idx) => (
                    <option value={idx + 1} key={region}>
                      {region}
                    </option>
                  ))}
                </Select>
                <StyledAiFillCaretDown />
              </SelectWrapper>
            </ModalHeader>
            <TitleInputWrapper>
              <label htmlFor="title">여행 제목</label>
              <TitleInput
                {...register("title", {
                  required: "제목을 입력해주세요.",
                  maxLength: {
                    value: 10,
                    message: "제목은 10자 이내로 작성해주세요.",
                  },
                })}
                placeholder="여행 제목을 입력하세요."
                maxLength={10}
              />
              <MessageWrapper>
                <p>{errors?.title?.message}</p>
              </MessageWrapper>
            </TitleInputWrapper>

            <DurationWrapper>
              <DateInfomation {...startDateInfomation} type="시작" />
              <DateInfomation {...endDateInfomation} type="종료" />
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
          <ButtonContainer>
            <SubmitButton
              color="mainLight"
              type="submit"
              disabled={!startDate || !endDate}
            >
              {tripInformation?.tripId ? "여행 수정" : "여행 추가"}
            </SubmitButton>
            {tripInformation?.tripId && (
              <SubmitButton color="red" type="button" onClick={onDelete}>
                삭제
              </SubmitButton>
            )}
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Modal>
  );
}

export default BasicModal;
export const TripManagementModal = memo(BasicModal);
