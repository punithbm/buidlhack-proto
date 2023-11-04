"use client";
import { icons } from "@/utils/images";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { serializeError } from "eth-rpc-errors";

const Header = () => {
  const { isConnecting, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
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
    console.log(address, "address");
    console.log("Wallet Connected Successfully");
  };

  useEffect(() => {
    if (connecting) {
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
    <>
      <header
        className={`h-[64px] w-full fixed left-0 bg-[#1C1C1F] dark:bg-secondaryDark-50 top-0 z-[99] lg:flex items-center hidden`}
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
        </nav>
      </header>
    </>
  );
};

export default Header;
