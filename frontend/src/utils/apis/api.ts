import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://j7a607.q.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
