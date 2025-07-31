import { motion } from "framer-motion";
import styles from "../../../styles/MainVisual/MainVisual.module.css";
import animationStyles from "../../../styles/Common/Animation.module.css";

interface MobileMainVisualProps {
  titleText: string;
  titleAnimationComplete: boolean;
}

/**
 * モバイル版MainVisual - 縦書き・改行表示
 */
export default function MobileMainVisual({
  titleText,
  titleAnimationComplete
}: MobileMainVisualProps) {
  
  const renderAnimatedTitle = () => {
    // モバイル用：改行を含む縦表示
    const lines = titleText.split('、');
    return lines.map((line, lineIndex) => (
      <div key={lineIndex} className={animationStyles.titleLine}>
        {line.split('').map((char, charIndex) => {
          const totalIndex = lines.slice(0, lineIndex).join('').length + charIndex;
          return (
            <span
              key={charIndex}
              className={`${animationStyles.slideUpChar} ${char === ' ' ? animationStyles.space : ''}`}
              style={{
                animationDelay: `${totalIndex * 0.04}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
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