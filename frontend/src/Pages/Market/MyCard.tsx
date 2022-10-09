import styled from "@emotion/styled";
import { width } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Container = styled.article`
  width: 100%;
  height: 24vh;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 2px #404040;
  position: relative;
  img {
    width: 100%;
    height: 24vh;
    object-fit: fill;
    border-radius: 20px;
  }

  .BackgroundOpacitiy {
    width: 100%;
    height: 24vh;
    background-color: black;
    opacity: 0.3;
    border-radius: 20px;
    position: absolute;
    top: 0;
  }

  p {
    width: 12vw;
    position: absolute;
    z-index: 9999;
    color: white;
    font-size: 5.5vw;
    top: 75%;
    left: 7%;
  }
`;

function MyCard() {
  const image = "/image/region/내꺼.png";
  const navigate = useNavigate();
  const moveToListPage = () => {
    navigate(`/market/my`);
  };
  return (
    <Container onClick={() => moveToListPage()}>
      <img src={image} />
      <div className="BackgroundOpacitiy" />
      <p>내꺼</p>
    </Container>
  );
}

export default MyCard;
