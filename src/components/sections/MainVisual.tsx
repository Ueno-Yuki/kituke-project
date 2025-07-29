import SectionWrapper from "../Layout/SectionWrapper";
import styles from "../../styles/MainVisual.module.css";
import { useMainVisualAnimation } from "./MainVisual/hooks/useMainVisualAnimation";
import DesktopMainVisual from "./MainVisual/DesktopMainVisual";
import MobileMainVisual from "./MainVisual/MobileMainVisual";

export default function MainVisual() {
  const {
    titleAnimationComplete,
    titleText,
    isMobile
  } = useMainVisualAnimation();

  const renderMainVisual = () => {
    if (isMobile) {
      return (
        <MobileMainVisual
          titleText={titleText}
          titleAnimationComplete={titleAnimationComplete}
        />
      );
    } else {
      return (
        <DesktopMainVisual
          titleText={titleText}
          titleAnimationComplete={titleAnimationComplete}
        />
      );
    }
  };

  return (
    <SectionWrapper className={styles.mainVisual}>
      {renderMainVisual()}
    </SectionWrapper>
  );
}