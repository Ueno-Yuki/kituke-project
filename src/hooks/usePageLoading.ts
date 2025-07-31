import { useState, useEffect } from 'react';

/**
 * ページ全体のローディング状態を管理するカスタムフック
 * リソースの読み込み完了後、プラス3秒の表示時間を追加
 */
export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // クライアント側でのみ実行
    setIsClient(true);
    
    // リソースの読み込み完了を監視
    const checkResourcesLoaded = () => {
      const images = Array.from(document.images);
      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      // フォントの読み込み完了も待つ
      const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

      // すべてのリソースの読み込み完了を待つ
      Promise.all([...imagePromises, fontPromise]).then(() => {
        setResourcesLoaded(true);
      });
    };

    // DOM読み込み完了時にリソースチェック開始
    if (document.readyState === 'complete') {
      checkResourcesLoaded();
    } else {
      const handleLoad = () => checkResourcesLoaded();
      window.addEventListener('load', handleLoad);
      document.addEventListener('DOMContentLoaded', checkResourcesLoaded);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        document.removeEventListener('DOMContentLoaded', checkResourcesLoaded);
      };
    }
  }, []);

  useEffect(() => {
    // リソース読み込み完了後、3秒待ってからローディングを終了
    if (resourcesLoaded && isClient) {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // リソース読み込み完了後 + 3秒

      return () => clearTimeout(loadingTimer);
    }
  }, [resourcesLoaded, isClient]);

  return {
    isLoading: !isClient || isLoading,
    isClient,
    resourcesLoaded
  };
}