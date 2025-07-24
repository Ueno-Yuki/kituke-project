"use client"

import { motion, useScroll } from "framer-motion";

export default function ScrollLinked() {

    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "100vw",
                    height: 8,
                    originX: 0,
                    background: "linear-gradient(90deg, rgba(116, 92, 78, 0.8) 0%, rgba(200, 168, 130, 0.9) 50%, rgba(122, 92, 62, 0.8) 100%)",
                    boxShadow: "0 2px 8px rgba(116, 92, 78, 0.3)",
                    zIndex: 9999,
                    backdropFilter: "blur(2px)"
                }}
                animate={{
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </>
    )
}