import { ReactNode } from "react";
import { useRef } from "react";
import styles from "../../styles/Section.module.css";

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Section({ children, className = "", style }: SectionProps) {
  const ref = useRef(null);


  return (
    <section
      ref={ref}
      className={`${styles.section} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
} 