import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

interface IDiaryProps {
  diary: {
    tripId: number;
    content: string;
    fontType: number;
    backgroundColor: number;
    weather: number;
    date: string;
  };
  todayPhoto: FormData | undefined;
}

function useWriteDiary() {
  return useMutation((diary: IDiaryProps) =>
    axiosInstance.post(diaryApis.diaryWrite, diary, {
      headers: {
        "Content-Type": "multipart/form-data:",
      },
    }),
  );
}

export default useWriteDiary;
