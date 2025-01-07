import { useEffect, useState } from "react";

interface UseCarouselProps {
  totalImages: number;
  interval?: number;
}

export const useCarousel = ({
  totalImages,
  interval = 5000,
}: UseCarouselProps) => {
  const [curImage, setCurImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurImage((prev) => (prev + 1) % totalImages);
    }, interval);

    return () => clearInterval(timer);
  }, [totalImages, interval]);

  return curImage;
};
