import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Slide/Slide.module.css";
import { useSlideAnimation } from "./hooks/useSlideAnimation";
import AnimatedTitle from "./AnimatedTitle";
import SlideContainer from "./SlideContainer";
import SlideControls from "./SlideControls";
import { DesktopSlideshowProps } from "@/types";

export default function DesktopSlideshow({
  images,
  currentSlideIndex,
  actualSlideIndex,
  isTransitioning,
  titleAnimationComplete,
  inView,
  duration,
  delayPerChar,
  titleRef,
  onPrevious,
  onNext
}: DesktopSlideshowProps) {
  const titleText = "着物コレクション";
  const [forceShowSlide, setForceShowSlide] = useState(false);

  // スライドショー表示のフォールバック：要素が画面近くに来た時開始
  useEffect(() => {
    if (!titleAnimationComplete) {
      const checkProximityAndStartTimer = () => {
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          const isNearViewport = rect.top < window.innerHeight + 100;
          
          if (isNearViewport) {
            const timer = setTimeout(() => {
              if (titleRef.current && !titleAnimationComplete) {
                const rect = titleRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                  setForceShowSlide(true);
                }
              }
            }, 3000); // 6秒 → 3秒に短縮

            return () => clearTimeout(timer);
          }
        }
      };

      const cleanup = checkProximityAndStartTimer();
      
      const handleScroll = () => {
        if (!titleAnimationComplete) {
          checkProximityAndStartTimer();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (cleanup) cleanup();
      };
    }
  }, [titleAnimationComplete, titleRef]);

  const {
    extendedImages,
    imageCount,
    slideContainerStyle,
    slideWrapperStyle,
    slideItemStyle
  } = useSlideAnimation({
    images,
    actualSlideIndex,
    isTransitioning,
    height: '100%'
  });

  const shouldShowSlide = titleAnimationComplete || forceShowSlide;
  const extendedImageCount = extendedImages.length;

  // 小画像用のスタイル関数（mainImageと同じロジック + オフセット）
  const getSmallImageStyle = (offset: number): React.CSSProperties => {
    const smallImageIndex = imageCount + actualSlideIndex + offset;
    return {
      display: 'flex',
      width: `${extendedImageCount * 100}%`,
      height: '100%',
      transform: `translateX(-${smallImageIndex * (100 / extendedImageCount)}%)`,
      transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
    };
  };
  
  return (
    <div className={styles.slideLayout}>
      {/* 左側の大きな画像とコントロール */}
      <motion.div 
        className={styles.mainImageSection}
        initial={{ opacity: 0, x: -50 }}
        animate={shouldShowSlide ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.mainImage} style={slideContainerStyle}>
          <SlideContainer 
            extendedImages={extendedImages}
            slideWrapperStyle={slideWrapperStyle}
            slideItemStyle={slideItemStyle}
          />
        </div>
        <SlideControls
          currentSlideIndex={currentSlideIndex}
          imageCount={imageCount}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </motion.div>

      {/* 右側のコンテンツ */}
      <div className={styles.rightContent}>
        
        {/* セクションタイトル */}
        <AnimatedTitle
          titleRef={titleRef}
          titleText={titleText}
          inView={inView}
          duration={duration}
          delayPerChar={delayPerChar}
          className={styles.kimonoCollectionTitle}
        />
        
        {/* 2枚の小さな画像 */}
        <motion.div 
          className={styles.smallImagesContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={shouldShowSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.smallImage} style={slideContainerStyle}>
            <SlideContainer 
              extendedImages={extendedImages}
              slideWrapperStyle={getSmallImageStyle(1)}
              slideItemStyle={slideItemStyle}
            />
          </div>
          <div className={styles.smallImage} style={slideContainerStyle}>
            <SlideContainer 
              extendedImages={extendedImages}
              slideWrapperStyle={getSmallImageStyle(2)}
              slideItemStyle={slideItemStyle}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}