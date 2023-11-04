import { FC } from "react";
import { AvatarPlaceholder, ImageWithFallback } from "../shared";
import Image from "next/image";
import { icons } from "@/utils/images";
import {
  formatTokenAmount,
  getCurrencyFormattedString,
  tokenValueCalculation,
  truncateText,
} from "@/utils";

const TokensList: FC = (props: any) => {
  const { tokenList } = props;
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mb-5">
      <div
        role="presentation"
        className="relative py-3 px-4 rounded-xl border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] cursor-pointer group"
      >
        <div className="flex items-center gap-2 pb-2">
          <ImageWithFallback
            src={""}
            alt="logo"
            className="rounded-full w-6 h-6 bg"
            width={24}
            height={24}
            fallbackComponent={
              <AvatarPlaceholder symbol={"A"} className={`!w-6 !h-6`} />
            }
          />
          <div className="flex flex-col">
            <p className="paragraph font-medium leading-[18px] whitespace-nowrap max-w-[120px] text-ellipsis overflow-hidden">
              Ethereum
            </p>
            <div className="flex items-center">
              <ImageWithFallback
                src={""}
                alt="logo"
                className="rounded-full w-4 h-4 mr-1"
                width={16}
                height={16}
                fallbackComponent={
                  <AvatarPlaceholder symbol={"A"} className={`!w-4 !h-4`} />
                }
              />
              <p className="paragraph_medium text-text-500 dark:text-textDark-500 capitalize">
                ETH
              </p>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <p className="paragraph_bold flex items-center gap-1">0.000755</p>
          <div className="flex gap-4 justify-between items-center">
            <p className="paragraph leading-4 text-text-300 dark:text-textDark-300 pt-[2px] mb-2">
              $1.38
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-secondary-100 dark:bg-secondaryDark-100">
          <p className="paragraph text-text-300 dark:text-textDark-300 font-[12px] leading-[18px] py-[2px] pl-4">
            1 WETH : $1
          </p>
        </div>
      </div>
      {/* {tokenList?.map((_list: any, key: number) => {
        return (
          <div
            key={key}
            role="presentation"
            className="relative py-3 px-4 rounded-sm border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] cursor-pointer group"
          >
            <div className="flex items-center gap-2 pb-2">
              <ImageWithFallback
                src={_list.logo_url}
                alt="logo"
                className="rounded-full w-6 h-6 bg"
                width={24}
                height={24}
                fallbackComponent={
                  <AvatarPlaceholder
                    symbol={_list.symbol}
                    className={`!w-6 !h-6`}
                  />
                }
              />
              <div className="flex flex-col">
                <p className="paragraph font-medium leading-[18px] whitespace-nowrap max-w-[120px] text-ellipsis overflow-hidden">
                  {_list?.name}
                </p>
                <div className="flex items-center">
                  <ImageWithFallback
                    src={""}
                    alt="logo"
                    className="rounded-full w-4 h-4 mr-1"
                    width={16}
                    height={16}
                    fallbackComponent={
                      <AvatarPlaceholder symbol={"A"} className={`!w-4 !h-4`} />
                    }
                  />
                  <p className="paragraph_medium text-text-500 dark:text-textDark-500 capitalize">
                    {_list?.chain}
                  </p>
                </div>
              </div>
            </div>
            <div className="pb-3">
              <p className="paragraph_bold flex items-center gap-1">
                {formatTokenAmount(_list?.amount)}
              </p>
              <div className="flex gap-4 justify-between items-center">
                <p className="paragraph leading-4 text-text-300 dark:text-textDark-300 pt-[2px] mb-2">
                  {getCurrencyFormattedString(
                    tokenValueCalculation(_list?.price, _list?.amount)
                  )}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-secondary-100 dark:bg-secondaryDark-100">
              <p className="paragraph text-text-300 dark:text-textDark-300 font-[12px] leading-[18px] py-[2px] pl-4">
                1 {truncateText(_list?.symbol, 6)} :{" "}
                {getCurrencyFormattedString(_list?.price)}
              </p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default TokensList;
