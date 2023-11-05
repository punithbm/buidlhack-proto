"use client";
import useSWR from "swr";

import { fetchDefiList } from "..";
const fetchDefiListHelper = ({
  address,
  params,
}: {
  address: string;
  params: any;
}) =>
  fetchDefiList(address, params).then((rs) => {
    return rs?.data?.result || [];
  });

const useDefiList = (address: string, params: any) => {
  const {
    data: defiList,
    isValidating: defiListLoader,
    error,
  } = useSWR({ type: "defi-list", address, params }, fetchDefiListHelper, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return { defiList, defiListLoader, error };
};

export { useDefiList };
