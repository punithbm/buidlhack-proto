import { FC } from "react";

import { getCurrencyFormattedString, truncateText } from "@/utils";
import { NFTImage, Shimmer } from ".";
import { NoState } from "../shared";
import { icons } from "@/utils/images";

export interface INftListProps {
  nftList: any;
  loader: boolean;
}

const NFTList: FC<INftListProps> = (props) => {
  const { nftList, loader } = props;
  return (
    <>
      {loader ? (
        <Shimmer type="tokenList" />
      ) : nftList && nftList.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mx-5 mb-5">
          {nftList?.slice(0, 10).map((item: any, key: number) => {
            return (
              <div
                key={key}
                className="w-40 rounded-sm overflow-hidden relative shadow-2xl bg-white  group hover:shadow-7xl transition duration-300 ease-in opacity-[0.6] hover:opacity-[1] group"
              >
                <div className="relative overflow-hidden aspect-square w-full h-full md:w-auto md:h-auto">
                  <NFTImage
                    nftUrl={item.imageUrl}
                    videoClassName=" h-full"
                    imageClassName=" h-full object-cover"
                  />
                </div>
                <div
                  className={`relative bg-secondary-50 border border-secondary-100  p-2 rounded-b-sm`}
                >
                  <p
                    className={`relative paragraph_bold text-[12px] inline-block whitespace-nowrap max-w-[120px] text-ellipsis overflow-hidden`}
                  >
                    {truncateText(item?.name, 50)}
                  </p>
                  <p
                    className={`paragraph text-[12px] leading-[12px] text-text-500 mb-1`}
                  >
                    Floor price
                  </p>
                  <p className="paragraph_bold text-[12px] leading-[18px]">
                    {getCurrencyFormattedString(item?.floorPrice)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoState
          title="No NFTs found"
          image={icons.noState.src}
          className="p-2"
          titleClassName="mb-6"
        />
      )}
    </>
  );
};

export default NFTList;
