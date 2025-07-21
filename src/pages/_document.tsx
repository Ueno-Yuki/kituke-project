import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
            href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@500;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
            rel="stylesheet"
        />
      </Head>
      <body className="themeTransition">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
