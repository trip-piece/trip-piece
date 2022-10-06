import Cookies from "universal-cookie";

const cookies = new Cookies();

const nowTime = new Date();
const setAccessTime = new Date();
const setRefreshTime = new Date();

export const accessTokenExpiredSetting = () => {
  setAccessTime.setDate(nowTime.getDate() + 1);
  return setAccessTime;
};
export const refreshTokenExpiredSetting = () => {
  setRefreshTime.setDate(nowTime.getDate() + 7);
  return setRefreshTime;
};

export const setCookie = (name: string, value: string | null, option?: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
