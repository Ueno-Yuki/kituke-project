import { motion } from "framer-motion";
import styles from "../../../styles/MainVisual/MainVisual.module.css";
import animationStyles from "../../../styles/Common/Animation.module.css";
import { DesktopMainVisualProps } from "@/types";

/**
 * デスクトップ版MainVisual - 一行表示
 */
export default function DesktopMainVisual({
  titleText,
  titleAnimationComplete
}: DesktopMainVisualProps) {
  
  const renderAnimatedTitle = () => {
    return titleText.split('').map((char, index) => (
      <span
        key={index}
        className={`${animationStyles.slideUpChar} ${char === ' ' ? animationStyles.space : ''}`}
        style={{
          animationDelay: `${index * 0.04}s`
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className={styles.centerContent}>
      <div className={styles.titleContainer}>
        <div className={`${styles.title} ${animationStyles.titleContainer}`}>
          {renderAnimatedTitle()}
        </div>
        <motion.div 
          className={styles.scroll}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          <span>Scroll</span>
        </motion.div>
      </div>
    </div>
  );
}