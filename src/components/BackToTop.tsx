import { useEffect, useState } from "react";

export default function BackToTop({ menuOpen }: { menuOpen: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || menuOpen) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 9999,
        background: "#fff",
        color: "#b48a78",
        border: "1.5px solid #b48a78",
        borderRadius: "50%",
        width: 48,
        height: 48,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      aria-label="トップへ戻る"
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontFamily: "Material Symbols Outlined",
          fontSize: 28,
          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >
        arrow_upward
      </span>
    </button>
  );
} 