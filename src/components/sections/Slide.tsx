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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(titleRef, { once: true });
  const [availableImages, setAvailableImages] = useState(defaultImages);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const titles = "着物コレクション";
  const title = titles.split("");
  const duration = 1.0;
  const delayPerChar = 0.10;
  const extraDelay = 0.2; // タイトルが全て表示されてから内容が出るまでの待ち時間（秒）
  const totalDelay = (title.length - 1) * delayPerChar + duration + extraDelay;

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
      // デスクトップ：3枚同時表示
      const extendedImages = [...images];
      while (extendedImages.length < 3) {
        extendedImages.push(...images);
      }
      
      const displayImages = extendedImages.slice(currentSlideIndex, currentSlideIndex + 3);
      if (displayImages.length < 3) {
        displayImages.push(...extendedImages.slice(0, 3 - displayImages.length));
      }
      
      return (
        <div className={animationStyles.rectangleSlideContainer}>
          <div className={animationStyles.slideWrapper}>
            {displayImages.map((image, index) => (
              <div
                key={`slide-${currentSlideIndex}-${index}`}
                className={animationStyles.rectangleSlideImage}
                style={{
                  backgroundImage: `url('${image}')`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Section id="slide">
      <div className={styles.slideRow}>
        <h2 ref={titleRef} className={`${styles.slideTitle} sectionTitle`}>
          {textanimate}
        </h2>
        <div className={styles.slideContainer}>
          {renderSlideShow()}
        </div>

      </div>
    </Section>
  );
}