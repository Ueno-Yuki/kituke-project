import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Contact/Contact.module.css";
import { FAQ_DATA } from "../../../constants/content";
import { UI_ANIMATION } from "../../../constants/ui";

export default function ContactGrid() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={styles.contactGrid}>
      <div className={styles.contactForm}>
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>よくあるご質問</h3>
          <div className={styles.formContent}>
            <div className={styles.serviceList}>
              <div className={styles.faqList}>
                {FAQ_DATA.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`${styles.faqItem} ${openFaqIndex === index ? styles.faqItemOpen : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <h5 className={`${styles.faqQuestion} ${openFaqIndex === index ? styles.faqQuestionOpen : ''}`}>
                      {faq.question}
                      <span className={`${styles.faqIcon} ${openFaqIndex === index ? styles.faqIconOpen : ''}`}>
                        ▼
                      </span>
                    </h5>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaqIndex === index ? "auto" : 0,
                        opacity: openFaqIndex === index ? 1 : 0
                      }}
                      transition={{ duration: UI_ANIMATION.FAQ.DURATION, ease: UI_ANIMATION.FAQ.EASING }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}