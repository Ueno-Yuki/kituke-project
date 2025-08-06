import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Slide/Slide.module.css";
import { useSlideAnimation } from "./hooks/useSlideAnimation";
import AnimatedTitle from "./AnimatedTitle";
import SlideContainer from "./SlideContainer";
import SlideControls from "./SlideControls";
import { MobileSlideshowProps } from "@/types";

export default function MobileSlideshow({
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
}: MobileSlideshowProps) {
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
    height: '30rem'
  });

  const shouldShowSlide = titleAnimationComplete || forceShowSlide;

  return (
    <>
      {/* セクションタイトル */}
      <AnimatedTitle
        titleRef={titleRef}
        titleText={titleText}
        inView={inView}
        duration={duration}
        delayPerChar={delayPerChar}
        className={styles.kimonoCollectionTitle}
        style={{ marginBottom: '1rem', textAlign: 'center' }}
      />
      
      {/* スクロール連動スライドアニメーション */}
      <motion.div
        style={slideContainerStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={shouldShowSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SlideContainer 
          extendedImages={extendedImages}
          slideWrapperStyle={slideWrapperStyle}
          slideItemStyle={slideItemStyle}
        />
      </motion.div>
      
      <SlideControls
        currentSlideIndex={currentSlideIndex}
        imageCount={imageCount}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </>
  );
}