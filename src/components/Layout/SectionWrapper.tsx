import { ReactNode } from "react";
import styles from "../../styles/SectionWrappper/SectionWrapper.module.css";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * ページセクションのラッパーコンポーネント
 * HTMLのsection要素に共通スタイルとpropsを提供
 */
export default function SectionWrapper({ children, className = "", style, id }: SectionWrapperProps) {
  return (
    <section
      className={`${styles.sectionWrapper} ${className}`}
      style={style}
      id={id}
    >
      {children}
    </section>
  );
}