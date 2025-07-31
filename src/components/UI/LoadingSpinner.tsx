import { motion } from "framer-motion";
import styles from "../../styles/UI/LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ 
  message = "Now Loading...", 
  size = 'medium' 
}: LoadingSpinnerProps) {
  // ドットアニメーション用のバリアント
  const dotVariants = {
    initial: { y: 0, opacity: 0.7 },
    animate: { 
      y: [-8, 0, -8], 
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // リングアニメーション用のバリアント
  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // パルスアニメーション用のバリアント
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`${styles.loadingContainer} ${styles[size]}`}>
      {/* メインローディングエリア */}
      <div className={styles.loadingAnimation}>
        {/* 外側のリング */}
        <motion.div
          className={styles.outerRing}
          variants={ringVariants}
          animate="animate"
        >
          <div className={styles.ringElement}></div>
        </motion.div>

        {/* 内側のパルス */}
        <motion.div
          className={styles.innerPulse}
          variants={pulseVariants}
          animate="animate"
        >
          <div className={styles.pulseElement}></div>
        </motion.div>

        {/* 中央のロゴまたはアイコン */}
        <motion.div
          className={styles.centerIcon}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.iconElement}>着</div>
        </motion.div>
      </div>

      {/* ローディングドット */}
      <div className={styles.loadingDots}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={styles.dot}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.2 }}
          />
        ))}
      </div>

      {/* ローディングテキスト */}
      {message && (
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}