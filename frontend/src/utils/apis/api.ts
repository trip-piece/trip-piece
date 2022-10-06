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

const getNewAccessToken = () => {
  return instance.patch(userApis.tokenReissue, {
    headers: {
      ACCESS_TOKEN: getCookie("accessToken"),
      REFRESH_TOKEN: getCookie("refreshToken"),
    },
  });
};

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log("인터셉터 발동");
    console.log(err);
    console.log(err.response.status);

    const originalConfig = err.config;

    if (err.response) {
      // 토큰없음 -> 랜딩으로 이동

      //리이슈 요청

      if (err.response.status === 401) {
        console.log("401에러");

        try {
          console.log("try");

          const response = getNewAccessToken();

          // const res = instance
          //   .patch(userApis.tokenReissue, {
          //     headers: {
          //       ACCESS_TOKEN: getCookie("accessToken"),
          //       REFRESH_TOKEN: getCookie("refreshToken"),
          //     },
          //   })
          //   .then(
          //     (response: {
          //       data: { accessToken: string; refreshToken: string };
          //     }) => {
          //       setCookie("accessToken", response.data.accessToken, {
          //         maxAge: 1000 * 60 * 60 * 24,
          //         sameSite: true,
          //       });
          //       setCookie("refreshToken", response.data.refreshToken, {
          //         maxAge: 1000 * 60 * 60 * 24 * 7,
          //         sameSite: true,
          //       });

          //       console.log(response.data.accessToken);
          //       console.log(response.data.refreshToken);
          //     },
          //   );

          console.log(response);
          const { accessToken, refreshToken } = response.data;
          console.log(accessToken);

          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          originalConfig.headers.ACCESS_TOKEN = getCookie("accessToken");

          return await axiosInstance(originalConfig);
        } catch (error) {
          if (err.response.status === 400) {
            originalConfig.headers.ACCESS_TOKEN = getCookie("accessToken");

            console.log(originalConfig);

            return axiosInstance(originalConfig);
          }

          if (err.response.status === 403) {
            removeCookie("accessToken");
            removeCookie("refreshToken");

            window.location.replace("http://localhost:3000/");
            return;
          }
        }

        return;
      }

      //썩은 토큰 -> 로그아웃 시키기

      if (err.response.status === 500) {
        removeCookie("accessToken");
        removeCookie("refreshToken");

        window.location.replace("http://localhost:3000/");
        return;
      }

      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);
