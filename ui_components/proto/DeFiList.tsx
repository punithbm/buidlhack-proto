import { FC } from "react";

import { getCurrencyFormattedString, truncateText } from "@/utils";
import { NFTImage, Shimmer } from ".";
import { AvatarPlaceholder, ImageWithFallback, NoState } from "../shared";
import { IDefiItem, IDefiList } from "@/utils/api/apiTypes";
import { icons } from "@/utils/images";

export interface IDefiListProps {
  defiList: IDefiItem[];
  loader: boolean;
}

const DeFiList: FC<IDefiListProps> = (props) => {
  const { defiList, loader } = props;
  return (
    <>
      {loader ? (
        <Shimmer type="tokenList" />
      ) : defiList && defiList.length > 1 ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mx-5 mb-5">
          {defiList?.slice(0, 10).map((_list: any, key: number) => {
            return (
              <div
                id={`protocol-${key}`}
                role="presentation"
                key={key}
                className="relative py-3 px-4 rounded-lg border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] group"
              >
                <div className="flex items-center gap-2 pb-2">
                  <ImageWithFallback
                    src={_list.protocol_logo}
                    alt="logo"
                    className="rounded-full w-6 h-6"
                    width={20}
                    height={20}
                    fallbackComponent={
                      <AvatarPlaceholder
                        symbol={_list.protocol_name}
                        className={`!w-6 !h-6`}
                      />
                    }
                  />
                  <p className="paragraph font-medium leading-[18px] whitespace-nowrap max-w-[120px] text-ellipsis overflow-hidden">
                    {_list?.protocol_name}
                  </p>
                </div>
                <div className="pb-3">
                  <p className="paragraph text-text-300 flex items-center gap-1">
                    Investment : 1
                  </p>
                  <div className="flex gap-4 justify-between items-center">
                    <p className="paragraph_bold  ">
                      {`$ ${Number(_list.position.net_usd_value).toFixed(4)}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoState
          title="No Defi Invesments found"
          image={icons.noState.src}
          className="p-2"
          titleClassName="mb-6"
        />
      )}
    </>
  );
};

export default DeFiList;
