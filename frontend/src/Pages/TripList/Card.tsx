import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { REGIONLIST } from "../../utils/constants/constant";
import { changeDateForamt } from "../../utils/functions/util";

interface ITripCardProps {
  tripId: number;
  regionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray400};
  height: 200px;
  width: 100%;
`;

function Card({ tripId, regionId, title, startDate, endDate }: ITripCardProps) {
  return (
    <Link to={`trips/${tripId}`}>
      <Container>
        <h3>
          No.{tripId} {title}
        </h3>
        <h4>{REGIONLIST[regionId]}</h4>
        <div>
          {changeDateForamt(startDate)} -{changeDateForamt(endDate)}
        </div>
      </Container>
    </Link>
  );
}

export default Card;
