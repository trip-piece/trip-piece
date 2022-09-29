import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

interface IStickerPost {
  tokenId: number;
  x: number;
  y: number;
}

interface IDecoration {
  diaryId: number;
  stickerList: IStickerPost[];
}

interface DecorationProps {
  decoration: IDecoration;
  frameImage?: FormData;
}

function useDecorateDiary() {
  return useMutation((decoration: DecorationProps) =>
    axiosInstance.post(diaryApis.diaryDecoration, decoration, {
      headers: {
        "Content-Type": "multipart/form-data:",
      },
    }),
  );
}

export default useDecorateDiary;
