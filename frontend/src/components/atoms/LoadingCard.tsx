import styled from "@emotion/styled";
import { loading } from "../../style/animations";

const Loading = styled.div`
  border-radius: 10px;
  position: relative;
  background-color: #e2e2e2;
  width: 100%;
  height: 30vh;
  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(transparent),
      color-stop(rgba(255, 255, 255, 0.2)),
      to(transparent)
    );

    background: linear-gradient(
      110deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );

    animation: ${loading} 1s infinite;
  }
`;

function LoadingCard() {
  return <Loading />;
}

export default LoadingCard;
