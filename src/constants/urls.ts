// URL関連の定数定義

/** 基本URL */
export const URLS = {
  /** サイトのベースURL */
  CANONICAL: process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000",
  /** Instagram プロフィール */
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
  /** サイトマップ */
  SITEMAP: "/sitemap.xml",
  /** ファビコン */
  FAVICON: "/favicon.ico"
} as const;

/** 画像パス */
export const IMAGE_PATHS = {
  /** 背景画像 */
  BACKGROUND: {
    BASE: "/background/base-image.jpg",
    BASE_MOBILE: "/background/base-mobile-image.png"
  },
  /** サービス画像 */
  SERVICES: {
    SEIJINSHIKI: "/background/service-cad.jpg",
    SOTSUGYOUSHIKI: "/background/service-graduation.jpg", 
    SHICHIGOSAN: "/background/service-shichigosan.jpg",
    YUKATA: "/background/service-yukata.jpg",
    HURISODE: "/background/service-hurisode.jpg",
    TOMESODE: "/background/service-tomesode.jpg",
    OMIYAMAIRI: "/background/service-omiyamairi.jpg",
    HOUMON: "/background/service-houmon.jpg"
  }
} as const;

/** 内部リンク（ページ内アンカー） */
export const INTERNAL_LINKS = {
  MAIN_VISUAL: "#main",
  SLIDE: "#slide", 
  ABOUT: "#about",
  SERVICE: "#service",
  CONTACT: "#contact"
} as const;