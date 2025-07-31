import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/UI/HamburgerMenu.module.css";

interface HamburgerMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const sections = [
  { id: "slide", label: "着物コレクション" },
  { id: "about", label: "私について" },
  { id: "service", label: "サービス内容" },
  { id: "contact", label: "お問い合わせ" },
  // 必要に応じて追加
];

export default function HamburgerMenu({ menuOpen, setMenuOpen }: HamburgerMenuProps) {
  // スクロール＋メニュー閉じ
  const handleSectionClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 400); // メニュー閉じアニメーションと同じduration
  };

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
      
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.menu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <ul className={styles.sectionList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={handleSectionClick(section.id)}>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
} 