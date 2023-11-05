"use client";

import { FC, useState } from "react";
import { DeFiList, NFTList, TokensList } from ".";

const PortfolioTabs: FC = () => {
  const tabsData = [
    {
      id: 0,
      title: "Tokens",
      netWorth: "$7,627.29",
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
      bg: "#F5F3FB",
    },
    {
      id: 1,
      title: "NFTs",
      netWorth: "$7,627.29",
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
      netWorth: "$7,627.29",
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

  const [activeTab, setActiveTab] = useState<number>(0);

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
                <p className="text-[32px] font-bold text-[#0A0D14] ">
                  $7,627.<span className="text-[#BABDC2]">29</span>
                </p>

                <div
                  className={`portfolioIconBlk hidden md:block md:w-35 lg:w-50`}
                >
                  <div
                    className={`${
                      !_data.hasData ? "iconCard emptyIconCard" : ""
                    } iconCard emptyIconCard ${
                      _data.hasData ? "iconCard multipleIcons" : "opacity-30"
                    } ${_data.icons.length === 1 ? "singleIcon" : ""} `}
                  >
                    {_data?.icons?.map((_icons, key) => (
                      <img key={key} src={_icons?.icon} alt={_icons?.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeTab === 0 && <TokensList />}
      {activeTab === 1 && <NFTList />}
      {activeTab === 2 && <DeFiList />}
    </div>
  );
};

export default PortfolioTabs;
