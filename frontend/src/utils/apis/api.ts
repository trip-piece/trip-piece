import axios, { AxiosInstance } from "axios";
import { getCookie } from "../cookie";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "http://j7a607.q.ssafy.io:8080",
  // baseURL: "https://j7a607.q.ssafy.io/",
  headers: {
    "Content-Type": "application/json",
    ACCESS_TOKEN: getCookie("accessToken"),
    // "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
