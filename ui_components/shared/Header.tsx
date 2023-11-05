"use client";
import { icons } from "@/utils/images";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { serializeError } from "eth-rpc-errors";
import Link from "next/link";
import { InputField } from ".";
import { useRouter } from "next/navigation";
import { saveToLocalStorage, trimAddress } from "@/utils";
import { ADDRESS_KEY } from "@/utils/api/constants";
import { localStorageService } from "@/store/localStorage";

const Header = () => {
  const { isConnecting, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const router = useRouter();

  const handleWalletConnectFlow = () => {
    saveToLocalStorage(ADDRESS_KEY, address);
    router.push("/proto");
  };

  useEffect(() => {
    if (isConnected) {
      handleWalletConnectFlow();
    } else {
      router.push("/");
    }
  }, [isConnected]);

  const handleExternalWalletClick = async () => {
    try {
      if (!isConnected) {
        await openConnectModal?.();
      } else {
        handleWalletConnectFlow();
      }
    } catch (e: any) {
      const err = serializeError(e);
      console.log(err.message, "error");
    }
  };
  return (
    <div className="container mx-auto pt-8">
      <header
        className={`h-[64px] fixed w-full top-6 rounded-3xl left-1/2 -translate-x-1/2 bg-[#1C1C1F] z-[99] lg:flex items-center hidden max-w-[inherit]`}
      >
        <nav className="flex items-center justify-between w-full px-4 gap-x-6">
          <Link href={"/"} className="flex items-center gap-2">
            <Image width={82} src={icons.logo} alt="logo" />
            {/* <p className="text-white font-bold text-base">Proto</p> */}
          </Link>
          <InputField
            type={"text"}
            id={"search"}
            placeholder="Search for Tokens, Address or NFTs"
            className="w-2/5"
          />
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                isConnected
                  ? openAccountModal?.()
                  : handleExternalWalletClick();
              }}
              className="bg-[#44484F] p-2 text-base font-medium rounded-lg text-white flex items-center gap-2"
            >
              <Image src={icons.walletIcon} alt="wallet" />
              {isConnected ? trimAddress(address ?? "", 4) : "Connect"}
            </button>

            <Image src={icons.settings} alt="setting" />

            <Image src={icons.help} alt="setting" />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
