import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MdLuggage } from "react-icons/md";
import { AxiosResponse } from "axios";
import { ReactComponent as StarIcon } from "../../assets/svgs/starplus.svg";
import {
  pixelToRem,
  changeDateFormatToHyphen,
} from "../../utils/functions/util";
import tripApis from "../../utils/apis/tripsApis";
import axiosInstance from "../../utils/apis/api";

const InsideContent = styled.div`
  position: absolute;
  top: 20%;
  left: 15%;
  right: 15%;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.gray300};
  > h5 {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    > p {
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }
  > p {
    font-size: ${(props) => props.theme.fontSizes.s3};
  }
  > .big-icon {
    margin: 3.125rem 0;
  }
  // 만약 예상 기간이 존재한다면 러기지 아이콘이 작게 보이고 기간이 보임
  // 작은 아이콘 위치와 크기
  > .small-icon {
  }
`;

const RegisterBtn = styled.button`
  width: 60%;
  height: ${pixelToRem(35)};
  background-color: ${(props) => props.theme.colors.yellow};
  border-radius: 1.25rem;
  margin: 0.938rem;
`;

const today = new Date();
const year = today.getFullYear();
const month = `0${today.getMonth() + 1}`.slice(-2);
const day = `0${today.getDate()}`.slice(-2);

const todayDate = `${year}-${month}-${day}`;

interface UpcomingInformation {
  tripId: number;
  regionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

export default function UpcomingPlan({
  tripId,
  regionId,
  title,
  startDate,
  endDate,
}: UpcomingInformation) {
  const [userInfo, setUserInfo] = useState<UpcomingInformation | null>(null);

  const getUpcomingTrip = () =>
    axiosInstance.get(tripApis.upcomingTrip(todayDate));

  useEffect(() => {
    getUpcomingTrip();
  }, [userInfo]);

  return (
    <div>
      {userInfo === null ? (
        <InsideContent>
          <h5>현재 진행 중인 여행</h5>
          <div className="big-icon">
            <StarIcon width="77" height="77" fill="#d4d4d4" />
          </div>
          <p>현재 진행중인 여행이 없습니다.</p>
          <p>여행을 등록해주세요.</p>
          <RegisterBtn>등록하기</RegisterBtn>
        </InsideContent>
      ) : (
        <InsideContent>
          <h5>현재 진행 중인 여행</h5>
          <h5>
            {regionId}
            <p>{title}</p>
          </h5>
          <div className="small-icon">
            <MdLuggage />
          </div>
          <p>{changeDateFormatToHyphen(startDate)}</p>
          <p>{changeDateFormatToHyphen(endDate)}</p>
          <p>즐거운 여행 되세요!</p>
          <RegisterBtn>기록하기</RegisterBtn>
        </InsideContent>
      )}
    </div>
  );
}
