import axios, { AxiosInstance } from "axios";
import { getCookie, setCookie } from "../cookie";
import userApis from "./userApis";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "http://j7a607.q.ssafy.io:8080/",
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

const getNewAccessToken = (access: string, refresh: string) => {
  return axiosInstance.patch(userApis.tokenReissue, {
    headers: { ACCESS_TOKEN: access, REFRESH_TOKEN: refresh },
  });
};

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log("인터셉터 발동");
    console.log(err.response.status);
    console.log(err.response);

    const originalConfig = err.config;

    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.data?.error === "TokenExpiredException"
      ) {
        const response = await getNewAccessToken(
          getCookie("ACCESS_TOKEN"),
          getCookie("REFRESH_TOKEN"),
        );
        console.log(response);
        const { accessToken, refreshToken } = response.data;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
      }
    }
  },
);
