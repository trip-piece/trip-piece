/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
// import { v1 } from "uuid";

// export const loggedInState = atom({
//   key: `loggedIn/${v1()}`,
//   default: !!"accessToken",
// });n
export interface IUserInfo {
  address: string | null | undefined;
  nickname: string | undefined;
  balance: number;
  isLoggedIn: boolean;
  id: number;
}

export const UserInfoState = atom<IUserInfo[]>({
  key: "userInfoState",
  default: [
    {
      address: null,
      nickname: undefined,
      balance: 0.0,
      isLoggedIn: false,
      id: -1,
    },
  ],
});

export interface IQrInfo {
  url: (string | Location) & Location;
  modalFlag: boolean;
}

const initialQrInfoState: IQrInfo = { url: null, modalFlag: false };

export const QrInfoState = atom({
  key: "recoilQrState",
  default: initialQrInfoState,
});
