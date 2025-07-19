import { useContext } from "react";
import { ThemeContext } from "@/pages/_app";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/HamburgerMenu.module.css";

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  { id: "about", label: "私について" },
  { id: "service", label: "サービス内容" },
  // 必要に応じて追加
];

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const { theme } = useContext(ThemeContext);
  // テーマ反転
  const menuTheme = theme === "dark" ? "light" : "dark";

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className={styles.menu + " " + styles[menuTheme]}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
        >
          <ul className={styles.sectionList}>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} onClick={onClose}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
} 