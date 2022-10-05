import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useWriteDiary() {
  return useMutation((diary: FormData) =>
    axiosInstance.post(diaryApis.diaryWrite, diary, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }),
  );
}

export default useWriteDiary;
