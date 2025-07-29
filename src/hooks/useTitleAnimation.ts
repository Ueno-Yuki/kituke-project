import { useState, useEffect, RefObject } from 'react';
import { useInView } from 'framer-motion';
import { useInitialVisibility } from './useInitialVisibility';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '../constants/animation';

interface UseTitleAnimationProps {
  titleRef: RefObject<HTMLElement | null>;
  titleText: string;
  duration?: number;
  delayPerChar?: number;
}

/**
 * タイトルアニメーションの管理を行うカスタムフック
 */
export function useTitleAnimation({
  titleRef,
  titleText,
  duration = ANIMATION_DURATIONS.CHAR_DURATION,
  delayPerChar = ANIMATION_DELAYS.TITLE_CHAR_DELAY
}: UseTitleAnimationProps) {
  const inView = useInView(titleRef, { 
    once: true, 
    margin: "0px 0px -20px 0px" // 要素が画面下部20px手前で発火（より早く）
  });
  const isInitiallyVisible = useInitialVisibility(titleRef);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [forceInView, setForceInView] = useState(false);

  const totalTitleDelay = titleText.length * delayPerChar + duration;

  // フォールバック：要素が画面近くに来た時にタイマー開始
  useEffect(() => {
    if (!inView && !forceInView) {
      const checkProximityAndStartTimer = () => {
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          const isNearViewport = rect.top < window.innerHeight + 200; // 画面下200px以内
          
          if (isNearViewport) {
            // 要素が画面近くに来たらフォールバックタイマー開始
            const fallbackTimer1 = setTimeout(() => {
              if (titleRef.current && !inView) {
                const rect = titleRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 50;
                if (isVisible) {
                  setForceInView(true);
                }
              }
            }, 800); // 2秒 → 0.8秒に短縮

            const fallbackTimer2 = setTimeout(() => {
              if (titleRef.current && !inView) {
                const rect = titleRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                  setForceInView(true);
                }
              }
            }, 1500); // 4秒 → 1.5秒に短縮

            return () => {
              clearTimeout(fallbackTimer1);
              clearTimeout(fallbackTimer2);
            };
          }
        }
      };

      // 初回チェック
      const cleanup = checkProximityAndStartTimer();
      
      // スクロール時にもチェック
      const handleScroll = () => {
        if (!inView && !forceInView) {
          checkProximityAndStartTimer();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (cleanup) cleanup();
      };
    }
  }, [inView, forceInView, titleRef]);

  // タイトルアニメーション完了を検知
  useEffect(() => {
    const shouldTrigger = inView || forceInView;
    
    if (shouldTrigger) {
      const delay = isInitiallyVisible ? 500 : totalTitleDelay * 1000; // 初期表示時も少し遅延
      const timer = setTimeout(() => {
        setTitleAnimationComplete(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, forceInView, totalTitleDelay, isInitiallyVisible]);

  return {
    inView: inView || forceInView,
    titleAnimationComplete,
    duration,
    delayPerChar
  };
}