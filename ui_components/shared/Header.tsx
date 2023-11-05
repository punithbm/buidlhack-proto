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
import { saveToLocalStorage } from "@/utils";
import { ADDRESS_KEY } from "@/utils/api/constants";
import { localStorageService } from "@/store/localStorage";

const Header = () => {
  const { isConnecting, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const [connecting, setConnecting] = useState(false);
  const [showQR, setShowQr] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const handlePublicKeyClick = () => {
    setShowOptions(false);
    setShowDeposit(false);
    setShowQr(true);
  };

  const handleWalletConnectFlow = () => {
    saveToLocalStorage(ADDRESS_KEY, address);
    router.push("/proto");
  };

  useEffect(() => {
    if (isConnected) {
      handleWalletConnectFlow();
    }
  }, [isConnecting]);

  const handleExternalWalletClick = async () => {
    try {
      if (!isConnected) {
        setConnecting(true);
        await openConnectModal?.();
      } else {
        handleWalletConnectFlow();
      }
    } catch (e: any) {
      setConnecting(false);
      const err = serializeError(e);
      console.log(err.message, "error");
    }
  };
  return (
    <div className="container mx-auto pt-8">
      <header
        className={`h-[64px] w-full rounded-3xl left-0 bg-[#1C1C1F] dark:bg-secondaryDark-50 top-0 z-[99] lg:flex items-center hidden`}
      >
        <nav className="flex items-center justify-between w-full px-4 gap-x-6">
          <Link href={"/"} className="flex items-center gap-2">
            <Image width={42} src={icons.logo} alt="logo" />
            <p className="text-white font-bold text-base">Proto</p>
          </Link>
          <InputField
            type={"text"}
            id={"search"}
            placeholder="Search for NFTs"
            className="w-2/5"
          />
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                handleExternalWalletClick();
              }}
              className="bg-[#44484F] p-2 text-base font-medium rounded-lg text-white flex items-center gap-2"
            >
              <Image src={icons.walletIcon} alt="wallet" />
              Connect
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
