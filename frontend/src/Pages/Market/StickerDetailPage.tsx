import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsFillCreditCardFill } from "react-icons/bs";
import { IMarket } from "../../utils/interfaces/markets.interface";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../utils/apis/api";
import { useQuery } from "react-query";
import { marketApis } from "../../utils/apis/marketApis";

const Container = styled.article`
  min-height: 90vh;
  padding: 0 5vw 0 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StickerCard = styled.article`
  width: 100%;
  height: 55vh;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

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

const Price = styled.article`
  width: 100%;
  height: 12vh;
  padding-left: 5vw;
  padding-top: 3vh;
  p {
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.white};
    padding-bottom: 1.5vh;
  }

  .price {
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.yellow};
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 1rem;

    p {
      width: 100%;
      font-size: ${(props) => props.theme.fontSizes.h3};
      color: ${(props) => props.theme.colors.white};
      padding-left: 1rem;
    }
  }
`;

const Button = styled.article`
  width: 100%;
  height: 10vh;
  padding: 1rem;

  button {
    width: 100%;
    height: 7vh;
    border-radius: 10px;
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    vertical-align: center;

    p {
      margin-left: 0.5rem;
    }
  }
`;

function StickerDetailPage() {
  const { marketId } = useParams();
  const [imagePath, setImagePath] = useState<string>();
  const { data } = useQuery<AxiosResponse<IMarket>, AxiosError>(
    ["marketDetail"],
    () => axiosInstance.get(marketApis.getMarketDetail(marketId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  const getImage = (tokenUrl: string): string => {
    fetch(`https://www.infura-ipfs.io/ipfs/${data?.data?.tokenURL}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImagePath(data[0].image);
      });
    return imagePath;
  };
  getImage(data?.data?.tokenURL);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>마켓 | 판매 스티커 상세 조회</title>
      </Helmet>
      <Container>
        <StickerCard>
          <img src={imagePath} />
          <p>{data?.data?.tokenName}</p>
        </StickerCard>
        <Price>
          <p>판매 가격</p>
          <div className="price">
            <FaEthereum />
            <p>{data?.data?.price}</p>
          </div>
        </Price>
        <Button>
          {/* 판매글을 올린 userId가 로그인한 userId와 같으면 판매 취소 버튼으로.. */}
          <button>
            <BsFillCreditCardFill />
            <p>구매</p>
          </button>
        </Button>
      </Container>
    </motion.div>
  );
}

export default StickerDetailPage;
