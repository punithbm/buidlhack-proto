"use client";
import useSWR from "swr";

import { fetchNftsItem, fetchNftsList } from "..";
import { INftItem } from "../apiTypes";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
        await delay(500);
        const res = await fetchNftsItem(
          item.contract_address,
          item.chain_name,
          item.token_id,
          { "api-key": params["api-key"] }
        );
         let imageUrl = res.data.result.image_url;
         if (imageUrl.startsWith("ipfs://")) {
           imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
         }
        nftList.push({
          name: res.data.result.collection_name,
          floorPrice: item.amount,
          imageUrl: imageUrl,
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
