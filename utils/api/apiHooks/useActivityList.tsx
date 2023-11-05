"use client";
import useSWR from "swr";

import { fetchActivityList } from "..";

const fetchActivityHelper = ({
  address,
  params,
}: {
  address: string;
  params: any;
}) =>
  fetchActivityList(address, params).then((rs) => {
    return rs?.data?.result || [];
  });

const useActivityList = (address: string, params: any) => {
  const {
    data: activityList,
    isValidating: activityLoader,
    error,
  } = useSWR({ type: "activity-list", address, params }, fetchActivityHelper, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return { activityList, activityLoader, error };
};

export { useActivityList };
