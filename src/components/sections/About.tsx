import Section from "../Section/Section";
import styles from "../../styles/About.module.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <Section>
      <div className={styles.aboutRow}>
        <h2 ref={titleRef} className={styles.aboutTitle}>私について</h2>
        <div ref={textRef} className={styles.aboutText}>
          千葉県在住着付師です。
          もっと着物を日常に！着物は大変。苦しい。高い。そんな色々を吹き飛ばしもっと気楽に着ていただきたい。着る楽しさ。着せる喜び。着物の装いをお手伝いできる喜びをモットーに地域密着で活動させていただいてます。
          <div style={{ marginTop: "0.8rem" }}>
            <a
              href="https://instagram.com/p/Ct0pKJ1vlwA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ display: "inline-block", color: "#E4405F", fontSize: "2rem" }}
            >
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "2.2rem", verticalAlign: "middle" }} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
} 