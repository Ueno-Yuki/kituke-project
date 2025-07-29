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

  // 要素が画面内にあるがinViewが発火しない場合のフォールバック
  useEffect(() => {
    if (!inView && !forceShow) {
      // 1秒後にフォールバック
      const timer1 = setTimeout(() => {
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            setForceShow(true);
          }
        }
      }, 1000);

      // 最終フォールバック：2.5秒後に無条件で表示
      const timer2 = setTimeout(() => {
        setForceShow(true);
      }, 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
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