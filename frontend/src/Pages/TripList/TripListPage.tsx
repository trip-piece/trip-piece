import styled from "@emotion/styled";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InfiniteList from "../../components/infinite/InfiniteList";
import tripApis from "../../utils/apis/tripsApis";
import Card from "./Card";
import Skeleton from "./Skeleton";
import TripCreateButton from "./TripCreateButton";

const Container = styled.main`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray200};
  border-radius: 30px 30px 0 0;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: 700;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FixedContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
function TripListPage() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>여행 폴더 | 여행조각</title>
        </Helmet>
      </HelmetProvider>
      <Container>
        <Title>보유여행티켓</Title>
        <InfiniteList
          url={tripApis.trip}
          queryKey={["tripList"]}
          CardComponent={Card}
          SkeletonCardComponent={Skeleton}
          zeroDataText="여행 리스트가 존재하지 않습니다."
          count={2}
          listName="tripList"
        />
        <FixedContainer>
          <TripCreateButton />
        </FixedContainer>
      </Container>
    </>
  );
}

export default TripListPage;
