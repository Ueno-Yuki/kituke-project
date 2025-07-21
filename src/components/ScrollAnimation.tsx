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
                    height: 10,
                    originX: 0,
                    backgroundColor: "#ff0088",
                    zIndex: 9999
                }}
            />
        </>
    )
}