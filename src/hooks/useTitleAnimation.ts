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
  const inView = useInView(titleRef, { once: true });
  const isInitiallyVisible = useInitialVisibility(titleRef);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  const totalTitleDelay = titleText.length * delayPerChar + duration;

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

  return {
    inView,
    titleAnimationComplete,
    duration,
    delayPerChar
  };
}