import chevronLeftWhite from "../../public/assets/images/chevron_left_white.svg";
import logo from "../../public/assets/images/logo.svg";

export type TImages = "chevronLeftWhite" | "logo";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, string> = {
  chevronLeftWhite,
  logo,
};
