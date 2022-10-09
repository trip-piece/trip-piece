import styled from "@emotion/styled";
import Spinner from "../atoms/Spinner";

const SpinnerContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

export default Loading;
