import styled from "@emotion/styled";
import React from "react";

interface TripDateProps {
  date: number;
}

const DateContainer = styled.div`
  width: fit-content;
  background-color: yellow;
`;

function TripDate({ date }: TripDateProps) {
  return <DateContainer>{date}</DateContainer>;
}

export default TripDate;
