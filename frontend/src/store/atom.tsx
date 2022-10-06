import { atom } from "recoil";

export interface IUserInfo {
  address: string | null | undefined;
  nickname: string;
  balance: string;

  id: number;
  tripCount: number;
  diaryCount: number;

  setBalance?: () => {};
}

const UserInfodata: IUserInfo = {
  address: "",
  nickname: "누군가",
  balance: "0.0",
  id: 0,
  tripCount: 0,
  diaryCount: 0,
};

export const isLoggedinState = atom<boolean>({
  key: "isLoggedinState",
  default: false,
});

export const UserInfoState = atom<IUserInfo>({
  key: "userInfoState",
  default: UserInfodata,
});

export interface IQrInfo {
  url: (string | Location) & Location;
  modalFlag: boolean;
  correct?: boolean;
}

const initialQrInfoState: IQrInfo = {
  url: null,
  modalFlag: false,
  correct: false,
};

export const QrInfoState = atom({
  key: "recoilQrState",
  default: initialQrInfoState,
});

export const frameRegionListState = atom<number[]>({
  key: "frameRegionListState",
  default: [],
});
