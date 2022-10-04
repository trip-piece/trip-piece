import axios from "axios";

export const getImage = async (tokenUrl: string): any => {
  try {
    const response = await axios.get(
      `https://www.infura-ipfs.io/ipfs/${tokenUrl}`,
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
