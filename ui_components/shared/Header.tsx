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
import { useTokensList } from "@/utils/api/apiHooks/useTokensList";
import { useDefiList } from "@/utils/api/apiHooks/useDefiList";
import { saveToLocalStorage } from "@/utils";

const Header = () => {
  const { isConnecting, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const { openAccountModal } = useAccountModal();
  const [connecting, setConnecting] = useState(false);
  const [showQR, setShowQr] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const { tokensList, tokensListLoader } = useTokensList(
    "0x06e70f295B6337c213DDe82D13cc198027687A7B",
    {
      networks:
        "optimism,opbnb,linea,arbitrum_nova,polygon_zkevm,arbitrum,polygon",
      limit: 100,
      verified: true,
      "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
    }
  );

  const { defiList, defiListLoader } = useDefiList(
    "0x06e70f295B6337c213DDe82D13cc198027687A7B",
    {
      networks:
        "optimism,opbnb,linea,arbitrum_nova,polygon_zkevm,arbitrum,polygon",
      limit: 100,
      "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
    }
  );

  useEffect(() => {
    if (!tokensListLoader) {
      console.log(tokensList, "tokens list");
    }
  }, [tokensListLoader]);

  useEffect(() => {
    if (!defiListLoader) {
      console.log(defiList, "defi list");
    }
  }, [defiListLoader]);

  const handlePublicKeyClick = () => {
    setShowOptions(false);
    setShowDeposit(false);
    setShowQr(true);
  };

  const handleWalletConnectFlow = () => {
    router.push("/proto");
  };

  useEffect(() => {
    if (connecting) {
      if (isConnected) {
        saveToLocalStorage("address", address);
        handleWalletConnectFlow();
      }
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
        <nav className="flex items-center justify-between w-full px-8 gap-x-6">
          <Image src={icons.logo} alt="logo" />
          <button
            onClick={() => {
              handleExternalWalletClick();
            }}
            className="border border-white p-2 rounded-[8px] text-white"
          >
            Connect Wallet
          </button>
          <button
            onClick={() => {
              openAccountModal?.();
            }}
            className="border border-white p-2 rounded-[8px] text-white"
          >
            Switch Wallet
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
