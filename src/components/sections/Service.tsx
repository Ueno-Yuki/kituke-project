import Section from "../Section/Section";
import styles from "../../styles/Service.module.css";
import animationStyles from "../../styles/Animation.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// 追加: 画面幅を判定するカスタムフック
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export default function Service() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });
  const [showText, setShowText] = useState(false);

  // 追加: 768px以下かどうか
  const isMobile = useMediaQuery("(max-width: 768px)");

  const titles = "サービス内容";
  const title = titles.split("");
  const duration = 1.0;
  const delayPerChar = 0.10;
  const extraDelay = 0.2; // タイトルが全て表示されてから内容が出るまでの待ち時間（秒）
  const totalDelay = (title.length - 1) * delayPerChar + duration + extraDelay;

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShowText(true), totalDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, totalDelay]);

  const textanimate = title.map((char, index) => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={ inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay: index * delayPerChar }}
      key={ index }
    >
      { char }
    </motion.span>
  ));

  // 画面幅でvariantsも切り替え（スマホ用はx:0も明示）
  const textVariants = isMobile
    ? {
        offscreen: { x: 0, y: 40, opacity: 0 },
        onscreen: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration: 1.3 }
        }
      }
    : {
        offscreen: { x: 200, opacity: 0 },
        onscreen: {
          x: 0,
          opacity: 1,
          transition: { duration: 1.3 }
        }
      };

  return (
    <Section id="service">
      <div className={styles.serviceRow}>
        <h2 ref={titleRef} className={`${styles.serviceTitle} sectionTitle`}>
          {textanimate}
        </h2>
        <motion.div
          ref={textBlockRef}
          className={styles.serviceText}
          variants={textVariants}
          initial="offscreen"
          animate={showText ? "onscreen" : "offscreen"}
        >
          <div className={styles.serviceGrid}>
            <div className={`${styles.serviceCard} ${styles.seijinshiki}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>成人式</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.sotsugyoushiki}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>卒業式</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.shichigosan}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>七五三</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.yukata}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>浴衣</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.hurisode}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>振袖</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.tomesode}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>留袖</span>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.omiyamairi}`}>
              <div className={styles.cardOverlay}>
                <span className={styles.serviceTitle}>お宮参り</span>
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.cardOverlay}>
                <span className={`${styles.serviceTitle} ${styles.houmon}`}>出張/訪問</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 