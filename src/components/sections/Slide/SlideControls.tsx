import styles from "../../../styles/Slide/Slide.module.css";

interface SlideControlsProps {
  currentSlideIndex: number;
  imageCount: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

/**
 * スライドコントロール（ボタン・カウンター）コンポーネント
 */
export default function SlideControls({
  currentSlideIndex,
  imageCount,
  onPrevious,
  onNext,
  className
}: SlideControlsProps) {
  return (
    <div className={className || styles.slideControls}>
      <button 
        className={styles.prevButton}
        onClick={onPrevious}
      >
        ‹
      </button>
      <button 
        className={styles.nextButton}
        onClick={onNext}
      >
        ›
      </button>
      <span className={styles.slideCounter}>
        {currentSlideIndex + 1}/{imageCount}
      </span>
    </div>
  );
}