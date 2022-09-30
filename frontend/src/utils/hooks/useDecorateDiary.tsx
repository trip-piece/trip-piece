import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useDecorateDiary() {
  return useMutation((decoration: FormData) =>
    axiosInstance.post(diaryApis.diaryDecoration, decoration, {
      headers: {
        "Content-Type": "multipart/form-data:",
      },
    }),
  );
}

export default useDecorateDiary;
