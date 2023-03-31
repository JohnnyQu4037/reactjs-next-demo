import axios, { AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import storage from "store";
import { ACCESS_TOKEN_KEY } from "@/constant/enums/cache";
import { message as $message } from "antd";
import { HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED, AXIOS_TIMEOUT } from "@/constant/enums/http";

// const VITE_BASE_API = "https://api-rh-prospero.sigmarisk.com.au/api/v1/";
const VITE_BASE_API = "http://47.74.91.161:5000/api/v1/";

const UNKNOWN_ERROR = "unknown error!";

const baseApiUrl = VITE_BASE_API;
const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 30000,
});

// Request interceptors
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response.data;

    return res;
  },
  (error) => {
    // 422 || 500
    if (error.code === AXIOS_TIMEOUT) {
      $message.error("time out!");
    } else if (error?.response?.status === HTTP_STATUS_UNAUTHORIZED) {
      $message.error(error?.response?.data?.msg);
      setTimeout(() => {
        window.location.replace(window.location.origin);
      }, 2000);
    } else {
      const errMsg = error?.response?.data?.message || error?.response?.data?.msg || UNKNOWN_ERROR;
      $message.error(errMsg);
      error.message = errMsg;
    }
    return Promise.reject(error);
  }
);

export default service;
