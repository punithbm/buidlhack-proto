"use client";

import { FC, useEffect, useState } from "react";
import { DeFiList, NFTList, TokensList } from ".";
import {
  getCurrencyFormattedString,
  splitDecimals,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utils";
import { useDefiList } from "@/utils/api/apiHooks/useDefiList";
import {
  ADDRESS_KEY,
  DEFI_NETWORTH_KEY,
  NFT_NETWORTH_KEY,
  TOKEN_NETWORTH_KEY,
} from "@/utils/api/constants";
import { IDefiItem, IDefiList, INftItem } from "@/utils/api/apiTypes";
import { useNftList } from "@/utils/api/apiHooks/useNftList";

export interface IPortfolioTabsProps {
  tokensList: any;
  tokensListLoader: boolean;
  tokenTotalUSD: number;
}
const PortfolioTabs: FC<IPortfolioTabsProps> = ({
  tokensList,
  tokensListLoader,
  tokenTotalUSD,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tokenValueFormat = getCurrencyFormattedString(
    tokenTotalUSD / Math.pow(10, 18)
  );
  const tokenSplitNetWorth = splitDecimals(tokenValueFormat);
  useEffect(() => {
    if (tokensList) {
      getTokenNetworth();
    }
  }, [tokensList]);
  const [tokensNetworth, setTokensNetworth] = useState(0);

  const getTokenNetworth = () => {
    const usdValueList: number[] = [];
    tokensList.forEach((item: any, ind: number) => {
      const tokenUsdValue =
        (item.amount / Math.pow(10, item.decimals)) * item.actual_price;
      usdValueList.push(tokenUsdValue);
    });
    const networth =
      usdValueList &&
      usdValueList.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0
      );
    saveToLocalStorage(TOKEN_NETWORTH_KEY, networth);
    window.dispatchEvent(new Event(TOKEN_NETWORTH_KEY));
    setTokensNetworth(networth);
  };

  const [nftNetworth, setNftNetworth] = useState(0);
  const [defiNetworth, setDefiNetworth] = useState(0);
  const tabsData = [
    {
      id: 0,
      title: "Tokens",
      netWorth: `$ ${tokensNetworth.toFixed(2)}`,
      icons: tokensList?.slice(0, 4).map((item: any) => ({
        icon: item.logo_url,
        name: item.name,
      })),
      hasData: tokensList?.length > 1,
      bg: "#F5F3FB",
    },
    {
      id: 1,
      title: "NFTs",
      netWorth: `$ ${nftNetworth}`,
      icons: [
        {
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTFkN2Q1IiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyMTAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjIyMCIgZmlsbD0iIzVhNjVmYSIgLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjMwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyNDAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjUwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMjUwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjI2MCIgZmlsbD0iIzVhNjVmYSIgLz48cmVjdCB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjI2MCIgZmlsbD0iIzVhNjVmYSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIyNzAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIyNzAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMjgwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMjgwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjI5MCIgZmlsbD0iIzVhNjVmYSIgLz48cmVjdCB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjI5MCIgZmlsbD0iIzVhNjVmYSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIzMDAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIzMDAiIGZpbGw9IiM1YTY1ZmEiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMzEwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iMzEwIiBmaWxsPSIjNWE2NWZhIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSIyMTAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxOTAiIHk9IjIxMCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEzMCIgeT0iMjIwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIyMjAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjIzMCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMjMwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTUwIiB5PSIyNDAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjI1MCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEzMCIgeT0iMjYwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTUwIiB5PSIyNjAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjI2MCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjEzMCIgeT0iMjcwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSIyODAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjI5MCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjE1MCIgeT0iMjkwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIyOTAiIGZpbGw9IiNmZmMxMTAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjMwMCIgZmlsbD0iI2ZmYzExMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMzAwIiBmaWxsPSIjZmZjMTEwIiAvPjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSIyMCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMzAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjMwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iMTgwIiB5PSIzMCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iNDAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjkwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjQwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjEwIiB5PSI0MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSI1MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMTAiIHg9IjEyMCIgeT0iNTAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjUwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjYwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSI2MCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjE1MCIgeT0iNjAiIGZpbGw9IiNhODZmNjAiIC8+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjYwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSI2MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjYwIiB5PSI3MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iNzAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjkwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjcwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjEwIiB5PSI3MCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjIzMCIgeT0iNzAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI2MCIgeT0iODAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iODAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjkwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjgwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSIxMCIgeD0iMjEwIiB5PSI4MCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI2MCIgeT0iODAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI2MCIgeT0iOTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iOTAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMCIgeD0iOTAiIHk9IjkwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSI5MCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI2MCIgeT0iOTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTAwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjEwMCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iMTcwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMTAwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjUwIiB5PSIxMDAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIyNjAiIHk9IjEwMCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSI1MCIgeT0iMTEwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSIxNzAiIGhlaWdodD0iMTAiIHg9IjgwIiB5PSIxMTAiIGZpbGw9IiNhODZmNjAiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIyNTAiIHk9IjExMCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjI4MCIgeT0iMTEwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNDAiIHk9IjEyMCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjUwIiB5PSIxMjAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjE5MCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjEyMCIgZmlsbD0iI2E4NmY2MCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjI2MCIgeT0iMTIwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjgwIiB5PSIxMjAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTMwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iNTAiIHk9IjEzMCIgZmlsbD0iI2QxODY4NyIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIxMzAiIGZpbGw9IiNhODZmNjAiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjEzMCIgZmlsbD0iI2ZmZjBlZSIgLz48cmVjdCB3aWR0aD0iNzAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMTMwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIxMCIgeD0iMjUwIiB5PSIxMzAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyODAiIHk9IjEzMCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjUwIiB5PSIxNDAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iMTQwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxNDAiIGZpbGw9IiNhODZmNjAiIC8+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjE0MCIgZmlsbD0iI2ZmZjBlZSIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjE5MCIgeT0iMTQwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSIxNDAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNjAiIHk9IjE0MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxNTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI5MCIgeT0iMTUwIiBmaWxsPSIjZDE4Njg3IiAvPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxNTAiIGZpbGw9IiNhODZmNjAiIC8+PHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjE1MCIgZmlsbD0iI2ZmZjBlZSIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSIxNTAiIGZpbGw9IiNkMTg2ODciIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjE1MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIxNjAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE2MCIgZmlsbD0iI2E4NmY2MCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjExMCIgeT0iMTYwIiBmaWxsPSIjZTExODMzIiAvPjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSIxNjAiIGZpbGw9IiNmZmYwZWUiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMDAiIHk9IjE2MCIgZmlsbD0iI2UxMTgzMyIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIyMCIgeT0iMTYwIiBmaWxsPSIjYTg2ZjYwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSIxNjAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMTcwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAiIHg9IjkwIiB5PSIxNzAiIGZpbGw9IiNlMTE4MzMiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjE3MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxODAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIxMTAiIHk9IjE4MCIgZmlsbD0iI2UxMTgzMyIgLz48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iMTAiIHg9IjE0MCIgeT0iMTgwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIxMCIgeD0iMTkwIiB5PSIxODAiIGZpbGw9IiNlMTE4MzMiIC8+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjEwIiB4PSIyMjAiIHk9IjE4MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjcwIiB5PSIxOTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMTkwIiBmaWxsPSIjYzNhMTk5IiAvPjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxOTAiIGZpbGw9IiNkNGI3YjIiIC8+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiB4PSIxNTAiIHk9IjE5MCIgZmlsbD0iI2MzYTE5OSIgLz48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMTkwIiBmaWxsPSIjZDRiN2IyIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjMwIiB5PSIxOTAiIGZpbGw9IiNjM2ExOTkiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyNTAiIHk9IjE5MCIgZmlsbD0iI2Q0YjdiMiIgLz48cmVjdCB3aWR0aD0iMTcwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMjAwIiBmaWxsPSIjYzNhMTk5IiAvPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxMTAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSIxNzAiIHk9IjExMCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTIwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSIxMjAiIGZpbGw9IiNmZjBlMGUiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjEyMCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMTIwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjAwIiB5PSIxMjAiIGZpbGw9IiNmZjBlMGUiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjEyMCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwIiB4PSI3MCIgeT0iMTMwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE0MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTQwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTEwIiB5PSIxNDAiIGZpbGw9IiMwYWRjNGQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMjAiIHk9IjE0MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE0MCIgeT0iMTQwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTUwIiB5PSIxNDAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxNzAiIHk9IjE0MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE4MCIgeT0iMTQwIiBmaWxsPSIjMGFkYzRkIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTkwIiB5PSIxNDAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjE0MCIgZmlsbD0iIzE5MjlmNCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjIyMCIgeT0iMTQwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iNzAiIHk9IjE1MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTUwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIxNTAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE2MCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjE3MCIgeT0iMTYwIiBmaWxsPSIjMDAwMDAwIiAvPjwvc3ZnPg==",
          name: "nft",
        },
        {
          icon: "https://i.seadn.io/gae/qoR1cWuIZzjlrNVcSMAzhrwDvXNtMxaYuDbNqkc_J5WGGqMSrF0wzO7K2MnSCEBLG8G8pZyJPqV7eTGt4wGwret85sbXJBYoAkypdQ?auto=format&dpr=1&w=384",
          name: "nft",
        },
      ],
      hasData: true,
      bg: "#F8FBE2",
    },
    {
      id: 2,
      title: "DeFi Investments",
      netWorth: `$ ${defiNetworth}`,
      icons: [
        {
          icon: "https://api.thegraph.com/ipfs/api/v0/cat?arg=Qmed66AN7gBGLgowVJzDxoTE9EoF4qDLNwM1FrGCH5kYaa",
          name: "nft",
        },
        {
          icon: "https://img.freepik.com/premium-photo/aave-cryptocurrency-symbol-logo-3d-illustration_155582-6411.jpg",
          name: "nft",
        },
      ],
      hasData: true,
      bg: "#EFFBFE",
    },
  ];

  const [defiLists, setDefiList] = useState<IDefiItem[]>();
  const [nftsList, setNftsList] = useState<any>();

  const address = getFromLocalStorage(ADDRESS_KEY);

  const { defiList, defiListLoader } = useDefiList(address, {
    networks: "linea,opbnb,optimism,polygon_zkevm",
    limit: 100,
    "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
  });

  const { nftList, nftListLoader } = useNftList(address, {
    networks: "linea,opbnb,optimism,polygon_zkevm",
    limit: 100,
    "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
  });

  useEffect(() => {
    if (!defiListLoader) {
      const defiInv = defiList?.map(
        (item: IDefiItem) => item.position.net_usd_value as unknown as number
      );
      const networth =
        defiInv &&
        defiInv.reduce(
          (accumulator, currentValue) =>
            Number(accumulator) + Number(currentValue),
          0
        );
      saveToLocalStorage(DEFI_NETWORTH_KEY, networth);
      window.dispatchEvent(new Event(DEFI_NETWORTH_KEY));
      setDefiNetworth(networth?.toFixed(4) as unknown as number ?? 0);
      setDefiList(defiList);
    }
  }, [defiListLoader]);

  useEffect(() => {
    if (!nftListLoader) {
      const nftsNW = nftList?.map(
        (item: any) => item.floorPrice as unknown as number
      );
      const networth =
        nftsNW &&
        nftsNW?.reduce(
          (accumulator: number, currentValue: number) =>
            Number(accumulator) + Number(currentValue),
          0
        );
      saveToLocalStorage(NFT_NETWORTH_KEY, networth);
      window.dispatchEvent(new Event(NFT_NETWORTH_KEY));
      setNftNetworth(networth as unknown as number);
      setNftsList(nftList);
    }
  }, [nftListLoader]);

  const handleSwitchTab = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={`px-4 container mx-auto h-full pb-6 `}>
      <div className="grid grid-cols-3 gap-6 items-center portfolioCardInfo pb-5">
        {tabsData?.map((_data, key) => (
          <div
            key={key}
            className={`relative h-full last:mb-0 lg:mb-0 ease-in-out duration-500 rounded-2xl p-5 hover:shadow-7xl border border-transparent hover:border-white overflow-clip ${
              activeTab === _data?.id ? "shadow-7xl border border-white" : ""
            } `}
            role={"presentation"}
            onClick={() => handleSwitchTab(_data?.id)}
            style={{ background: _data.bg }}
          >
            <div
              className={`flex-1 w-[224px] md:w-auto  md:min-h-[124px] overflow-hidden border-none shadow-transparent cursor-pointer md:h-[124px]  ${
                _data.hasData ? "" : "grayscale cursor-not-allowed"
              }`}
            >
              <div>
                <p className="text-lg leading-6 text-text-300 mb-2">
                  {_data?.title}
                </p>
                <p className="text-[32px] font-bold text-[#0A0D14]">
                  {_data?.netWorth}
                  {/* <span className="text-[#BABDC2]">29</span> */}
                </p>

                <div
                  className={`portfolioIconBlk hidden md:block md:w-35 lg:w-50`}
                >
                  <div
                    className={`${
                      !_data.hasData ? "iconCard emptyIconCard" : ""
                    } iconCard emptyIconCard ${
                      _data.hasData ? "iconCard multipleIcons" : "opacity-30"
                    } ${_data?.icons?.length === 1 ? "singleIcon" : ""} `}
                  >
                    {_data?.icons?.map((_icons: any, key: number) => (
                      <img key={key} src={_icons?.icon} alt={_icons?.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeTab === 0 && (
        <TokensList tokensList={tokensList} loader={tokensListLoader} />
      )}
      {activeTab === 1 && <NFTList nftList={nftsList} loader={nftListLoader} />}
      {activeTab === 2 && (
        <DeFiList defiList={defiLists ?? []} loader={defiListLoader} />
      )}
    </div>
  );
};

export default PortfolioTabs;
