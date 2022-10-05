import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useEditDiary() {
  return useMutation((diary: FormData) =>
    axiosInstance.post(diaryApis.diaryEdit, diary, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }),
  );
}

export default useEditDiary;
