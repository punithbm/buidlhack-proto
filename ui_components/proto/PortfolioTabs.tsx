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
          icon: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          name: "nft",
        },
        {
          icon: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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
          icon: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          name: "nft",
        },
        {
          icon: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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
    networks: "linea,opbnb,optimism,arbitrum,polygon_zkevm",
    limit: 100,
    "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
  });

  const { nftList, nftListLoader } = useNftList(address, {
    networks: "linea,opbnb,optimism,arbitrum,polygon_zkevm",
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
      setDefiNetworth(networth?.toFixed(4) as unknown as number);
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
