"use client";
import { TNextImage } from "@/utils/images";
import Image, { ImageProps } from "next/image";
import React, { FC, useEffect, useState } from "react";

interface IImageWithFallbackProps extends ImageProps {
  fallbackSrc?: TNextImage;
  fallbackComponent: React.ReactElement | null;
}

const ImageWithFallback: FC<IImageWithFallbackProps> = ({
  src,
  fallbackComponent,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  return (
    <>
      {isError ? (
        <>{fallbackComponent}</>
      ) : (
        <Image
          src={imgSrc ?? ""}
          onError={() => {
            if (!imgSrc) {
              setIsError(true);
            } else {
              if (rest.fallbackSrc) {
                setImgSrc(rest.fallbackSrc);
              } else {
                setIsError(true);
              }
            }
          }}
          {...rest}
        />
      )}
    </>
  );
};

export default ImageWithFallback;
