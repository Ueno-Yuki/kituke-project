import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
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
    <Component {...pageProps} />
  );
}
