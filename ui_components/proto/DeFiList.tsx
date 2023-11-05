import { FC } from "react";

import { getCurrencyFormattedString, truncateText } from "@/utils";
import { NFTImage } from ".";
import { AvatarPlaceholder, ImageWithFallback } from "../shared";
import { IDefiItem, IDefiList } from "@/utils/api/apiTypes";

export interface IDefiListProps {
  defiList: IDefiItem[];
}

const DeFiList: FC<IDefiListProps> = (props) => {
  const { defiList } = props;
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mx-5 mb-5">
      {defiList?.slice(0, 10).map((_list: any, key: number) => {
        return (
          <div
            id={`protocol-${key}`}
            role="presentation"
            key={key}
            className="relative py-3 px-4 rounded-lg border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] cursor-pointer group"
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
  );
};

export default DeFiList;
