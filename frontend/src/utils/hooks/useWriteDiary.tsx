import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";
import { IWritedDiary } from "../interfaces/diarys.interface";

function useWriteDiary() {
  return useMutation((diary: IWritedDiary<FormData | undefined | null>) =>
    axiosInstance.post(diaryApis.diaryWrite, diary, {
      headers: {
        "Content-Type": "multipart/form-data:",
      },
    }),
  );
}

export default useWriteDiary;
