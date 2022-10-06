import styled from "@emotion/styled";
import React from "react";
import LoadingCard from "../atoms/LoadingCard";

const LoadingContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

function InfiniteLoading() {
  return (
    <LoadingContainer>
      {Array(8)
        .fill(0)
        .map(() => (
          <LoadingCard />
        ))}
    </LoadingContainer>
  );
}

export default InfiniteLoading;
