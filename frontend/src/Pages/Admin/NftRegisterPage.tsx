import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IMAGE_SIZE_LIMIT_NUMBER } from "../../utils/constants/constant";
import { pixelToRem } from "../../utils/functions/util";
import getAddressFrom from "../../utils/AddressExtractor";
import { NFTContract } from "../../utils/common/NFT_ABI";

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;

  #fileUpload {
    color: ${(props) => props.theme.colors.white};
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: ${pixelToRem(400)};
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  height: ${pixelToRem(40)};
  padding: 0 1rem;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    width: 30%;
    height: 2rem;
    border-radius: 20px;
  }

  .register {
    margin-right: 1rem;
    background: ${(props) => props.theme.colors.yellow};
  }
`;

function NftRegisterPage() {
  const [item, setItem] = useState<File | null>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [NFTName, setNFTName] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNFTName = (e: { target: { value: SetStateAction<string> } }) => {
    setNFTName(e.target.value);
  };

  const handlePrivKey = (e: { target: { value: SetStateAction<string> } }) => {
    setPrivKey(e.target.value);
  };

  const handleItem = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file && file?.size > IMAGE_SIZE_LIMIT_NUMBER) {
      alert("10MB 이하의 이미지를 넣어주세요.");
      return;
    }
    if (file) {
      setItem(file);
    }
  };

  const projectId = import.meta.env.VITE_IPFS_PROJECT_ID;
  const projectSecret = import.meta.env.VITE_PFS_PROJECT_SECRET_KEY;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const createNFT = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (NFTName === "" || NFTName === null) alert("NFT 이름을 입력해주세요.");
      else if (item === null || item === undefined) alert("파일을 넣어주세요.");
      else {
        const PrivKey = "0x" + privKey;
        const myaddress = getAddressFrom(PrivKey);
        const added = await ipfs.add(item);
        const url = `https://www.infura-ipfs.io/ipfs/${added.path}`;
        var metadata = [
          {
            name: NFTName,
            image: url,
          },
        ];
        const metaadded = await ipfs.add(Buffer.from(JSON.stringify(metadata)));
        const tokenUrl = `${metaadded.path}`;

        if (!(window as any).ethereum.enable())
          (window as any).ethereum.enable();
        const result = await NFTContract.methods
          .create(myaddress, tokenUrl)
          .send({ from: myaddress });
        var tokenId = 0;
        if (result.status) {
          tokenId = parseInt(result.events.Transfer.returnValues.tokenId);
          console.log("tokenId : " + tokenId);
        }
        const response = await NFTContract.methods.tokenURI(tokenId).call();
        console.log(response);
        if (response.status) {
          console.log(response);
        }
      }
    } catch (err) {
      console.log("Error uploading the file: ", err);
    }
    alert("생성되었습니다.");
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>관리자페이지-Nft등록 | 여행조각</title>
      </Helmet>
      <Container>
        {!loading && (
          <FormContainer>
            <Title>Nft 등록</Title>
            <input
              type="file"
              id="fileUpload"
              accept="image/png"
              onChange={handleItem}
              ref={fileInput}
            />
            <TitleInput
              placeholder="NFT 스티커 이름"
              onChange={(e) => handleNFTName(e)}
              value={NFTName}
            />
            <TitleInput
              placeholder="개인키"
              onChange={(e) => handlePrivKey(e)}
              value={privKey}
            />
            <ButtonGroup>
              <button type="button" className="register" onClick={createNFT}>
                등록하기
              </button>
              <button type="button">취소하기</button>
            </ButtonGroup>
          </FormContainer>
        )}
        {loading && <Title>NFT 등록중 . . .</Title>}
      </Container>
    </>
  );
}
export default NftRegisterPage;
