import chevronLeftWhite from "../../public/assets/images/chevron_left_white.svg";
import logo from "../../public/assets/images/logo.png";
import bridgeIcon from "../../public/assets/images/bridge_icon.svg";
import sendIcon from "../../public/assets/images/send_icon.svg";
import swapIcon from "../../public/assets/images/swap_icon.svg";
import walletIcon from "../../public/assets/images/wallet_icon.svg";
import settings from "../../public/assets/images/settings.svg";
import help from "../../public/assets/images/help.svg";
import search from "../../public/assets/images/search.svg";

export type TImages =
  | "chevronLeftWhite"
  | "logo"
  | "bridgeIcon"
  | "sendIcon"
  | "swapIcon"
  | "settings"
  | "help"
  | "search"
  | "walletIcon";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, string> = {
  chevronLeftWhite,
  logo,
  bridgeIcon,
  sendIcon,
  swapIcon,
  walletIcon,
  settings,
  help,
  search,
};
