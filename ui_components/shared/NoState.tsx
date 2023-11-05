import { TImage } from "@/constants";
import { FC } from "react";

export type TNoStateProps = {
  image?: string | TImage;
  title: React.ReactNode | string;
  subTitle?: React.ReactNode;
  subTitleClassName?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  button?: React.ReactNode;
};

const NoState: FC<TNoStateProps> = ({
  image,
  title,
  className,
  iconClassName,
  titleClassName,
  button,
  subTitle,
  subTitleClassName,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        className ? className : ""
      }`}
    >
      {image && (
        <img
          src={image as string}
          alt="no_state"
          className={`h-40 w-35 my-4 object-contain ${
            iconClassName ? iconClassName : ""
          }`}
        />
      )}
      <p
        className={`text-center heading3_medium break-words ${
          titleClassName ?? ""
        }`}
      >
        {title}
      </p>
      {subTitle && (
        <span className={`text-center subTitle ${subTitleClassName}`}>
          {subTitle}
        </span>
      )}

      {button ? button : null}
    </div>
  );
};

export default NoState;
