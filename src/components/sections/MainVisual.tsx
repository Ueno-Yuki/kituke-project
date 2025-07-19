import Section from "../Section/Section";
import styles from "../../styles/MainVisual.module.css";

export default function MainVisual() {
  return (
    <Section className={styles.mainVisual} style={{ padding: 0 }}>
      <div className={styles.centerContent}>
        <h1 className={styles.title}>着付けサービス Sakai</h1>
        <p className={styles.subtitle}>美しい着付けで特別な日を彩ります</p>
      </div>
    </Section>
  );
} 