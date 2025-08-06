import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import styles from "@/styles/UI/PageLoadingScreen.module.css";
import { PageLoadingScreenProps } from "@/types";

export default function PageLoadingScreen({ isLoading, resourcesLoaded = false }: PageLoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.loadingContent}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <LoadingSpinner 
                message={resourcesLoaded ? "Welcome..." : "Now Loading..."} 
                size="large"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}