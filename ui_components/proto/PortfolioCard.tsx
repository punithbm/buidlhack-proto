"use client";
import { icons } from "@/utils/images";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Actions from "../shared/Actions";

import { AvatarGroup } from "../shared";
import { portfolioActionData } from "@/constants";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import {
  DEFI_NETWORTH_KEY,
  NFT_NETWORTH_KEY,
  SELECTED_CHAIN_KEY,
  TOKEN_NETWORTH_KEY,
} from "@/utils/api/constants";
const PortfolioCard: FC = (props) => {
  const chainsList = [
    {
      name: "OpBNB Mainnet",
      id: "opbnb",
    },
    {
      name: "Linea",
      id: "linea",
    },
    {
      name: "Polygon zkEVM",
      id: "polygon_zkevm",
    },
    {
      name: "Arbitrum",
      id: "arbitrum",
    },
    {
      name: "Optimism",
      id: "optimism",
    },
  ];

  const handleChainSwitch = (chain: any) => {
    saveToLocalStorage(SELECTED_CHAIN_KEY, chain);
    // if (typeof window !== "undefined") {
    //   window.dispatchEvent(new Event("storage"));
    // }
  };

  const [tokensNetworth, setTokensNetworth] = useState(0);
  const [nftNetworth, setNftNetworth] = useState(0);
  const [defiNetworth, setDefiNetworth] = useState(0);
  const [totalNetworth, setTotalNetworth] = useState(0);

  if (typeof window !== "undefined") {
    window.addEventListener(NFT_NETWORTH_KEY, () => {
      const nftNW = Number(
        getFromLocalStorage(NFT_NETWORTH_KEY).toFixed(2)
      ) as unknown as number;
      setNftNetworth(nftNW);
    });
  }

  if (typeof window !== "undefined") {
    window.addEventListener(DEFI_NETWORTH_KEY, () => {
      const defiNW = Number(getFromLocalStorage(DEFI_NETWORTH_KEY)).toFixed(
        2
      ) as unknown as number;
      setDefiNetworth(defiNW);
    });
  }

  if (typeof window !== "undefined") {
    window.addEventListener(TOKEN_NETWORTH_KEY, () => {
      const tokenNW = Number(
        getFromLocalStorage(TOKEN_NETWORTH_KEY).toFixed(2)
      ) as unknown as number;
      setTokensNetworth(tokenNW);
    });
  }

  const getTotalNetworth = () => {
    const totalNW =
      Number(tokensNetworth) + Number(defiNetworth) + Number(nftNetworth);
    setTotalNetworth(totalNW);
  };

  useEffect(() => {
    if (nftNetworth && defiNetworth && tokensNetworth) {
      getTotalNetworth();
    }
  }, [nftNetworth, defiNetworth, tokensNetworth]);

  return (
    <div className="relative bg-[#1C1C1F] rounded-3xl p-5 mt-8 mb-6">
      <div className="md:flex md:justify-center mb-7">
        <div className="portfolioNetWorth md:w-2/6 bg-[#F3FFA8] pb-6 py-10 px-[30px] rounded-3xl">
          <div className="mb-2.5">
            <AvatarGroup />
          </div>
          <p className="text-base text-[#474E66] font-normal">Networth</p>
          <p className="text-[32px] font-black text-[#0A0D14] mb-5">
            {`$ ${totalNetworth}`}
          </p>
          <ul>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-m font-normal">Tokens</p>
              <p
                className={`font-semibold text-m text-[#0A0D14] flex items-center `}
              >
                {`$${tokensNetworth}`}
              </p>
            </li>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-m font-normal">NFTs</p>

              <p
                className={`font-semibold text-sm text-[#0A0D14] flex items-center `}
              >
                {`$${nftNetworth}`}
              </p>
            </li>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-sm font-normal">DEFI</p>

              <p
                className={`font-semibold text-sm text-[#0A0D14] flex items-center `}
              >
                {`$${defiNetworth}`}
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-4/6 px-8">
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between md:mt-0">
              <div className="absolute top-5 left-5 lg:left-7">
                  <p className="paragraph_bold pb-1 text-text-500  tracking-[0.2px]">
                    Performance graph of your assets
                  </p>
                  <p className="paragraph text-text-300">
                    You have the option to view a specific chain or all the
                    <br />
                    chains collectively in our bundle view.
                  </p>
                  <p className="paragraph text-text-300 mt-4">
                    <br />
                    Portfolio performance graph coming soon...
                  </p>
                </div>
                <div></div>
              <details className="dropdown">
                <summary className="cursor-pointer w-[150px] border border-[#CCCCCC] bg-white py-1 px-4 rounded-full flex items-center justify-center">
                  {/* {selectedChain ? selectedChain.name : ""} */}
                  <p
                    className={`font-medium text-sm text-[#0A0D14] flex items-center `}
                  >
                    All Networks
                  </p>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[50] bg-white border border-[#CCCCCC] rounded-lg rounded-box w-[150px] ">
                  {chainsList.map((item: any, ind: number) => {
                    return (
                      <li
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          handleChainSwitch(item);
                        }}
                      >
                        <p
                          className={`font-medium text-sm text-[#0A0D14] flex items-center `}
                        >
                          {item.name}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
      <div role={"presentation"} className="">
        <Actions
          actionData={portfolioActionData}
          className="mb-2"
          // handleRoute={(data) => {
          //   if (data) {
          //     router.push(`/${data}`);
          //   }
          // }}
        />
      </div>
    </div>
  );
};

export default PortfolioCard;
