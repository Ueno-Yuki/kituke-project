import { useState, useEffect, useRef } from "react";
import Section from "../Section/Section";
import animationStyles from "../../styles/Animation.module.css";
import styles from "../../styles/Slide.module.css";
import { motion, useInView } from "framer-motion";

const defaultImages = {
  desktop: ['/pc/hero01.jpg'],
  mobile: ['/mobile/hero01.jpg']
};

export default function Slide() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });
  const [availableImages, setAvailableImages] = useState(defaultImages);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  // タイトルアニメーション設定
  const titleText = "着物コレクション";
  const duration = 0.8;
  const delayPerChar = 0.08;
  const totalTitleDelay = titleText.length * delayPerChar + duration;

  useEffect(() => {
    const loadImagesList = async () => {
      try {
        const response = await fetch('/api/images');
        const data = await response.json();
        
        if (data.desktop.length > 0 && data.mobile.length > 0) {
          setAvailableImages({
            desktop: data.desktop,
            mobile: data.mobile
          });
        }
      } catch (error) {
        console.log('Failed to load images, using defaults:', error);
      }
    };

    loadImagesList();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 初期表示時の可視性をチェック
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  
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

  // タイトルアニメーション完了を検知
  useEffect(() => {
    if (inView) {
      // 初期表示で可視の場合は即座にアニメーション開始
      const delay = isInitiallyVisible ? 0 : totalTitleDelay * 1000;
      const timer = setTimeout(() => {
        setTitleAnimationComplete(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, totalTitleDelay, isInitiallyVisible]);


  // スライドショーの自動切り替え
  useEffect(() => {
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    if (images.length > 0) {
      const slideInterval = setInterval(() => {
        if (isMobile) {
          // モバイル：全ての画像を順番に表示
          setCurrentSlideIndex(prev => (prev + 1) % images.length);
        } else {
          // デスクトップ：3枚表示なので調整
          setCurrentSlideIndex(prev => (prev + 1) % (images.length > 3 ? images.length - 2 : images.length));
        }
      }, 7000);

      return () => clearInterval(slideInterval);
    }
  }, [availableImages, isMobile]);

  const renderSlideShow = () => {
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    
    if (isMobile) {
      // モバイル：1枚ずつ表示
      const currentImage = images[currentSlideIndex % images.length];
      return (
        <>
          {/* セクションタイトル */}
          <div ref={titleRef} className={styles.kimonoCollectionTitle} style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {titleText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: duration, 
                  delay: index * delayPerChar,
                  ease: "easeOut"
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className={animationStyles.mobileSlideContainer}>
            <div
              className={`${animationStyles.slideContainer} ${animationStyles.slideAnimate}`}
              style={{
                '--slide-bg-image': `url('${currentImage}')`
              } as React.CSSProperties}
              key={currentSlideIndex}
            />
          </div>
          <div className={styles.slideControls}>
            <button 
              className={styles.prevButton}
              onClick={() => setCurrentSlideIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            >
              ‹
            </button>
            <button 
              className={styles.nextButton}
              onClick={() => setCurrentSlideIndex(prev => (prev + 1) % images.length)}
            >
              ›
            </button>
            <span className={styles.slideCounter}>
              {currentSlideIndex + 1}/{images.length}
            </span>
          </div>
        </>
      );
    } else {
      // デスクトップ：新しい構造 - 左側大きな画像、右側2枚の小さな画像
      const currentMainImage = images[currentSlideIndex % images.length];
      const smallImage1 = images[(currentSlideIndex + 1) % images.length];
      const smallImage2 = images[(currentSlideIndex + 2) % images.length];
      
      return (
        <div className={styles.slideLayout}>
          {/* 左側の大きな画像とコントロール */}
          <motion.div 
            className={styles.mainImageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={titleAnimationComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className={`${styles.mainImage} ${animationStyles.slideContainer} ${animationStyles.slideAnimate}`}
              style={{
                '--slide-bg-image': `url('${currentMainImage}')`
              } as React.CSSProperties}
              key={currentSlideIndex}
            />
            <div className={styles.slideControls}>
              <button 
                className={styles.prevButton}
                onClick={() => setCurrentSlideIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              >
                ‹
              </button>
              <button 
                className={styles.nextButton}
                onClick={() => setCurrentSlideIndex(prev => (prev + 1) % images.length)}
              >
                ›
              </button>
              <span className={styles.slideCounter}>
                {currentSlideIndex + 1}/{images.length}
              </span>
            </div>
          </motion.div>

          {/* 右側のコンテンツ */}
          <div className={styles.rightContent}>
            
            {/* セクションタイトル */}
            <div ref={titleRef} className={styles.kimonoCollectionTitle}>
              {titleText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: duration, 
                    delay: index * delayPerChar,
                    ease: "easeOut"
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* 2枚の小さな画像 */}
            <motion.div 
              className={styles.smallImagesContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={titleAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div 
                className={styles.smallImage}
                style={{ backgroundImage: `url('${smallImage1}')` }}
              />
              <div 
                className={styles.smallImage}
                style={{ backgroundImage: `url('${smallImage2}')` }}
              />
            </motion.div>
          </div>
        </div>
      );
    }
  };

  return (
    <Section id="slide" className={styles.slideSection}>
      <div className={styles.slideRow}>
        <div className={styles.slideContainer}>
          {renderSlideShow()}
        </div>
      </div>
    </Section>
  );
}