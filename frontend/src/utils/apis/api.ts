import axios from "axios";

interface IRequestParameter {
  url: string;
  body?: object;
  option?: object;
}

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchData = {
  get: async ({ url, option }: IRequestParameter) =>
    axiosInstance.get(url, option),
  post: async ({ url, body, option }: IRequestParameter) =>
    axiosInstance.post(url, body, option),
  put: async ({ url, body, option }: IRequestParameter) =>
    axiosInstance.put(url, body, option),
  patch: async ({ url, body, option }: IRequestParameter) =>
    axiosInstance.patch(url, body, option),
  delete: async ({ url, option }: IRequestParameter) =>
    axiosInstance.delete(url, option),
};

export default fetchData;
