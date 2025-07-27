// アニメーション関連の定数定義

/** タイムアウト値（ミリ秒） */
export const TIMEOUTS = {
  /** DOM描画完了チェック遅延 */
  DOM_READY_DELAY: 100,
  /** スライドアニメーション完了時間 */
  SLIDE_ANIMATION_DURATION: 800,
  /** サービスアニメーション表示時間 */
  SERVICE_ANIMATION_DURATION: 1200,
  /** 手動制御後の自動再開時間 */
  AUTO_RESUME_DELAY: 5000,
  /** スライドショー自動切り替え間隔 */
  SLIDESHOW_INTERVAL: 7000,
} as const;

/** アニメーション遅延（秒） */
export const ANIMATION_DELAYS = {
  /** 文字アニメーション基本遅延 */
  CHAR_BASE_DELAY: 0.04,
  /** タイトル文字間遅延 */
  TITLE_CHAR_DELAY: 0.08,
  /** セクション間遅延 */
  SECTION_DELAY: 0.10,
} as const;

/** アニメーション持続時間（秒） */
export const ANIMATION_DURATIONS = {
  /** 基本フェード時間 */
  FADE_DURATION: 0.8,
  /** 文字アニメーション時間 */
  CHAR_DURATION: 0.8,
  /** スライドトランジション時間 */
  SLIDE_TRANSITION: 0.8,
} as const;

/** メディアクエリ */
export const BREAKPOINTS = {
  /** モバイル境界値 */
  MOBILE_MAX: '768px',
  /** タブレット境界値 */
  TABLET_MAX: '1024px',
} as const;