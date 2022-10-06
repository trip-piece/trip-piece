import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { REGIONLIST } from "../../utils/constants/constant";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import { marketApis } from "../../utils/apis/marketApis";
import Skeleton from "../TripList/Skeleton";
import { InfiniteStickerCard } from "./InfiniteStickerCard";

const Container = styled.article`
  min-height: 90vh;
  height: auto;
  padding: 0 5vw 0 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .sell {
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.yellow};
  }
`;

const Search = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  margin-top: 1rem;

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

const Header = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    font-size: ${(props) => props.theme.fontSizes.h2};
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;
  }

  select {
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.yellow};
    background-color: transparent;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
`;

const ListContainer = styled.article`
  min-height: 80vh;
  width: 100%;
  height: auto;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.mainDark};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
`;

function MarketUserPage() {
  const { regionId, orderNum, getSearchKeyword } = useParams();
  const regionName = REGIONLIST;
  const [keyword, setKeyword] = useState("");

  var searchKeyword: string = "";
  if (getSearchKeyword) {
    searchKeyword = getSearchKeyword;
  }

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    navigate(`/market/${regionId}/${e.target.value}/${searchKeyword}`);
  };

  const searchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setKeyword(e.target.value);
  };

  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate("/market/register");
  };
  const moveToListPage = () => {
    navigate(`/market/${regionId}/${orderNum}/${searchKeyword}`);
  };

  const searchSticker = () => {
    navigate(`/market/${regionId}/0/${keyword}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>마켓 | 리스트</title>
      </Helmet>
      <Container>
        <Header>
          <p>
            내 스티커
            <AiFillPlusCircle className="sell" onClick={moveToRegisterPage} />
          </p>
        </Header>
        <ListContainer>
          <MemoInfiniteList
            url={marketApis.getMyStickerList}
            queryKey={[`MarketMyStickerList`]}
            CardComponent={InfiniteStickerCard}
            SkeletonCardComponent={Skeleton}
            zeroDataText="판매중인 스티커가 존재하지 않습니다."
            count={2}
          />
        </ListContainer>
      </Container>
    </motion.div>
  );
}

export default MarketUserPage;
