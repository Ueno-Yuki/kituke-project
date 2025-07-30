import SectionWrapper from "../Layout/SectionWrapper";
import styles from "../../styles/Service.module.css";
import animationStyles from "../../styles/Animation.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SECTION_TITLES, SERVICES } from "../../constants/content";
import { MEDIA_QUERIES, UI_ANIMATION, INVIEW_CONFIG, SERVICE_CARDS } from "../../constants/ui";

export default function Service() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const serviceGridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, INVIEW_CONFIG.DEFAULT);
  const gridInView = useInView(serviceGridRef, INVIEW_CONFIG.DEFAULT);
  const [showText, setShowText] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [showCards, setShowCards] = useState<boolean[]>(new Array(SERVICE_CARDS.TOTAL_COUNT).fill(false));

  // 追加: 768px以下かどうか
  const isMobile = useMediaQuery(MEDIA_QUERIES.MOBILE);

  const titles = SECTION_TITLES.SERVICE;
  const title = titles.split("");
  const duration = UI_ANIMATION.TITLE.DURATION;
  const delayPerChar = UI_ANIMATION.TITLE.DELAY_PER_CHAR;
  const extraDelay = UI_ANIMATION.TITLE.EXTRA_DELAY; // タイトルが全て表示されてから内容が出るまでの待ち時間（秒）
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

    // 少し遅延させてDOMが確実に描画された後にチェック
    const timer = setTimeout(checkInitialVisibility, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      // 初期表示で可視の場合は即座にアニメーション開始
      const delay = isInitiallyVisible ? 0 : totalDelay * 1000;
      const timer = setTimeout(() => {
        setShowText(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, totalDelay, isInitiallyVisible]);

  // ServiceGridが画面に入ったらカードアニメーション開始
  useEffect(() => {
    if (gridInView && showText) {
      const timer = setTimeout(() => {
        setShowCards(new Array(SERVICE_CARDS.TOTAL_COUNT).fill(true)); // 全てのカードを同時にtrue
      }, SERVICE_CARDS.ANIMATION_DELAY); // グリッドが見えてから指定時間後にアニメーション開始
      return () => clearTimeout(timer);
    }
  }, [gridInView, showText]);

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

  return (
    <SectionWrapper id="service" className={styles.serviceSection}>
      <div className={styles.serviceRow}>
        <h2 ref={titleRef} className={`${styles.serviceTitle} sectionTitle`}>
          {textanimate}
        </h2>
        <div 
          ref={serviceGridRef}
          className={styles.serviceGrid}
          style={{ 
            visibility: showText ? 'visible' : 'hidden'
          }}
        >
            <div className={`${styles.serviceCard} ${styles.seijinshiki} ${showCards[0] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[0] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>成人式</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.sotsugyoushiki} ${showCards[1] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[1] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>卒業式</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.shichigosan} ${showCards[2] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[2] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>七五三</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.yukata} ${showCards[3] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[3] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>浴衣</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.hurisode} ${showCards[4] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[4] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>振袖</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.tomesode} ${showCards[5] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[5] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>留袖</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.omiyamairi} ${showCards[6] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[6] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>お宮参り</span>
                </div>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.houmon} ${showCards[7] ? styles.animating : ''}`}>
              <div className={`${animationStyles.slideReveal} ${showCards[7] ? animationStyles.animate : ''}`}>
                <div className={styles.cardOverlay}>
                  <span className={styles.serviceTitle}>出張/訪問</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
} 