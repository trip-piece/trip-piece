import axios from "axios";

interface TokenDetail {
  tokenName: string;
  imagePath: string;
}

export const getNFTImagePath = async (
  tokenId: number,
  tokenURI: string,
  info: any,
): Promise<TokenDetail> => {
  try {
    const response = await axios.get(
      `https://www.infura-ipfs.io/ipfs/${tokenURI}`,
    );
    const { data } = response;
    const token = {
      tokenId,
      tokenName: data[0].name,
      imagePath: data[0].image,
      ...info,
    };
    return token;
  } catch (err) {
    console.log(err);
  }
};
