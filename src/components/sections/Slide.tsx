import { useRef, useEffect, useState } from "react";
import SectionWrapper from "../Layout/SectionWrapper";
import styles from "../../styles/Slide.module.css";
import { useSlideImages } from "./Slide/hooks/useSlideImages";
import { useSlideLogic } from "./Slide/hooks/useSlideLogic";
import { useTitleAnimation } from "../../hooks/useTitleAnimation";
import MobileSlideshow from "./Slide/MobileSlideshow";
import DesktopSlideshow from "./Slide/DesktopSlideshow";

export default function Slide() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleText = "着物コレクション";
  
  const { currentImages, isMobile, isClient } = useSlideImages();
  const { titleAnimationComplete, inView, duration, delayPerChar } = useTitleAnimation({
    titleRef,
    titleText
  });
  
  const {
    currentSlideIndex,
    actualSlideIndex,
    isTransitioning,
    handlePrevious,
    handleNext
  } = useSlideLogic({
    images: currentImages,
    titleAnimationComplete
  });

  const renderSlideShow = () => {
    if (isMobile) {
      return (
        <MobileSlideshow
          images={currentImages}
          currentSlideIndex={currentSlideIndex}
          actualSlideIndex={actualSlideIndex}
          isTransitioning={isTransitioning}
          titleAnimationComplete={titleAnimationComplete}
          inView={inView}
          duration={duration}
          delayPerChar={delayPerChar}
          titleRef={titleRef}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    } else {
      return (
        <DesktopSlideshow
          images={currentImages}
          currentSlideIndex={currentSlideIndex}
          actualSlideIndex={actualSlideIndex}
          isTransitioning={isTransitioning}
          titleAnimationComplete={titleAnimationComplete}
          inView={inView}
          duration={duration}
          delayPerChar={delayPerChar}
          titleRef={titleRef}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      );
    }
  };

  // SSR時は何も表示せず、クライアント側でのみ表示
  if (!isClient) {
    return (
      <SectionWrapper id="slide" className={styles.slideSection}>
        <div className={styles.slideRow}>
          {/* SSR時は空の状態 */}
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="slide" className={styles.slideSection}>
      <div className={styles.slideRow}>
        {renderSlideShow()}
      </div>
    </SectionWrapper>
  );
}