import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "../../styles/Footer/Footer.module.css";
import Modal from "../UI/Modal";
import { POLICIES } from "../../constants/content";
import { UI_ANIMATION, INVIEW_CONFIG } from "../../constants/ui";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, INVIEW_CONFIG.FOOTER);
  const [modalContent, setModalContent] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: "",
    content: ""
  });

  const openModal = (type: 'SITE_POLICY' | 'PRIVACY_POLICY') => {
    const policy = POLICIES[type];
    setModalContent({
      isOpen: true,
      title: policy.title,
      content: policy.content
    });
  };

  const closeModal = () => {
    setModalContent(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <motion.footer
      ref={footerRef}
      className={styles.footer}
      initial={{ opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: UI_ANIMATION.FOOTER.DURATION, ease: UI_ANIMATION.FOOTER.EASING }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.policyLinks}>
            <button
              className={styles.policyLink}
              onClick={() => openModal('SITE_POLICY')}
            >
              サイトポリシー
            </button>
            <button
              className={styles.policyLink}
              onClick={() => openModal('PRIVACY_POLICY')}
            >
              プライバシーポリシー
            </button>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            Copyright &copy; {new Date().getFullYear()} YUKIE SAKAI All rights reserved.
          </p>
        </div>
      </div>

      {/* モーダル */}
      <Modal
        isOpen={modalContent.isOpen}
        onClose={closeModal}
        title={modalContent.title}
      >
        <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
      </Modal>
    </motion.footer>
  );
}