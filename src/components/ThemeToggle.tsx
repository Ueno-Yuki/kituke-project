import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/pages/_app";
import styles from "../styles/ThemeToggle.module.css";
import animationStyles from "../styles/Animation.module.css";
import HamburgerMenu from "./HamburgerMenu";

interface ThemeToggleProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function ThemeToggle({ menuOpen, setMenuOpen }: ThemeToggleProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className={styles.toggle + " " + animationStyles.themeTransition}
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
        className={styles.hamburger + " " + animationStyles.themeTransition}
        aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setMenuOpen(!menuOpen)}
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