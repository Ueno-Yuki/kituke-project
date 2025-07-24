import { useState } from "react";
import Head from "next/head";
import MainVisual from "@/components/sections/MainVisual";
import Slide from "@/components/sections/Slide";
import About from "@/components/sections/About";
import Service from "@/components/sections/Service";
import HamburgerMenu from "@/components/HamburgerMenu";
import BackToTop from "@/components/BackToTop";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  return (
    <>
      <Head>
        <title>着付けサービス</title>
        <meta name="description" content="着付け師堺の公式サイト。訪問着付け、成人式、七五三など各種着付けサービスを提供。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollAnimation />
      <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <MainVisual />
        <Slide />
        <About />
        <Service />
      </main>
      <BackToTop menuOpen={menuOpen} />
    </>
  );
}
