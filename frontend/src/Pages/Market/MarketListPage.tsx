import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { MemoInfiniteList } from "../../components/modules/infinite/InfiniteList";
import { StickerCard } from "./StickerCard";
import { Skeleton } from "@mui/material";

const Container = styled.article`
  min-height: 90vh;
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
  width: 100%;
  height: 80vh;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: bold;
`;

function MarketListPage() {
  const { regionId } = useParams();
  const regionName = [
    "전체",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];
  const [sorting, setSorting] = useState("0");
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSorting(e.target.value);
  };

  const searchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setKeyword(e.target.value);
  };

  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate("/market/register");
  };

  return (
    <>
      <Helmet>
        <title>마켓 | 리스트</title>
      </Helmet>
      <Container>
        <Header>
          <p>
            {regionName[Number(regionId)]} 지역{" "}
            <AiFillPlusCircle className="sell" onClick={moveToRegisterPage} />
          </p>
          <select onChange={handleChange} value={sorting}>
            <option value="0">최신순</option>
            <option value="1">최저가순</option>
            <option value="2">최고가순</option>
          </select>
        </Header>
        <Search>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={searchChange}
          />
          <button>
            <AiOutlineSearch className="searchIcon" />
          </button>
        </Search>
        <ListContainer>무한스크롤 리스트 못하겠음 해주삼</ListContainer>
      </Container>
    </>
  );
}

export default MarketListPage;
