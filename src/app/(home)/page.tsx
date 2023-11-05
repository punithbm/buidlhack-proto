"use client";
import { icons } from "@/utils/images";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { saveToLocalStorage } from "@/utils";
import { ADDRESS_KEY } from "@/utils/api/constants";
import { useRouter } from "next/navigation";
import { serializeError } from "eth-rpc-errors";

function Root() {
  const { isConnecting, address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();

  const handleWalletConnectFlow = () => {
    saveToLocalStorage(ADDRESS_KEY, address);
    router.push("/proto");
  };

  useEffect(() => {
    if (isConnected) {
      handleWalletConnectFlow();
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
    <div className="h-full pt-7">
      <div
        className="cursor-pointer"
        onClick={() => {
          handleExternalWalletClick();
        }}
      >
        <Image src={icons.banner} alt="banner" className="" />
      </div>
    </div>
  );
}

export default Root;
