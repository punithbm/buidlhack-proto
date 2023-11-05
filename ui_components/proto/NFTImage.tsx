import { isVideo } from "@/utils";
import { INFTData } from "@/utils/api/apiTypes";
import { icons } from "@/utils/images";
import { FC } from "react";

export interface INFTImageProps {
  nftUrl: string;
  imageClassName?: string;
  videoClassName?: string;
  imageFlag?: boolean;
}

const NFTImage: FC<INFTImageProps> = ({
  nftUrl,
  videoClassName,
  imageFlag,
}) => {
  const imageUrl = nftUrl || icons.placeholderNFT.src;
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
      ) : (
        <img
          src={imageUrl}
          alt={"nft"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${icons.placeholderNFT.src}`;
          }}
        />
      )}
    </>
  );
};
export default NFTImage;
