import { useState, useEffect, RefObject } from 'react';

/**
 * 要素の初期表示時の可視性をチェックするカスタムフック
 * @param elementRef - チェック対象の要素のRef
 * @param delay - チェックを行うまでの遅延時間（ミリ秒）
 * @returns 初期表示時に要素が可視かどうかのboolean値
 */
export function useInitialVisibility(
  elementRef: RefObject<HTMLElement | null>, 
  delay: number = 100
): boolean {
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  
  useEffect(() => {
    const checkInitialVisibility = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInitiallyVisible(isVisible);
      }
    };

    // 少し遅延させてDOMが確実に描画された後にチェック
    const timer = setTimeout(checkInitialVisibility, delay);
    return () => clearTimeout(timer);
  }, [elementRef, delay]);

  return isInitiallyVisible;
}