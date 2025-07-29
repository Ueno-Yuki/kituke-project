import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
  titleText: string;
  inView: boolean;
  duration: number;
  delayPerChar: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * アニメーション付きタイトルコンポーネント
 */
export default function AnimatedTitle({
  titleRef,
  titleText,
  inView,
  duration,
  delayPerChar,
  className,
  style
}: AnimatedTitleProps) {
  const [forceShow, setForceShow] = useState(false);

  // 要素が画面近くに来た時にフォールバックタイマー開始
  useEffect(() => {
    if (!inView && !forceShow) {
      const checkProximityAndStartTimer = () => {
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          const isNearViewport = rect.top < window.innerHeight + 150; // 画面下150px以内
          
          if (isNearViewport) {
            const timer1 = setTimeout(() => {
              if (titleRef.current && !inView) {
                const rect = titleRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 50;
                if (isVisible) {
                  setForceShow(true);
                }
              }
            }, 1000); // 3秒 → 1秒に短縮

            const timer2 = setTimeout(() => {
              if (titleRef.current && !inView) {
                const rect = titleRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                  setForceShow(true);
                }
              }
            }, 2000); // 5秒 → 2秒に短縮

            return () => {
              clearTimeout(timer1);
              clearTimeout(timer2);
            };
          }
        }
      };

      const cleanup = checkProximityAndStartTimer();
      
      const handleScroll = () => {
        if (!inView && !forceShow) {
          checkProximityAndStartTimer();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (cleanup) cleanup();
      };
    }
  }, [inView, forceShow, titleRef]);

  const shouldAnimate = inView || forceShow;

  return (
    <div ref={titleRef} className={className} style={style}>
      {titleText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: duration, 
            delay: index * delayPerChar,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}