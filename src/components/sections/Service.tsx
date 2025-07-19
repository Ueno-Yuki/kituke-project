import Section from "../Section/Section";
import styles from "../../styles/Service.module.css";
import { useRef } from "react";

export default function Service() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  return (
    <Section>
      <div className={styles.serviceRow}>
        <h2 ref={titleRef} className={styles.serviceTitle}>サービス内容</h2>
        <div ref={textBlockRef} className={styles.serviceList} style={{ width: "100%" }}>
          <ol className={styles.serviceList}>
            <li>成人式</li>
            <li>卒業式</li>
            <li>七五三</li>
            <li>浴衣</li>
            <li>振袖</li>
            <li>留袖</li>
            <li>お宮参り</li>
            <li>出張/訪問</li>
          </ol>
          <div className={styles.serviceText}>
            その他ご要望ありましたらご依頼、お問合せお気軽にご連絡下さい！
          </div>
        </div>
      </div>
    </Section>
  );
} 