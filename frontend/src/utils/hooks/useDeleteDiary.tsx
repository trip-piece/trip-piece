import { useMutation } from "react-query";
import axiosInstance from "../apis/api";
import diaryApis from "../apis/diaryApis";

function useDeleteDiary() {
  return useMutation((diaryId: number) =>
    axiosInstance.delete(`${diaryApis.diary}`, { data: { diaryId } }),
  );
}

export default useDeleteDiary;
