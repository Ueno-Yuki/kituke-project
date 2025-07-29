import { motion } from "framer-motion";
import styles from "../../styles/LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ 
  message = "Now Loading...", 
  size = 'medium' 
}: LoadingSpinnerProps) {
  return (
    <div className={`${styles.loadingContainer} ${styles[size]}`}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className={styles.spinnerInner}></div>
      </motion.div>
      {message && (
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}