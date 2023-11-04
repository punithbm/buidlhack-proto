"use client";
import { FC } from "react";

export type TAvatarPlaceholderProps = {
  symbol: string;
  className?: string;
  symbolClassName?: string;
};

const AvatarPlaceholder: FC<TAvatarPlaceholderProps> = (props) => {
  const { symbol, className, symbolClassName } = props;
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 dark:bg-primaryDark-100 ${
        className ?? ""
      }`}
    >
      <span className={`support_text leading-none ${symbolClassName ?? ""}`}>
        {symbol?.slice(0, 3).toUpperCase()}
      </span>
    </span>
  );
};

export default AvatarPlaceholder;
