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
  return (
    <div ref={titleRef} className={className} style={style}>
      {titleText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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