import Image from "next/image";
import { FC, MouseEvent } from "react";

export interface IIconWrapperPropsType {
    icon: string;
    alt: string;
    className?: string;
    iconClassName?: string;
    onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
}

const IconWrapper: FC<IIconWrapperPropsType> = ({
    icon,
    alt,
    className,
    iconClassName,
    onClick,
}: IIconWrapperPropsType) => {
    return (
        <div
            role={"presentation"}
            className={`relative h-10 w-10 cursor-pointer rounded-full bg-primary p-2 ${
                className ?? ""
            }`}
            onClick={onClick}
        >
            <Image
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 ${
                    iconClassName ?? ""
                }`}
                src={icon}
                alt={alt}
            />
        </div>
    );
};
export default IconWrapper;
