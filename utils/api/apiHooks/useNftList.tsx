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
    console.log("🚀 ~ file: useNftList.tsx:16 ~ rs:", rs);

    if (rs && rs.data && rs.data.result) {
      console.log("came inside if");
      for (const item of rs.data.result) {
        console.log("came inside for", item);
        const res = await fetchNftsItem(
          item.contract_address,
          item.chain_name,
          item.token_id,
          { "api-key": params["api-key"] }
        );

        // Process the 'res' data and add it to 'nftList' if needed
        console.log(res, "nft response");

        // Example: Add the name to 'nftList'
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
