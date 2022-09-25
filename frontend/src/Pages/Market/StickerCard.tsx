import styled from "@emotion/styled";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

interface CardProps {
  sticker: {
    marketId: number;
    image: string;
    name: string;
    price: number;
  };
}

const Container = styled.article`
  width: 100%;
  height: 32vh;
  text-align: center;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 2px 2px 5px 2px ${(props) => props.theme.colors.gray700};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .ImageBox {
    height: 70%;
    img {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 20px;
      object-fit: contain;
    }
  }

  .NFTName {
    height: 15%;
    margin-left: 1rem;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.h3};
    margin-top: 0.3rem;
  }

  .NFTPrice {
    height: 15%;
    font-size: ${(props) => props.theme.fontSizes.h4};
    margin-right: 1rem;
    color: ${(props) => props.theme.colors.blue};
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;

function Card({ sticker }: CardProps) {
  const image = "/image/region/" + sticker.name + ".png";
  const navigate = useNavigate();
  const moveToDetailPage = (marketId: Number) => {
    navigate("/market/" + marketId + "/detail");
  };
  return (
    <Container onClick={() => moveToDetailPage(sticker.marketId)}>
      <div className="ImageBox">
        <img src={sticker.image} />
      </div>
      <p className="NFTName">{sticker.name}</p>
      <p className="NFTPrice">
        <FaEthereum />
        {sticker.price}
      </p>
    </Container>
  );
}

export default Card;
export const StickerCard = memo(Card);
