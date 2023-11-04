import chevronLeftWhite from "../../public/assets/images/chevron_left_white.svg";

export type TImages = "chevronLeftWhite";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, string> = {
  chevronLeftWhite,
};
