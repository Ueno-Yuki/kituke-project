import { useState, useEffect } from 'react';
import { SlideImages } from '@/types';

const defaultImages: SlideImages = {
  desktop: ['/pc/hero01.jpg'],
  mobile: ['/mobile/hero01.jpg']
};

/**
 * スライド画像の管理を行うカスタムフック
 */
export function useSlideImages() {
  const [availableImages, setAvailableImages] = useState<SlideImages>(defaultImages);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const loadImagesList = async () => {
      try {
        const response = await fetch('/api/images');
        const data = await response.json();
        
        if (data.desktop.length > 0 && data.mobile.length > 0) {
          setAvailableImages({
            desktop: data.desktop,
            mobile: data.mobile
          });
        }
      } catch (error) {
        console.log('Failed to load images, using defaults:', error);
      }
    };

    loadImagesList();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentImages = isMobile ? availableImages.mobile : availableImages.desktop;

  return {
    availableImages,
    currentImages,
    isMobile
  };
}