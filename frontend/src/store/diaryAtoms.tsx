import { atom, selectorFamily } from "recoil";
import { IWritedDiary } from "../utils/interfaces/diarys.interface";

export const diaryListState = atom<{
  [key: string]: IWritedDiary<File | undefined>;
}>({
  key: "diaryListState",
  default: {},
});

export const writedDiaryState = selectorFamily({
  key: "writedDiaryState",
  get:
    (diaryInfo: string) =>
    ({ get }) => {
      return get(diaryListState)[diaryInfo];
    },
  set:
    (diaryInfo: string) =>
    ({ set }, newValue: any) => {
      set(diaryListState, (prevState) => ({
        ...prevState,
        [diaryInfo]: newValue,
      }));
    },
});
