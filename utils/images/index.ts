import chevronLeftWhite from "../../public/assets/images/chevron_left_white.svg";
import logo from "../../public/assets/images/logo.png";
import sendIcon from "../../public/assets/images/send.svg";
import swapIcon from "../../public/assets/images/swap_icon.svg";
import walletIcon from "../../public/assets/images/wallet_icon.svg";
import settings from "../../public/assets/images/settings.svg";
import help from "../../public/assets/images/help.svg";
import search from "../../public/assets/images/search.svg";
import receiveIcon from "../../public/assets/images/receive.svg";
import buyIcon from "../../public/assets/images/buy.svg";

export type TImages =
  | "chevronLeftWhite"
  | "logo"
  | "sendIcon"
  | "swapIcon"
  | "settings"
  | "help"
  | "search"
  | "receiveIcon"
  | "buyIcon"
  | "walletIcon";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  chevronLeftWhite,
  logo,
  sendIcon,
  swapIcon,
  walletIcon,
  settings,
  help,
  search,
  receiveIcon,
  buyIcon,
};
