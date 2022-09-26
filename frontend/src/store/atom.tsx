/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";
// import { v1 } from "uuid";

// export const loggedInState = atom({
//   key: `loggedIn/${v1()}`,
//   default: !!"accessToken",
// });n
export interface IUserInfo {
  address: string | null | undefined;
  nickname: string;
  balance: number;
  isLoggedIn: boolean;
  id: number;
}

export const UserInfoState = atom<IUserInfo[]>({
  key: "userInfoState",
  default: [
    {
      address: "null",
      nickname: "null",
      balance: 0.0,
      isLoggedIn: false,
      id: -1,
    },
  ],
});

interface IQrInfo {
  url: string | null;
}

const initialQrInfoState: IQrInfo = { url: null };

export const QrInfoState = atom({
  key: "recoilQrState",
  default: initialQrInfoState,
});
