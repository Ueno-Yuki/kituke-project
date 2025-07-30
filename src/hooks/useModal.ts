import { useEffect, useRef } from 'react';

/**
 * モーダル管理用カスタムフック
 * スクロール制御とキーボードイベントを一元管理
 */
export function useModal(isOpen: boolean, onClose: () => void) {
  const scrollPosition = useRef(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // 現在のスクロール位置を保存
      scrollPosition.current = window.scrollY;
      
      // bodyにmodal-openクラスを追加（globals.cssで定義済み）
      document.body.classList.add('modal-open');
      
      // 保存したスクロール位置を維持
      document.body.style.top = `-${scrollPosition.current}px`;
      
      // ESCキーイベントリスナーの追加
      document.addEventListener("keydown", handleEsc);
      
      return () => {
        document.removeEventListener("keydown", handleEsc);
        
        // modal-openクラスを削除
        document.body.classList.remove('modal-open');
        
        // スタイルをリセット
        document.body.style.top = '';
        
        // スクロール位置を復元
        window.scrollTo(0, scrollPosition.current);
      };
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return {
    // 必要に応じて追加のメソッドやステートを返すことができる
  };
}