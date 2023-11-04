import { TResponse } from "@/types";

import { globalGetService, globalPostService } from "./globalApiServices";
import { IDefiList, INftList, ITokenList } from "./apiTypes";

export const fetchTokensList = (
  address: string,
  params: any
): Promise<TResponse<ITokenList>> => {
  return new Promise((resolve, reject) => {
    globalGetService<any | null, ITokenList>(
      `tokens/${address}`,
      params || null,
      "decommas"
    )
      .then((response) => {
        const _response = {
          ...response,
          data: response.data,
        };
        console.log(response, "response");
        resolve(_response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchNftsList = (
  address: string,
  params?: any
): Promise<TResponse<INftList>> => {
  return new Promise((resolve, reject) => {
    globalGetService<any | null, INftList>(
      `nfts/${address}`,
      params || null,
      "decommas"
    )
      .then((response) => {
        const _response = {
          ...response,
          data: response.data,
        };
        resolve(_response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchDefiList = (
  address: string,
  params?: any
): Promise<TResponse<IDefiList>> => {
  return new Promise((resolve, reject) => {
    globalGetService<any | null, IDefiList>(
      `protocols/${address}`,
      params || null,
      "decommas"
    )
      .then((response) => {
        const _response = {
          ...response,
          data: response.data,
        };
        resolve(_response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
