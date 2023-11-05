import { isVideo } from "@/utils";
import { INFTData } from "@/utils/api/apiTypes";
import { icons } from "@/utils/images";
import { FC } from "react";

export interface INFTImageProps {
  nftData: INFTData;
  imageClassName?: string;
  videoClassName?: string;
  imageFlag?: boolean;
}

const NFTImage: FC<INFTImageProps> = ({
  nftData,
  videoClassName,
  imageFlag,
}) => {
  const imageUrl =
    nftData?.content || nftData?.image_url || icons.placeholderNFT.src;
  return (
    <>
      {isVideo(imageUrl) ? (
        <video
          autoPlay
          loop
          muted
          className={`object-fill ${videoClassName ?? ""}`}
        >
          <source src={imageUrl} type="video/mp4"></source>
        </video>
      ) : imageFlag ? (
        <img
          src={imageUrl}
          alt={nftData?.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${icons.placeholderNFT.src}`;
          }}
        />
      ) : null}
    </>
  );
};
export default NFTImage;
