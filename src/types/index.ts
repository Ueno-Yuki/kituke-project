import { ReactNode, RefObject } from "react";

/**
 * 共通コンポーネント
 */
export interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * ローディング画面
 */
export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * MainVisual
 */
export interface DesktopMainVisualProps {
  titleText: string;
  titleAnimationComplete: boolean;
}
export interface MobileMainVisualProps {
  titleText: string;
  titleAnimationComplete: boolean;
}

/**
 * スライドショー関連
 */
export interface DesktopSlideshowProps {
  images: string[];
  currentSlideIndex: number;
  actualSlideIndex: number;
  isTransitioning: boolean;
  titleAnimationComplete: boolean;
  inView: boolean;
  duration: number;
  delayPerChar: number;
  titleRef: React.RefObject<HTMLDivElement | null>;
  onPrevious: () => void;
  onNext: () => void;
}

export interface MobileSlideshowProps {
  images: string[];
  currentSlideIndex: number;
  actualSlideIndex: number;
  isTransitioning: boolean;
  titleAnimationComplete: boolean;
  inView: boolean;
  duration: number;
  delayPerChar: number;
  titleRef: React.RefObject<HTMLDivElement | null>;
  onPrevious: () => void;
  onNext: () => void;
}

export interface SlideContainerProps {
  extendedImages: string[];
  slideWrapperStyle: React.CSSProperties;
  slideItemStyle: React.CSSProperties;
}

export interface SlideControlsProps {
  currentSlideIndex: number;
  imageCount: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export interface UseSlideAnimationProps {
  images: string[];
  actualSlideIndex: number;
  isTransitioning: boolean;
  height?: string;
}

export interface SlideImages {
  desktop: string[];
  mobile: string[];
}

export interface UseSlideLogicProps {
  images: string[];
  titleAnimationComplete: boolean;
}

/**
 * UI関連
 */
export interface HamburgerMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface PageLoadingScreenProps {
  isLoading: boolean;
  resourcesLoaded?: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

/**
 * お問い合わせ
 */
export interface FormData {
  name: string;
  email: string;
  phone: string;
  content: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  content?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  content: string;
}

/* Resend API用 */
export interface ApiResponse {
  success?: boolean;
  error?: string;
  details?: any;
  data?: any;
}

/** 
 * アニメーション関連
 */
export interface AnimatedTitleProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
  titleText: string;
  inView: boolean;
  duration: number;
  delayPerChar: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface UseTitleAnimationProps {
  titleRef: RefObject<HTMLElement | null>;
  titleText: string;
  duration?: number;
  delayPerChar?: number;
}