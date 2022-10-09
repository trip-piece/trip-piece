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

interface propsType {
  name: string;
  id: number;
}

function RegionCard({ name, id }: propsType) {
  const image = "/image/region/" + name + ".png";
  const searchKeyword = "";
  const orderNum = "0";
  const navigate = useNavigate();
  const moveToListPage = (regionId: Number) => {
    navigate(`/market/${regionId}/${orderNum}/${searchKeyword}`);
  };
  return (
    <Container onClick={() => moveToListPage(id)}>
      <img src={image} />
      <div className="BackgroundOpacitiy" />
      <p>{name}</p>
    </Container>
  );
}

export default RegionCard;
