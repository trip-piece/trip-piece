import styled from "@emotion/styled";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.main`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 2rem;
`;
function TripListPage() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>여행 폴더 | 여행조각</title>
        </Helmet>
      </HelmetProvider>
      <Container>보유여행티켓</Container>
    </>
  );
}

export default TripListPage;
