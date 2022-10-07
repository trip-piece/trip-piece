import axios, { AxiosInstance } from "axios";
import { getCookie, setCookie, removeCookie } from "../cookie";
import userApis from "./userApis";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "http://j7a607.q.ssafy.io:8080/",
  baseURL: "https://j7a607.q.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const instance = axios.create({
  baseURL: "https://j7a607.q.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.ACCESS_TOKEN = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
