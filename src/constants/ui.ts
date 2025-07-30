// UIコンポーネント設定関連の定数定義

/** メディアクエリ */
export const MEDIA_QUERIES = {
  /** モバイル（768px以下） */
  MOBILE: "(max-width: 768px)",
  /** タブレット（1024px以下） */
  TABLET: "(max-width: 1024px)",
  /** About セクション用（1076px以下） */
  ABOUT_MOBILE: "(max-width: 1076px)",
  /** 高解像度ディスプレイ */
  HIGH_DPI: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
} as const;

/** アニメーション設定値 */
export const UI_ANIMATION = {
  /** タイトル文字アニメーション */
  TITLE: {
    DURATION: 1.0,
    DELAY_PER_CHAR: 0.10,
    EXTRA_DELAY: 0.2
  },
  /** FAQ アコーディオン */
  FAQ: {
    DURATION: 0.3,
    EASING: "easeInOut"
  },
  /** フッター */
  FOOTER: {
    DURATION: 0.8,
    EASING: "easeOut",
    INITIAL_Y: 50
  },
  /** コンテンツフェード */
  CONTENT_FADE: {
    DURATION: 0.8,
    EASING: "easeOut"
  }
} as const;

/** サービスカード設定 */
export const SERVICE_CARDS = {
  /** カードの総数 */
  TOTAL_COUNT: 8,
  /** アニメーション遅延 */
  ANIMATION_DELAY: 100 // ms
} as const;

/** InView 設定 */
export const INVIEW_CONFIG = {
  /** 基本設定 */
  DEFAULT: { once: true },
  /** コンテンツ用（マージン付き） */
  CONTENT: { once: true, margin: "-50px" },
  /** フッター用 */
  FOOTER: { once: true, margin: "-100px" }
} as const;

/** DOM 操作用タイムアウト */
export const DOM_TIMEOUTS = {
  /** 初期可視性チェック遅延 */
  INITIAL_VISIBILITY_CHECK: 100 // ms
} as const;