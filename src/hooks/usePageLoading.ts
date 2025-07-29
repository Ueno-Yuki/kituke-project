import { useState, useEffect } from 'react';

/**
 * ページ全体のローディング状態を管理するカスタムフック
 */
export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアント側でのみ実行
    setIsClient(true);
    
    // 最低限のローディング時間を確保（2秒）
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return {
    isLoading: !isClient || isLoading,
    isClient
  };
}