import { useState, useEffect, useRef } from "react";
import Section from "../Section/Section";
import styles from "../../styles/MainVisual.module.css";
import animationStyles from "../../styles/Animation.module.css";
import { motion } from "framer-motion";

export default function MainVisual() {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const titleText = "着るって、知るって、きっと好きになる。";
  const [isMobile, setIsMobile] = useState(false);

  const renderAnimatedTitle = () => {
    if (isMobile) {
      // モバイル用：改行を含む縦表示
      const lines = ["着るって、", "知るって、", "きっと好きになる。"];
      return lines.map((line, lineIndex) => (
        <div key={lineIndex} className={animationStyles.titleLine}>
          {line.split('').map((char, charIndex) => {
            const totalIndex = lines.slice(0, lineIndex).join('').length + charIndex;
            return (
              <span
                key={charIndex}
                className={`${animationStyles.slideUpChar} ${char === ' ' ? animationStyles.space : ''} ${titleAnimationComplete ? animationStyles.titleMoveUp : ''}`}
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
    } else {
      // デスクトップ用：一行表示
      return titleText.split('').map((char, index) => (
        <span
          key={index}
          className={`${animationStyles.slideUpChar} ${char === ' ' ? animationStyles.space : ''} ${titleAnimationComplete ? animationStyles.titleMoveUp : ''}`}
          style={{
            animationDelay: `${index * 0.04}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <Section className={styles.mainVisual} style={{ padding: 0 }}>
      <div className={styles.centerContent}>
        <div className={styles.titleContainer}>
          <div className={`${styles.title} ${animationStyles.titleContainer}`}>
            {renderAnimatedTitle()}
          </div>
          <motion.div 
            className={styles.scroll}>
            <span>Scroll</span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 