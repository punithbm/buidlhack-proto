export const productName = "Clink Safe";
export const rainbowKitProjectId = "fb3037b60ba3165d90a7f1bb1a727cc5";
import { IActionData } from "@/ui_components/shared/types";
import { icons } from "@/utils/images";

export const DEFAULT_TOKEN_DECIMALS = 18;
export enum BUTTON_SIZE {
  MEDIUM = "medium",
  LARGE = "large",
}
export enum BUTTON_VARIANT {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
  GHOST = "ghost",
}

export enum LABEL_VARIANT {
  LIGHT = "light",
  OUTLINED = "outlined",
  SOLID = "solid",
}

export enum LABEL_COLOR {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  GREY = "grey",
  WHITE = "white",
}

export enum THEME_COLOR {
  LIGHT = "light",
  DARK = "dark",
}

export const portfolioActionData: IActionData[] = [
  {
    title: "Send",
    icon: icons.sendIcon.src,
    url: "/send",
    isEnabled: false,
  },
  {
    title: "Receive",
    icon: icons.receiveIcon.src,
    url: "/receive",
    isEnabled: false,
  },
  {
    title: "Swap",
    icon: icons.swapIcon.src,
    url: "/swap",
    isEnabled: false,
  },
  {
    title: "Buy / Sell",
    icon: icons.buyIcon.src,
    url: "/buy",
    isEnabled: false,
  },
];
export const headerDetail = [
  { title: "Title 1", value: "25" },
  { title: "Title 2", value: "5" },
];

export type TImage = {
  src: string;
  width?: number;
  height?: number;
};

export type TButtonSizes = `${BUTTON_SIZE}`;
export type TButtonVariants = `${BUTTON_VARIANT}`;
export type TLabelColor = `${LABEL_COLOR}`;
export type TLabelVariants = `${LABEL_VARIANT}`;
export type TThemeColor = `${THEME_COLOR}`;
