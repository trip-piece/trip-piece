import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import RegionCard from "./RegionCard";
import Card from "./StickerCard";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGIONLIST } from "../../utils/constants/constant";
import { marketApis } from "../../utils/apis/marketApis";
import axiosInstance from "../../utils/apis/api";
import { useQuery } from "react-query";
import { MarketStikcerListResponse } from "../../utils/interfaces/markets.interface";
import { AxiosError, AxiosResponse } from "axios";
import { NFTContract } from "../../utils/common/NFT_ABI";
import { useRecoilState } from "recoil";
import { UserInfoState } from "../../store/atom";

const Container = styled.article`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 5vw 0 5vw;
`;

const Search = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  margin-bottom: 1rem;

  input {
    background-color: transparent;
    border: solid 0.1px ${(props) => props.theme.colors.white};
    border-radius: 5px;
    width: 85%;
    height: 100%;
    color: ${(props) => props.theme.colors.white};
    padding: 1rem;
  }

  button {
    height: 100%;
    width: 3rem;
    color: ${(props) => props.theme.colors.white};
    background-color: transparent;

    .searchIcon {
      height: 100%;
      width: 100%;
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 45vh;

  .Header {
    display: flex;
    flex-direction: column;
    justify-content: end;
    p {
      font-size: ${(props) => props.theme.fontSizes.h3};
      color: ${(props) => props.theme.colors.white};
      font-weight: bold;
    }

    hr {
      width: 100%;
      border: solid 0.1px ${(props) => props.theme.colors.gray400};
    }

    button {
      text-align: right;
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      color: ${(props) => props.theme.colors.yellow};
      background-color: transparent;
    }
  }

  .CardList {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 32vh;
      overflow-y: hidden;
    }

    .swiper-wrapper {
      width: 100%;
      height: 32vh;
      display: -webkit-inline-box;
    }
  }
`;

const CateContainer = styled.article`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 15px;

  .Header {
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;

    hr {
      width: 100%;
      border: solid 0.1px ${(props) => props.theme.colors.gray400};
    }
  }

  .CateList {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 27vh;
      overflow-y: hidden;
    }

    .swiper-wrapper {
      width: 100%;
      height: 27vh;
      display: -webkit-inline-box;
    }
  }
`;

function MarketMainPage() {
  const [userInfo] = useRecoilState(UserInfoState);
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useQuery<
    AxiosResponse<MarketStikcerListResponse>,
    AxiosError
  >(
    ["marketStickerList"],
    () => axiosInstance.get(marketApis.getMarketList("", 0, 0)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  const region = REGIONLIST;

  const [keyword, setKeyword] = useState("");

  const searchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setKeyword(e.target.value);
  };

  const navigate = useNavigate();
  const moveToListPage = (regionId: Number) => {
    navigate("/market/" + regionId);
  };
  const moveToRegisterPage = () => {
    navigate("/market/register");
  };

  const setApproval = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    try{
      const approveResult = await NFTContract.methods
            .setApprovalForAll(import.meta.env.VITE_MARKET_CA, true)
            .send({ from: userInfo.address });
  
          console.log("권한 부여 성공" + approveResult.status);
    }catch (err){
      console.log(err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>마켓</title>
      </Helmet>
      <Container>
        <Search>
          <input
            type="text"
            value={keyword}
            onChange={searchChange}
            placeholder="검색어를 입력하세요."
          />{" "}
          <button>
            <AiOutlineSearch className="searchIcon" />
          </button>
        </Search>
        <button onClick={setApproval}>
          TripPiece Access
        </button>
        <CardContainer>
          <div className="Header">
            <p>
              판매 목록
              <button onClick={moveToRegisterPage}>
                {" "}
                <AiFillPlusCircle className="sell" />
              </button>
            </p>
            <hr />
            <button onClick={() => moveToListPage(0)}>전체 보기</button>
          </div>
          <div className="CardList">
            <Swiper slidesPerView={1.2} spaceBetween={13}>
              {data?.data?.content?.length &&
                data?.data?.content?.map((sticker, idx) => (
                  <SwiperSlide key={idx}>
                    <Card sticker={sticker} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </CardContainer>
        <CateContainer>
          <div className="Header">
            <p>카테고리</p>
            <hr />
          </div>
          <div className="CateList">
            <Swiper slidesPerView={1.9} spaceBetween={13}>
              {region.length &&
                region.map(
                  (region, idx) =>
                    idx !== 0 && (
                      <SwiperSlide key={idx}>
                        <RegionCard name={region} id={idx} />
                      </SwiperSlide>
                    ),
                )}
            </Swiper>
          </div>
        </CateContainer>
      </Container>
    </motion.div>
  );
}

export default MarketMainPage;
