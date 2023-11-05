"use client";
import useSWR from "swr";

import { fetchTokensList } from "..";
import { sum } from "lodash";
import { tokenListTotalUSD } from "@/utils";
const fetchTokensListHelper = ({
  address,
  params,
}: {
  address: string;
  params: any;
}) =>
  fetchTokensList(address, params).then((rs) => {
    console.log(rs, "res");
    return rs?.data?.result || [];
  });

const useTokensList = (address: string, params: any) => {
  const {
    data: tokensList,
    isValidating: tokensListLoader,
    error,
  } = useSWR({ type: "tokens-list", address, params }, fetchTokensListHelper, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  const tokenTotalUSD =
    tokensList && tokensList?.length > 0
      ? sum([tokenListTotalUSD(tokensList)])
      : sum([tokenListTotalUSD(tokensList ?? [])]);
  return { tokensList, tokensListLoader, error, tokenTotalUSD };
};

export { useTokensList };
