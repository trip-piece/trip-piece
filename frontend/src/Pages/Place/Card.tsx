import styled from "@emotion/styled";
import { memo, useEffect, useState } from "react";
import { changeDateFormatToDot } from "../../utils/functions/util";
import {
  IDistinctSticker,
  ISticker,
} from "../../utils/interfaces/places.interface";

interface IPlaceCardProps {
  id: number;
  name: string;
  regionId: number;
  regionName: string;
  locationAddress: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  type: number;
  amount: number;
  enableStickerList: ISticker[];
  disinctStickerList: IDistinctSticker[];
  qrImage: string;
  posterImage: string;
  code: string;
}

interface Token {
  tokenName: string;
  imagePath: string;
}

const Container = styled.div`
  width: 100%;
  max-width: 550px;
  min-width: 320px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .date {
    width: 65%;
    text-align: right;
    padding-top: 0.7rem;
    padding-right: 0.5rem;
  }

  .placeName {
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-weight: bold;
    width: 55%;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
`;

const StickerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
  height: 15vh;
  border-radius: 20px;
  width: 100%;
  padding: 0.2rem 0.7rem 0.2rem 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .stickerGroup {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .sticker {
      width: 100%;
      height: 80%;
      text-align: center;
      .stickerImage {
        width: auto;
        height: 100%;
        object-fit: contain;
      }
      p {
        text-align: center;
        font-size: ${(props) => props.theme.fontSizes.s4};
      }
    }
  }

  .location {
    width: 100%;
    height: 10%;
    font-size: ${(props) => props.theme.fontSizes.s4};
    padding-left: 1rem;
  }
`;

function Card(place: IPlaceCardProps) {
  const [NFTDetailList, setNFTDetailList] = useState<Token[]>([]);

  const getImage = async () => {
    const tokenList: React.SetStateAction<Token[]> = [];
    for (let i = 0; i < place.disinctStickerList.length; i++) {
      await fetch(
        `https://www.infura-ipfs.io/ipfs/${place.disinctStickerList[i].tokenURL}`,
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const token: Token = {
            tokenName: String(data[0].name),
            imagePath: String(data[0].image),
          };
          tokenList.push(token);
        });
    }
    setNFTDetailList(tokenList);
  };

  useEffect(() => {
    getImage();
  }, [place]);

  return (
    <Container>
      <div className="title">
        <p className="placeName">{place.name}</p>
        <p className="date">
          {changeDateFormatToDot(place.startDate)} -{" "}
          {changeDateFormatToDot(place.endDate)}
        </p>
      </div>
      <StickerContainer>
        <div className="location">{place.locationAddress}</div>
        <div className="stickerGroup">
          {NFTDetailList.map((sticker, idx) => (
            <div className="sticker" key={idx}>
              <img
                src={sticker.imagePath}
                className="stickerImage"
                alt="기본이미지"
              />
              <p>남은 수량 : {place.disinctStickerList[idx].amount}</p>
            </div>
          ))}
        </div>
      </StickerContainer>
    </Container>
  );
}

export default Card;
export const MemoCard = memo(Card);
