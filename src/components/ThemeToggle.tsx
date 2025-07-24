import styles from "../styles/ThemeToggle.module.css";
import HamburgerMenu from "./HamburgerMenu";

interface HamburgerMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function HamburgerMenuButton({ menuOpen, setMenuOpen }: HamburgerMenuProps) {
  return (
    <>
      <button
        className={styles.hamburger}
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