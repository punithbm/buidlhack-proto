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
import banner from "../../public/assets/images/banner.png";
import placeholderNFT from "../../public/assets/images/placeholder_nft.png";
import sent from "../../public/assets/images/sent.svg";
import noState from "../../public/assets/images/no_state.svg";
import greenCheck from "../../public/assets/images/green_check.svg";
import redCross from "../../public/assets/images/red_cross.svg";

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
  | "banner"
  | "placeholderNFT"
  | "sent"
  | "noState"
  | "greenCheck"
  | "redCross"
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
  banner,
  placeholderNFT,
  sent,
  noState,
  greenCheck,
  redCross,
};
