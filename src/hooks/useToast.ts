import { useState, useCallback } from 'react';
import type { Toast, ToastType } from '../components/UI/Toast';

// ユニークIDを生成する関数
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // トーストを追加する関数
  const addToast = useCallback((
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const newToast: Toast = {
      id: generateId(),
      type,
      title,
      message,
      duration
    };

    setToasts(prev => [...prev, newToast]);
    return newToast.id;
  }, []);

  // トーストを削除する関数
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // 全てのトーストを削除する関数
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // 便利な個別メソッド
  const success = useCallback((title: string, message?: string, duration?: number) => {
    return addToast('success', title, message, duration);
  }, [addToast]);

  const error = useCallback((title: string, message?: string, duration?: number) => {
    return addToast('error', title, message, duration);
  }, [addToast]);

  const warning = useCallback((title: string, message?: string, duration?: number) => {
    return addToast('warning', title, message, duration);
  }, [addToast]);

  const info = useCallback((title: string, message?: string, duration?: number) => {
    return addToast('info', title, message, duration);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
}

export default useToast;