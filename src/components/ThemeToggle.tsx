import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/pages/_app";
import styles from "../styles/ThemeToggle.module.css";
import HamburgerMenu from "./HamburgerMenu";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // クライアントマウント後のみisDarkを判定
  let isDark = false;
  if (mounted) {
    isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  return (
    <>
      <button
        className={styles.toggle}
        aria-label="テーマ切り替え"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        title={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      >
        {mounted && (
          <span className={styles["material-symbols"]}>
            {isDark ? "dark_mode" : "light_mode"}
          </span>
        )}
      </button>
      <button
        className={styles.hamburger}
        aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span
          className={
            styles["material-symbols"] + " " + styles.hamburgerIcon + (menuOpen ? " " + styles.open : "")
          }
        >
          {menuOpen ? "close" : "menu"}
        </span>
      </button>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
} 