import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/UI/Toast.module.css';
import { ToastProps, ToastContainerProps } from '@/types';

// 個別のトーストコンポーネント
function ToastItem({ toast, onClose }: ToastProps) {
  const { id, type, title, message, duration = 5000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <motion.div
      className={`${styles.toast} ${styles[type]}`}
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 25,
        duration: 0.3
      }}
      onClick={() => onClose(id)}
    >
      <div className={styles.toastIcon}>
        {getIcon()}
      </div>
      
      <div className={styles.toastContent}>
        <div className={styles.toastTitle}>
          {title}
        </div>
        {message && (
          <div className={styles.toastMessage}>
            {message}
          </div>
        )}
      </div>
      
      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
        aria-label="通知を閉じる"
      >
        ✕
      </button>
      
      {/* プログレスバー */}
      <motion.div
        className={styles.progressBar}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
}

// トーストコンテナコンポーネント
export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className={styles.toastContainer}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;