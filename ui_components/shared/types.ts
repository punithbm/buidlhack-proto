import { TButtonSizes, TButtonVariants } from "@/constants";
import { TImages } from "@/utils/images";

import React, { MouseEvent } from "react";

export interface IActionsPropsType {
  actionData?: IActionData[];
  className?: string;
  handleRoute?: ((val: string) => void) | (() => void);
  mobileTitleClassName?: string;
  btnClassName?: string;
}

type TImage = {
  src: string;
  width?: number;
  height?: number;
};

export interface IActionData {
  title: string | JSX.Element;
  icon: string;
  mobileResponsiveIcon?: TImage;
  onClick?: () => void | string;
  url?: string;
  isEnabled?: boolean;
}

export interface IButtonProps {
  variant?: TButtonVariants;
  size?: TButtonSizes;
  label?: string;
  children?: React.ReactNode;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  leftIcon?: TImages;
  rightIcon?: TImages;
  className?: string;
  type?: "button" | "submit" | "reset";
  showSpinner?: boolean;
  spinnerClassName?: string;
}
