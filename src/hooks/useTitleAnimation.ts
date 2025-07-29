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
    margin: "0px 0px -50px 0px" // 要素が画面下部50px手前で発火
  });
  const isInitiallyVisible = useInitialVisibility(titleRef);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [forceInView, setForceInView] = useState(false);

  const totalTitleDelay = titleText.length * delayPerChar + duration;

  // フォールバック：要素が画面内にあるのにinViewが発火しない場合
  useEffect(() => {
    if (!inView && !forceInView) {
      // 1秒後に位置チェック
      const fallbackTimer1 = setTimeout(() => {
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            setForceInView(true);
          }
        }
      }, 1000);

      // 最終フォールバック：2秒後に無条件で発火
      const fallbackTimer2 = setTimeout(() => {
        setForceInView(true);
      }, 2000);

      return () => {
        clearTimeout(fallbackTimer1);
        clearTimeout(fallbackTimer2);
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