import axios, { AxiosInstance } from "axios";
import { getCookie, setCookie } from "../cookie";
import userApis from "./userApis";

const axiosInstance: AxiosInstance = axios.create({
  //baseURL: "http://j7a607.q.ssafy.io:8080",
  //baseURL: "https://j7a607.q.ssafy.io/api",
  baseURL: "api",
  headers: {
    "Content-Type": "application/json",
    ACCESS_TOKEN: getCookie("accessToken"),
    "Access-Control-Allow-Origin": "*",
  },
});

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

export default axiosInstance;
