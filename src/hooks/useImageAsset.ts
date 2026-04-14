"use client";

import { useEffect, useState } from "react";

export const useImageAsset = (src: string | null) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }

    const nextImage = new window.Image();
    nextImage.crossOrigin = "anonymous";
    nextImage.onload = () => setImage(nextImage);
    nextImage.src = src;

    return () => {
      setImage(null);
    };
  }, [src]);

  return image;
};
