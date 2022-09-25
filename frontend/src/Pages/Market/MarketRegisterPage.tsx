import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";

const Container = styled.article`
  min-height: 90vh;
  padding: 0 5vw 0 5vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const StickerCard = styled.article`
  width: 100%;
  height: 40vh;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 1.5rem;

  img {
    display: block;
    width: 100%;
    height: 80%;
    padding: 10px;
    border-radius: 20px;
    object-fit: contain;
  }

  p {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray700};
    font-weight: bold;
  }
`;

const RegisterForm = styled.article`
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  margin-top: 1.5rem;

  select {
    width: 100%;
    height: 30%;
    border-radius: 20px;
    border: 0.5px solid ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    text-align: center;
  }

  input {
    width: 100%;
    height: 30%;
    border-radius: 20px;
    border: 0.5px solid ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    text-align: center;
  }
`;

const Button = styled.article`
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  button {
    width: 40%;
    height: 100%;
    border-radius: 10px;
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    margin: 0.5rem;
    background-color: ${(props) => props.theme.colors.gray300};
  }

  .register {
    background-color: ${(props) => props.theme.colors.yellow};
  }
`;

interface StickerProps {
  image: string;
  name: string;
}

function StickerDetailPage() {
  const result = [
    {
      image:
        "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
      name: "NFT카드1",
    },
    {
      image:
        "https://www.infura-ipfs.io/ipfs/QmRkTWeyoREXuJ9s2vCtPTwvA1iaPjGS29Ei2fKZFZisGL",
      name: "NFT카드2",
    },
    {
      image:
        "https://www.infura-ipfs.io/ipfs/QmXyV1fnFM4EYv42KyfAyzXNX8bu73zpqQndoJBQPbL5pF",
      name: "NFT카드3",
    },
    {
      image:
        "https://www.infura-ipfs.io/ipfs/QmPPEWSC7qX7rzxE76XJLkNQk2d95r6BSfiPMS3tNs4p1y",
      name: "NFT카드4",
    },
    {
      image:
        "https://www.infura-ipfs.io/ipfs/QmQyqcdu8HhnN3tfJtzAduS59GJt4ZNxjSXnTaim72fxCU",
      name: "NFT카드5",
    },
  ];

  const [sticker, setSticker] = useState<StickerProps>(result[0]);
  const [price, setPrice] = useState(Number);

  const handleChangeSticker = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSticker(result[Number(e.target.value)]);
  };

  const handleChangePrice = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPrice(Number(e.target.value));
  };

  const navigate = useNavigate();
  const moveToBeforePage = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>마켓 | 판매 등록</title>
      </Helmet>
      <Container>
        <StickerCard>
          {sticker !== undefined && (
            <>
              <img src={sticker.image} />
              <p>{sticker.name}</p>
            </>
          )}
        </StickerCard>
        <RegisterForm>
          <select
            placeholder="스티커를 선택해주세요."
            onChange={(e) => handleChangeSticker(e)}
          >
            {result.length &&
              result.map((sticker, idx) => (
                <option value={idx}>{sticker.name}</option>
              ))}
          </select>
          <input
            type="number"
            placeholder="가격을 입력해주세요."
            onChange={(e) => handleChangePrice(e)}
            value={price}
          />
        </RegisterForm>
        <Button>
          {/* 수정이면 수정 버튼으로.. */}
          <button className="register">등록</button>
          <button onClick={moveToBeforePage}>취소</button>
        </Button>
      </Container>
    </>
  );
}

export default StickerDetailPage;
