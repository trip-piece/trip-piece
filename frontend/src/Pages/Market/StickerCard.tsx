import styled from "@emotion/styled";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import { IMarket } from "../../utils/interfaces/markets.interface";

interface CardProps {
  sticker: IMarket;
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

  .Icon {
    color: ${(props) => props.theme.colors.yellow};
  }
`;

function Card({ sticker }: CardProps) {
  const image = "/image/region/" + sticker.tokenName + ".png";
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState<string>();
  const moveToDetailPage = (marketId: Number) => {
    navigate("/market/" + marketId + "/detail");
  };
  const getImage = (tokenUrl: string): string => {
    fetch(`https://www.infura-ipfs.io/ipfs/${sticker.tokenURL}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImagePath(data[0].image);
      });
    return imagePath;
  };
  getImage(sticker.tokenURL);

  return (
    <Container onClick={() => moveToDetailPage(sticker.marketId)}>
      <div className="ImageBox">
        <img src={imagePath} />
      </div>
      <p className="NFTName">{sticker.tokenName}</p>
      <p className="NFTPrice">
        <FaEthereum className="Icon" />
        {sticker.price}
      </p>
    </Container>
  );
}

export default Card;
export const StickerCard = memo(Card);
