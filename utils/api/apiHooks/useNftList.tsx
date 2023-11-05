"use client";
import useSWR from "swr";

import { fetchNftsItem, fetchNftsList } from "..";
import { INftItem } from "../apiTypes";
const fetchNftListHelper = async ({
  address,
  params,
}: {
  address: string;
  params: any;
}) => {
  const nftList: any = [];
  try {
    const rs = await fetchNftsList(address, params);

    if (rs && rs.data && rs.data.result) {
      for (const item of rs.data.result) {
        const res = await fetchNftsItem(
          item.contract_address,
          item.chain_name,
          item.token_id,
          { "api-key": params["api-key"] }
        );

        nftList.push({
          name: res.data.result.collection_name,
          floorPrice: item.amount,
          imageUrl: res.data.result.image_url,
        });
      }
    }

    return nftList;
  } catch (error) {
    console.error(error);
    return nftList;
  }
};

const useNftList = (address: string, params: any) => {
  const {
    data: nftList,
    isValidating: nftListLoader,
    error,
  } = useSWR({ type: "nft-list", address, params }, fetchNftListHelper, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return { nftList, nftListLoader, error };
};

export { useNftList };
