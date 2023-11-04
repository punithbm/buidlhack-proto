export const productName = "Clink Safe";
export const rainbowKitProjectId = "fb3037b60ba3165d90a7f1bb1a727cc5";
import { icons } from "@/utils/images";

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

export const actionData = [
  {
    title: "Swap",
    icon: {
      src: icons.swapIcon as string,
    },
  },
  {
    title: "Bridge",
    icon: {
      src: icons.bridgeIcon as string,
    },
  },
  {
    title: "Send",
    icon: {
      src: icons.sendIcon as string,
    },
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
