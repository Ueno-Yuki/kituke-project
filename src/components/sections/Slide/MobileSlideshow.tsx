import { motion } from "framer-motion";
import styles from "../../../styles/Slide.module.css";
import { useSlideAnimation } from "./hooks/useSlideAnimation";
import AnimatedTitle from "./AnimatedTitle";
import SlideContainer from "./SlideContainer";
import SlideControls from "./SlideControls";

interface MobileSlideshowProps {
  images: string[];
  currentSlideIndex: number;
  actualSlideIndex: number;
  isTransitioning: boolean;
  titleAnimationComplete: boolean;
  inView: boolean;
  duration: number;
  delayPerChar: number;
  titleRef: React.RefObject<HTMLDivElement | null>;
  onPrevious: () => void;
  onNext: () => void;
}

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
    height: '300px'
  });

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
      
      {/* PC版と同様のスライドアニメーション */}
      <motion.div
        style={slideContainerStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={titleAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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