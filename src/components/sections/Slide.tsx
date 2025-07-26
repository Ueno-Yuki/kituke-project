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
  const [isManualControl, setIsManualControl] = useState(false);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [actualSlideIndex, setActualSlideIndex] = useState(0); // 拡張配列での実際の位置

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

    const timer = setTimeout(checkInitialVisibility, 100);
    return () => clearTimeout(timer);
  }, []);

  // タイトルアニメーション完了を検知
  useEffect(() => {
    if (inView) {
      const delay = isInitiallyVisible ? 0 : totalTitleDelay * 1000;
      const timer = setTimeout(() => {
        setTitleAnimationComplete(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, totalTitleDelay, isInitiallyVisible]);

  // 自動スライドの管理
  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    autoSlideIntervalRef.current = setInterval(() => {
      if (!isManualControl && !isTransitioning) {
        setIsTransitioning(true);
        setActualSlideIndex(prev => prev + 1);
        
        // アニメーション完了後にリセット判定
        setTimeout(() => {
          setActualSlideIndex(prev => {
            if (prev >= images.length) {
              // 最後の実画像を超えたら最初の実画像位置にリセット
              setTimeout(() => {
                setActualSlideIndex(0);
              }, 0);
              return images.length;
            }
            return prev;
          });
          setCurrentSlideIndex(prev => (prev + 1) % images.length);
          setIsTransitioning(false);
        }, 800);
      }
    }, 7000);
  };

  const stopAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  };

  // 自動スライドの開始/停止
  useEffect(() => {
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    if (images.length > 1 && titleAnimationComplete) {
      if (isManualControl) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    }

    return () => stopAutoSlide();
  }, [availableImages, isMobile, titleAnimationComplete, isManualControl]);

  // 手動制御
  const handlePrevious = () => {
    if (isTransitioning) return;
    
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    setIsManualControl(true);
    setIsTransitioning(true);
    
    setActualSlideIndex(prev => prev - 1);
    
    // アニメーション完了後にリセット判定
    setTimeout(() => {
      setActualSlideIndex(prev => {
        if (prev <= -1) {
          // 最初の実画像より前に行ったら最後の実画像位置にリセット
          setTimeout(() => {
            setActualSlideIndex(images.length - 1);
          }, 0);
          return -1;
        }
        return prev;
      });
      setCurrentSlideIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      setIsTransitioning(false);
    }, 800);
    
    // 5秒後に自動再生に戻る
    setTimeout(() => {
      setIsManualControl(false);
    }, 5000);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    setIsManualControl(true);
    setIsTransitioning(true);
    
    setActualSlideIndex(prev => prev + 1);
    
    // アニメーション完了後にリセット判定
    setTimeout(() => {
      setActualSlideIndex(prev => {
        if (prev >= images.length) {
          // 最後の実画像を超えたら最初の実画像位置にリセット
          setTimeout(() => {
            setActualSlideIndex(0);
          }, 0);
          return images.length;
        }
        return prev;
      });
      setCurrentSlideIndex(prev => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 800);
    
    // 5秒後に自動再生に戻る
    setTimeout(() => {
      setIsManualControl(false);
    }, 5000);
  };

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
              onClick={handlePrevious}
            >
              ‹
            </button>
            <button 
              className={styles.nextButton}
              onClick={handleNext}
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
      // デスクトップ：水平スライドアニメーション
      const imageCount = images.length;
      
      // 無限ループ用に画像を複製（smallImageのオフセットを考慮して前後に十分な数を追加）
      const extendedImages = [
        ...images, // 前の複製
        ...images, // 実画像
        ...images  // 後の複製
      ];
      const extendedImageCount = extendedImages.length;
      
      // 各コンテナのスタイル
      const slideContainerStyle: React.CSSProperties = {
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
      };
      
      const slideWrapperStyle: React.CSSProperties = {
        display: 'flex',
        width: `${extendedImageCount * 100}%`,
        height: '100%',
        transform: `translateX(-${(imageCount + actualSlideIndex) * (100 / extendedImageCount)}%)`,
        transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
      };
      
      const slideItemStyle: React.CSSProperties = {
        width: `${100 / extendedImageCount}%`,
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexShrink: 0,
      };

      // 小画像用のスタイル関数（mainImageと同じロジック + オフセット）
      const getSmallImageStyle = (offset: number): React.CSSProperties => {
        const smallImageIndex = imageCount + actualSlideIndex + offset;
        return {
          display: 'flex',
          width: `${extendedImageCount * 100}%`,
          height: '100%',
          transform: `translateX(-${smallImageIndex * (100 / extendedImageCount)}%)`,
          transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
        };
      };
      
      return (
        <div className={styles.slideLayout}>
          {/* 左側の大きな画像とコントロール */}
          <motion.div 
            className={styles.mainImageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={titleAnimationComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.mainImage} style={slideContainerStyle}>
              <div style={slideWrapperStyle}>
                {extendedImages.map((image, index) => (
                  <div 
                    key={index}
                    style={{
                      ...slideItemStyle,
                      backgroundImage: `url('${image}')`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.slideControls}>
              <button 
                className={styles.prevButton}
                onClick={handlePrevious}
              >
                ‹
              </button>
              <button 
                className={styles.nextButton}
                onClick={handleNext}
              >
                ›
              </button>
              <span className={styles.slideCounter}>
                {currentSlideIndex + 1}/{imageCount}
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
              <div className={styles.smallImage} style={slideContainerStyle}>
                <div style={getSmallImageStyle(1)}>
                  {extendedImages.map((image, index) => (
                    <div 
                      key={index}
                      style={{
                        ...slideItemStyle,
                        backgroundImage: `url('${image}')`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.smallImage} style={slideContainerStyle}>
                <div style={getSmallImageStyle(2)}>
                  {extendedImages.map((image, index) => (
                    <div 
                      key={index}
                      style={{
                        ...slideItemStyle,
                        backgroundImage: `url('${image}')`
                      }}
                    />
                  ))}
                </div>
              </div>
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