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
  balance: string;
  isLoggedIn: boolean;
  id: number;
  tripCount: number;
  diaryCount: number;

  setBalance?: () => {};
}

const UserInfodata: IUserInfo = {
  address: "",
  nickname: "누군가",
  balance: "0.0",
  isLoggedIn: false,
  id: 0,
  tripCount: 0,
  diaryCount: 0,
};

export const UserInfoState = atom<IUserInfo>({
  key: "userInfoState",
  default: UserInfodata,
});
