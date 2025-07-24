import Section from "../Section/Section";
import styles from "../../styles/About.module.css";
import animationStyles from "../../styles/Animation.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });
  const [showText, setShowText] = useState(false);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  // 追加: 768px以下かどうか
  const isMobile = useMediaQuery("(max-width: 768px)");

  const titles = "私について";
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
      const timer = setTimeout(() => setShowText(true), delay);
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
          transition: { 
            duration: 1.3,
            onComplete: () => {
              // スライドアニメーション完了後にマーカーアニメーション開始
              setTimeout(() => setShowHighlight(true), 500);
            }
          }
        }
      }
    : {
        offscreen: { x: 200, opacity: 0 },
        onscreen: {
          x: 0,
          opacity: 1,
          transition: { 
            duration: 1.3,
            onComplete: () => {
              // スライドアニメーション完了後にマーカーアニメーション開始
              setTimeout(() => setShowHighlight(true), 500);
            }
          }
        }
      };

  return (
    <Section id="about" className={styles.aboutSection}>
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
          <p>
            千葉県在住着付師です。<br/>
            もっと着物を日常に！着物は大変。苦しい。高い。<br/>
            そんな色々を吹き飛ばしもっと気楽に着ていただきたい。
          </p>
          <p>
            <span className={`${animationStyles.highlightText} ${showHighlight ? animationStyles.animate : ''}`}>
              着る楽しさ。着せる喜び。
            </span>
          </p>
          <p>着物の装いをお手伝いできる喜びをモットーに地域密着で活動させていただいてます。</p>
          <div className={styles.aboutSNS}>
            <a
              href="https://instagram.com/p/Ct0pKJ1vlwA/"
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
    </Section>
  );
} 