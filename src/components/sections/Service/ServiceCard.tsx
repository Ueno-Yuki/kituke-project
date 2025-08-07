import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from '@/styles/Service/Service.module.css';
import animationStyles from '@/styles/Common/Animation.module.css';
import { ServiceCardProps, ServiceDetail } from '@/types';

export default function ServiceCard({ service, isAnimating, className = '' }: ServiceCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    if (isAnimating) {
      setShowDetails(!showDetails);
    }
  };

  // カード表示用のバリアント
  const cardVariants = {
    default: {
      scale: 1,
      transition: { duration: 0.3 }
    },
    clicked: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  // 詳細表示用のバリアント  
  const detailVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      className={`${styles.serviceCard} ${styles[service.id]} ${className} ${
        isAnimating ? styles.animating : ''
      } ${showDetails ? styles.detailsActive : ''}`}
      onClick={handleCardClick}
      variants={cardVariants}
      animate={showDetails && isAnimating ? 'clicked' : 'default'}
      whileHover={isAnimating ? { scale: 1 } : {}}
      style={{ 
        cursor: isAnimating ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      {/* 背景とオーバーレイ（既存のスタイル） */}
      <div className={styles.cardOverlay}>
        <AnimatePresence mode="wait">
          {!showDetails ? (
            // 基本表示：サービス名のみ
            <motion.h3
              key="title"
              className={styles.serviceTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {service.name}
            </motion.h3>
          ) : (
            // 詳細表示：料金・オプション情報
            <motion.div
              key="details"
              className={styles.serviceDetails}
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.detailsHeader}>
                <h3 className={styles.detailsTitle}>{service.name}</h3>
                <p className={styles.detailsDescription}>{service.description}</p>
              </div>

              <div className={styles.detailsContent}>
                <div className={styles.pricingSection}>
                  <h4 className={styles.sectionTitle}>料金</h4>
                  <p className={styles.basePrice}>基本料金: {service.pricing.base}</p>
                  {service.pricing.travel && (
                    <p className={styles.travelPrice}>出張費: {service.pricing.travel}</p>
                  )}
                  
                  {service.pricing.options && (
                    <div className={styles.optionsSection}>
                      <h5 className={styles.optionsTitle}>オプション</h5>
                      <ul className={styles.optionsList}>
                        {service.pricing.options.map((option, index) => (
                          <li key={index} className={styles.optionItem}>
                            <span>{option.name}</span>
                            <span>{option.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.durationInfo}>
                    <h4 className={styles.sectionTitle}>所要時間</h4>
                    <p>{service.duration}</p>
                  </div>

                  <div className={styles.includedInfo}>
                    <h4 className={styles.sectionTitle}>含まれるサービス</h4>
                    <ul className={styles.includedList}>
                      {service.included.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {service.notes && (
                    <div className={styles.notesInfo}>
                      <h4 className={styles.sectionTitle}>備考</h4>
                      <ul className={styles.notesList}>
                        {service.notes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.clickHint}>
                <span>クリックで戻る</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}