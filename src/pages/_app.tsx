import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";

// テーマ用コンテキスト
export const ThemeContext = createContext({
  theme: "light",
  setTheme: (_: string) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let applied = theme;
    if (theme === "system") {
      applied = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.body.setAttribute("data-theme", applied);
  }, [theme]);

  // スクロール位置の保存・復元
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);

    // 復元は画像やDOMの高さが確定してから行う
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollY, 10));
      }, 10); // 10ms遅延で復元
    }

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
