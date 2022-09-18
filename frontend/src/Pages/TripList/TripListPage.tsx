import styled from "@emotion/styled";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InfiniteList from "../../components/modules/infinite/InfiniteList";
import tripApis from "../../utils/apis/tripsApis";
import { MemoCard } from "./Card";
import Skeleton from "./Skeleton";
import TripCreateButton from "./TripCreationButton";
import BasicModal from "./Modal";

const Container = styled.main`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
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
  right: 0;
  width: fit-content;
`;

function TripListPage() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>여행 폴더 | 여행조각</title>
        </Helmet>
      </HelmetProvider>
      <Container>
        <Title>보유여행티켓</Title>

        <button type="button" onClick={handleEditMode}>
          {!isEditMode ? "여행 편집" : "편집 완료"}
        </button>

        <InfiniteList
          url={tripApis.trip}
          queryKey={["tripList"]}
          CardComponent={MemoCard}
          SkeletonCardComponent={Skeleton}
          zeroDataText="여행 리스트가 존재하지 않습니다."
          count={2}
          listName="tripList"
          state={isEditMode}
        />
        {!isEditMode && (
          <FixedContainer>
            <TripCreateButton func={handleOpen} />
          </FixedContainer>
        )}
        <BasicModal setOpen={setOpen} open={open} />
      </Container>
    </>
  );
}

export default TripListPage;
