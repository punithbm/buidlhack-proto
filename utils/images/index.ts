import chevronLeftWhite from "../../public/assets/images/chevron_left_white.svg";
import logo from "../../public/assets/images/logo.svg";
import bridgeIcon from "../../public/assets/images/bridge_icon.svg";
import sendIcon from "../../public/assets/images/send_icon.svg";
import swapIcon from "../../public/assets/images/swap_icon.svg";

export type TImages =
  | "chevronLeftWhite"
  | "logo"
  | "bridgeIcon"
  | "sendIcon"
  | "swapIcon";

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
};
