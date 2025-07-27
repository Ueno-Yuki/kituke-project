import { useMemo } from 'react';

interface UseSlideAnimationProps {
  images: string[];
  actualSlideIndex: number;
  isTransitioning: boolean;
  height?: string;
}

/**
 * スライドアニメーションに必要な共通ロジックと値を提供するフック
 */
export function useSlideAnimation({
  images,
  actualSlideIndex,
  isTransitioning,
  height = '100%'
}: UseSlideAnimationProps) {
  const imageCount = images.length;
  
  // 無限ループ用に画像を複製
  const extendedImages = useMemo(() => [
    ...images, // 前の複製
    ...images, // 実画像
    ...images  // 後の複製
  ], [images]);
  
  const extendedImageCount = extendedImages.length;
  
  // 共通スタイル
  const slideContainerStyle: React.CSSProperties = useMemo(() => ({
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height,
  }), [height]);
  
  const slideWrapperStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    width: `${extendedImageCount * 100}%`,
    height: '100%',
    transform: `translateX(-${(imageCount + actualSlideIndex) * (100 / extendedImageCount)}%)`,
    transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
  }), [extendedImageCount, imageCount, actualSlideIndex, isTransitioning]);
  
  const slideItemStyle: React.CSSProperties = useMemo(() => ({
    width: `${100 / extendedImageCount}%`,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    flexShrink: 0,
  }), [extendedImageCount]);

  return {
    extendedImages,
    imageCount,
    slideContainerStyle,
    slideWrapperStyle,
    slideItemStyle
  };
}