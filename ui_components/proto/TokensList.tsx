import { FC } from "react";
import { AvatarPlaceholder, ImageWithFallback, NoState } from "../shared";

import {
  formatTokenAmount,
  getCurrencyFormattedString,
  tokenValueCalculation,
  truncateText,
} from "@/utils";
import { icons } from "@/utils/images";
import { Shimmer } from ".";

export interface ITokensListProps {
  tokensList: any;
  loader: boolean;
}
const TokensList: FC<ITokensListProps> = (props: any) => {
  const { tokensList, loader } = props;

  const getTokenUsdValue = (tokenData: any) => {
    return (
      (tokenData.amount / Math.pow(10, tokenData.decimals)) *
      tokenData.actual_price
    ).toFixed(2);
  };

  const getTokenFormattedValue = (tokenData: any) => {
    return `${(tokenData.amount / Math.pow(10, tokenData.decimals)).toFixed(
      2
    )} ${tokenData.symbol}`;
  };

  return (
    <>
      {loader ? (
        <Shimmer type="tokenList" />
      ) : tokensList && tokensList?.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mb-5">
          {tokensList?.map((_list: any, key: number) => {
            return (
              <div
                key={key}
                role="presentation"
                className="relative py-3 px-4 rounded-lg border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] group"
              >
                <div className="flex items-center gap-2 pb-2">
                  <ImageWithFallback
                    src={_list.logo_url}
                    alt="logo"
                    className="rounded-full w-6 h-6"
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
                        src={_list.logo_url}
                        alt="logo"
                        className="rounded-full w-4 h-4 mr-1"
                        width={16}
                        height={16}
                        fallbackComponent={
                          <AvatarPlaceholder
                            symbol={_list.symbol}
                            className={`!w-4 !h-4`}
                          />
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
                    {`$ ${getTokenUsdValue(_list)}`}
                  </p>
                  <div className="flex gap-4 justify-between items-center">
                    <p className="paragraph leading-4 text-text-300 dark:text-textDark-300 pt-[2px] mb-2">
                      {getTokenFormattedValue(_list)}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-secondary-100 dark:bg-secondaryDark-100">
                  <p className="paragraph text-text-300 dark:text-textDark-300 font-[12px] leading-[18px] py-[2px] pl-4">
                    1 {truncateText(_list?.symbol, 6)} :{" "}
                    {getCurrencyFormattedString(_list?.actual_price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoState
          title="No tokens found"
          image={icons.noState.src}
          className="p-2"
          titleClassName="mb-6"
        />
      )}
    </>
  );
};

export default TokensList;
