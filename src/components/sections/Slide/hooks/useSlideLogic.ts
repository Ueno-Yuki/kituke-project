import { useState, useEffect, useRef } from 'react';
import { TIMEOUTS } from '@/constants/animation';
import { UseSlideLogicProps } from '@/types';

/**
 * スライドショーのロジックを管理するカスタムフック
 */
export function useSlideLogic({ images, titleAnimationComplete }: UseSlideLogicProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [actualSlideIndex, setActualSlideIndex] = useState(0);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 自動スライドの管理
  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    
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
        }, TIMEOUTS.SLIDE_ANIMATION_DURATION);
      }
    }, TIMEOUTS.SLIDESHOW_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
  };

  // 自動スライドの開始/停止
  useEffect(() => {
    if (images.length > 1 && titleAnimationComplete) {
      if (isManualControl) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    }

    return () => stopAutoSlide();
  }, [images.length, titleAnimationComplete, isManualControl]);

  // 手動制御
  const handlePrevious = () => {
    if (isTransitioning) return;
    
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
    }, TIMEOUTS.SLIDE_ANIMATION_DURATION);
    
    // 5秒後に自動再生に戻る
    setTimeout(() => {
      setIsManualControl(false);
    }, TIMEOUTS.AUTO_RESUME_DELAY);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
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
    }, TIMEOUTS.SLIDE_ANIMATION_DURATION);
    
    // 5秒後に自動再生に戻る
    setTimeout(() => {
      setIsManualControl(false);
    }, TIMEOUTS.AUTO_RESUME_DELAY);
  };

  return {
    currentSlideIndex,
    actualSlideIndex,
    isTransitioning,
    handlePrevious,
    handleNext
  };
}