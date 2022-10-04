import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { pixelToRem } from "../../utils/functions/util";
import { UserInfoState } from "../../store/atom";
import { NFTContract } from "../../utils/common/NFT_ABI";
import spinner from "../../assets/image/spinner.gif";

const StickerBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: 0 ${pixelToRem(18)} 0 ${pixelToRem(18)};
  margin: ${pixelToRem(15)};

  min-height: 65vh;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  height: 10%;
  width: 100%;
  padding: ${pixelToRem(17)} 0 ${pixelToRem(5)} 0;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
  justify-content: center;
  display: flex;
`;
const Title = styled.div`
  font-weight: bold;

  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const StickerContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.gray900};
  padding: ${pixelToRem(18)} 0 0 0;

  .gridComponent {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, auto));

    img {
      width: 100%;
      height: auto;
    }

    p {
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }
`;

interface TokenDetail {
  tokenName: string;
  imagePath: string;
}

function MyStickerList() {
  const [userInfo] = useRecoilState(UserInfoState);
  const [loading, setLoading] = useState<boolean>(true);
  const [NFTDetailList, setNFTDetailList] = useState<TokenDetail[]>([]);

  const getNFTList = async () => {
    try {
      setLoading(true);
      const result = await NFTContract.methods
        .getStickerList(userInfo.address)
        .call();
      if (result) {
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
          setNFTDetailList(tokenList);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log("Error getSticker : ", err);
    }
  };

  useEffect(() => {
    getNFTList();
  }, [userInfo]);

  return (
    <StickerBox>
      <TitleBox>
        <Title>보유NFT스티커</Title>
      </TitleBox>
      <StickerContainer>
        {loading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={spinner}
              style={{ width: "50%", height: "auto", textAlign: "center" }}
            />
          </div>
        )}
        {!loading && (
          <div className="gridComponent">
            {NFTDetailList.map((NFTdetail, idx) => (
              <div key={idx} style={{ padding: "0.5rem" }}>
                <img src={NFTdetail.imagePath} alt="" />
                <p>{NFTdetail.tokenName}</p>
              </div>
            ))}
          </div>
        )}
      </StickerContainer>
    </StickerBox>
  );
}

export default MyStickerList;
