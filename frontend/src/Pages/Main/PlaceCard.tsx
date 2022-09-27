import styled from "@emotion/styled";
import { memo } from "react";
import { REGIONLIST } from "../../utils/constants/constant";

interface CardProps {
  place: {
    placeId: number;
    regionId: number;
    name: string;
    image: string;
  };
}

const Container = styled.article`
  width: 100%;
  height: 20vh;
  text-align: center;
  background: black;
  box-shadow: 2px 2px 5px 2px ${(props) => props.theme.colors.gray700};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: relative;

  .ImageBox {
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: fill;
      position: absolute;
      opacity: 0.5;
    }
  }

  .PlaceRegion {
    height: 100%;
    margin-left: 1rem;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.h3};
    margin-top: 3vh;
    z-index: 999;
    color: ${(props) => props.theme.colors.white};
  }

  .PlaceName {
    height: 100%;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.white};
    z-index: 999;
    margin-top: 5vh;
  }
`;

function Card({ place }: CardProps) {
  return (
    <Container>
      <div className="ImageBox">
        <img src={place.image} />
      </div>
      <p className="PlaceRegion">{REGIONLIST[place.regionId]} 지역</p>
      <p className="PlaceName">{place.name}</p>
    </Container>
  );
}

export default Card;
export const PlaceCard = memo(Card);
