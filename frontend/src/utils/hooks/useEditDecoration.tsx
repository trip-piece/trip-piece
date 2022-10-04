import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useEditDecoration() {
  return useMutation((decoration: FormData) =>
    axiosInstance.post(diaryApis.diary, decoration, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }),
  );
}

export default useEditDecoration;
