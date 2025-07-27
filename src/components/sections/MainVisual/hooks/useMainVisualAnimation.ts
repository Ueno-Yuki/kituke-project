import { useState, useEffect } from 'react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

/**
 * MainVisualのアニメーション管理フック
 */
export function useMainVisualAnimation() {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const titleText = "着て、知って、きっと好きになる。";
  const isMobile = useMediaQuery("(max-width: 1076px)");

  // タイトル文字数とアニメーション時間を計算
  const totalChars = titleText.length;
  const animationDuration = totalChars * 0.04 + 0.8; // 各文字の遅延 + アニメーション時間

  useEffect(() => {
    // タイトルアニメーション完了のタイマー
    const timer = setTimeout(() => {
      setTitleAnimationComplete(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timer);
  }, [animationDuration]);

  return {
    titleAnimationComplete,
    titleText,
    isMobile,
    animationDuration
  };
}