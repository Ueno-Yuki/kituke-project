import { useState, useEffect, useRef } from "react";
import Section from "../Section/Section";
import styles from "../../styles/MainVisual.module.css";
import animationStyles from "../../styles/Animation.module.css";
import { motion } from "framer-motion";

export default function MainVisual() {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const titleText = "着て、知って、きっと好きになる。";
  const [isMobile, setIsMobile] = useState(false);

  // タイトル文字数とアニメーション時間を計算
  const totalChars = titleText.length;
  const animationDuration = totalChars * 0.04 + 0.8; // 各文字の遅延 + アニメーション時間

  useEffect(() => {
    // タイトルアニメーション完了のタイマー
    const timer = setTimeout(() => {
      setTitleAnimationComplete(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timer);
  }, [animationDuration]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1076);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderAnimatedTitle = () => {
    if (isMobile) {
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
    } else {
      // デスクトップ用：一行表示
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
            className={styles.scroll}
            initial={{ opacity: 0, y: 20 }}
            animate={titleAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <span>Scroll</span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 