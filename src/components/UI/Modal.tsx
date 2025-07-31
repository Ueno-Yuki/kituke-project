import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/UI/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // カスタムフックでスクロール制御とキーボードイベントを管理
  useModal(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* モーダル本体 */}
          <div className={styles.modalContainer} onClick={onClose}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // モーダル内のクリックで閉じないようにする
            >
            {/* ヘッダー */}
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="モーダルを閉じる"
              >
                ✕
              </button>
            </div>

              {/* コンテンツ */}
              <div className={`${styles.content} modal-content-scrollable`}>
                {children}
              </div>
              
              {/* 下部固定閉じるボタン */}
              <div className={styles.footer}>
                <button
                  className={styles.closeButtonBottom}
                  onClick={onClose}
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}