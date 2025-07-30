import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../Layout/SectionWrapper";
import styles from "../../styles/Contact.module.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SECTION_TITLES, FAQ_DATA } from "../../constants/content";
import { MEDIA_QUERIES, UI_ANIMATION, INVIEW_CONFIG, DOM_TIMEOUTS } from "../../constants/ui";

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, INVIEW_CONFIG.DEFAULT);
  const contentInView = useInView(contentRef, INVIEW_CONFIG.CONTENT);
  const [showContent, setShowContent] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isMobile = useMediaQuery(MEDIA_QUERIES.MOBILE);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const titles = SECTION_TITLES.CONTACT;
  const title = titles.split("");
  const duration = UI_ANIMATION.TITLE.DURATION;
  const delayPerChar = UI_ANIMATION.TITLE.DELAY_PER_CHAR;
  const extraDelay = UI_ANIMATION.TITLE.EXTRA_DELAY;
  const totalDelay = (title.length - 1) * delayPerChar + duration + extraDelay;

  // 初期表示時の可視性をチェック
  useEffect(() => {
    const checkInitialVisibility = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInitiallyVisible(isVisible);
      }
    };

    const timer = setTimeout(checkInitialVisibility, DOM_TIMEOUTS.INITIAL_VISIBILITY_CHECK);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      const delay = isInitiallyVisible ? 0 : totalDelay * 1000;
      const timer = setTimeout(() => {
        setShowContent(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, totalDelay, isInitiallyVisible]);

  const textAnimate = title.map((char, index) => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay: index * delayPerChar }}
      key={index}
    >
      {char}
    </motion.span>
  ));

  return (
    <SectionWrapper id="contact" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <h2 ref={titleRef} className={`${styles.contactTitle} sectionTitle`}>
          {textAnimate}
        </h2>
        
        <motion.div
          ref={contentRef}
          className={styles.contactContent}
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: UI_ANIMATION.CONTENT_FADE.DURATION, ease: UI_ANIMATION.CONTENT_FADE.EASING }}
        >
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
        </motion.div>
      </div>
    </SectionWrapper>
  );
}