import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useEditDiary() {
  return useMutation((decoration: FormData) =>
    axiosInstance.post(diaryApis.diaryEdit, decoration, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }),
  );
}

export default useEditDiary;
