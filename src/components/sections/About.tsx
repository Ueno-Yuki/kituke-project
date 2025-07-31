import SectionWrapper from "../Layout/SectionWrapper";
import styles from "../../styles/About/About.module.css";
import animationStyles from "../../styles/Common/Animation.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ABOUT_TEXT, SECTION_TITLES } from "../../constants/content";
import { MEDIA_QUERIES, UI_ANIMATION, INVIEW_CONFIG, DOM_TIMEOUTS } from "../../constants/ui";
import { URLS } from "../../constants/urls";

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, INVIEW_CONFIG.DEFAULT);
  const [showText, setShowText] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  const isMobile = useMediaQuery(MEDIA_QUERIES.ABOUT_MOBILE);

  const titles = SECTION_TITLES.ABOUT;
  const title = titles.split("");
  const duration = 1.0;
  const delayPerChar = 0.10;
  const extraDelay = 0.2; // タイトルが全て表示されてから内容が出るまでの待ち時間（秒）
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
        // テキストアニメーション後にハイライトアニメーション開始
        setTimeout(() => setShowHighlight(true), 1800); // 1.3s + 0.5s
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, totalDelay, isInitiallyVisible]);

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
    <SectionWrapper id="about" className={styles.aboutSection}>
      <div className={styles.aboutRow}>
        <h2 ref={titleRef} className={`${styles.aboutTitle} sectionTitle`}>
          {textanimate}
        </h2>
        <motion.div
          ref={textRef}
          className={styles.aboutText}
          variants={textVariants}
          initial="offscreen"
          animate={showText ? "onscreen" : "offscreen"}
        >
          <p>{ABOUT_TEXT.experience_1}</p>
          <p>{ABOUT_TEXT.experience_2}</p>
          <p>{ABOUT_TEXT.experience_3}</p>
          <p>
            <span className={`${animationStyles.highlightText} ${showHighlight ? animationStyles.animate : ''}`}>
              {ABOUT_TEXT.experience_4}
            </span>
          </p>
          <p>{ABOUT_TEXT.experience_5}</p>
          <div className={styles.aboutSNS}>
            <a
              href={URLS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ display: "inline-block", color: "#E4405F", fontSize: "2rem" }}
            >
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "2.2rem", verticalAlign: "middle" }} />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
} 