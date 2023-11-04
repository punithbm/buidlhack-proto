"use client";
import useSWR from "swr";

import { fetchTokensList } from "..";
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
  return { tokensList, tokensListLoader, error };
};

export { useTokensList };
