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
  tripCount: number;
  diaryCount: number;
}

const UserInfodata: IUserInfo = {
  address: "",
  nickname: "",
  balance: 0.0,
  isLoggedIn: false,
  id: -1,
  tripCount: 0,
  diaryCount: 0,
};

export const UserInfoState = atom({
  key: "userInfoState",
  default: UserInfodata,
});
