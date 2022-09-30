import styled from "@emotion/styled";
import { memo, MouseEvent, useState } from "react";
import { InfiniteData, QueryObserverResult } from "react-query";
import { Link } from "react-router-dom";
import { REGIONLIST } from "../../utils/constants/constant";
import { changeDateForamtToDot } from "../../utils/functions/util";
import { ISticker } from "../../utils/interfaces/places.interface";

interface IPlaceCardProps {
  id: number;
  name: string;
  regionId: number;
  regionName: string;
  locationAddress: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  type: number;
  amount: number;
  enableStickerList: ISticker[];
  distinctStickerList: ISticker[];
  qrImage: string;
  posterImage: string;
  code: string;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray200};
  height: 150px;
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
`;

function Card(place: IPlaceCardProps) {
  return <Container></Container>;
}

export default Card;
export const MemoCard = memo(Card);
