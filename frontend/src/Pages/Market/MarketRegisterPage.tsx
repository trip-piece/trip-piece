import styled from "@emotion/styled";
import { SetStateAction, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Navigation } from "swiper";
import { UserInfoState } from "../../store/atom";
import { NFTContract } from "../../utils/common/NFT_ABI";

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

interface TokenDetail {
  tokenName: string;
  imagePath: string;
}

interface NFT {
  tokenId: number;
  tokenURI: string;
}

function MarketRegisterPage() {
  const [userInfo] = useRecoilState(UserInfoState);
  const [loading, setLoading] = useState<boolean>(true);
  const [NFTList, setNFTList] = useState<NFT[]>([]);
  const [NFTDetailList, setNFTDetailList] = useState<TokenDetail[]>([]);
  console.log(userInfo.address);

  const getNFTList = async () => {
    try {
      setLoading(true);
      const result = await NFTContract.methods
        .getStickerList(userInfo.address)
        .call();
      if (result) {
        setNFTList(result);
        const tokenList: React.SetStateAction<TokenDetail[]> = [];
        for (var i = 0; i < result.length; i++) {
          await fetch(`https://www.infura-ipfs.io/ipfs/${result[i].tokenURI}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const token: TokenDetail = {
                tokenName: String(data[0].name),
                imagePath: String(data[0].image),
              };
              tokenList.push(token);
            });
        }
        setNFTDetailList(tokenList);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error getSticker : ", err);
    }
  };
  useEffect(() => {
    getNFTList();
  }, []);

  const [sticker, setSticker] = useState<TokenDetail>(NFTDetailList[0]);
  const [price, setPrice] = useState(Number);

  const handleChangeSticker = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSticker(NFTDetailList[Number(e.target.value)]);
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
              <img src={sticker.imagePath} />
              <p>{sticker.tokenName}</p>
            </>
          )}
        </StickerCard>
        <RegisterForm>
          <select
            placeholder="스티커를 선택해주세요."
            onChange={(e) => handleChangeSticker(e)}
          >
            {NFTDetailList?.length &&
              NFTDetailList?.map((sticker, idx) => (
                <option value={idx}>{sticker.tokenName}</option>
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

export default MarketRegisterPage;
