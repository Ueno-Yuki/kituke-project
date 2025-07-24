import { useState, useEffect } from "react";
import Section from "../Section/Section";
import animationStyles from "../../styles/Animation.module.css";
import styles from "../../styles/Slide.module.css";

const defaultImages = {
  desktop: ['/pc/hero01.jpg'],
  mobile: ['/mobile/hero01.jpg']
};

export default function Slide() {
  const [availableImages, setAvailableImages] = useState(defaultImages);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
      }, 4000);

      return () => clearInterval(slideInterval);
    }
  }, [availableImages, isMobile]);

  const renderSlideShow = () => {
    const images = isMobile ? availableImages.mobile : availableImages.desktop;
    
    if (isMobile) {
      // モバイル：1枚ずつ表示
      const currentImage = images[currentSlideIndex % images.length];
      return (
        <div className={animationStyles.mobileSlideContainer}>
          <div
            className={animationStyles.mobileSlideImage}
            style={{
              backgroundImage: `url('${currentImage}')`,
            }}
          />
        </div>
      );
    } else {
      // デスクトップ：新しい構造 - 左側大きな画像、右側2枚の小さな画像
      const currentMainImage = images[currentSlideIndex % images.length];
      const smallImage1 = images[(currentSlideIndex + 1) % images.length];
      const smallImage2 = images[(currentSlideIndex + 2) % images.length];
      
      return (
        <div className={styles.slideLayout}>
          {/* 左側の大きな画像とコントロール */}
          <div className={styles.mainImageSection}>
            <div 
              className={styles.mainImage}
              style={{ backgroundImage: `url('${currentMainImage}')` }}
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
          </div>

          {/* 右側のコンテンツ */}
          <div className={styles.rightContent}>
            
            <div className={styles.kimonoCollectionTitle}>
              着物コレクション
            </div>
            {/* 2枚の小さな画像 */}
            <div className={styles.smallImagesContainer}>
              <div 
                className={styles.smallImage}
                style={{ backgroundImage: `url('${smallImage1}')` }}
              />
              <div 
                className={styles.smallImage}
                style={{ backgroundImage: `url('${smallImage2}')` }}
              />
            </div>
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