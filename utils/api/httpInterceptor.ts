/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TApiResponse } from "@/types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const DECOMMAS_API: string | undefined =
  process.env.NEXT_PUBLIC_DECOMMAS_API;
export const DECOMMAS_API_ACCESS_KEY: string | undefined =
  process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY;

//@ts-ignore
function axiosInstanceCreator(baseURL: string | undefined, accessKey?: string) {
  const axiosInstance: AxiosInstance = axios.create();
  axiosInstance.defaults.baseURL = baseURL;
  axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response: AxiosResponse<TApiResponse>) {
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        return Promise.reject(response);
      }
    },

    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

const decommasInstance = axiosInstanceCreator(
  DECOMMAS_API,
  DECOMMAS_API_ACCESS_KEY
);

export const API_INSTANCES = {
  decommas: decommasInstance,
};
export default API_INSTANCES;
