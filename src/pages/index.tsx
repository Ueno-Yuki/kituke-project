import { useState } from "react";
import Head from "next/head";
import { SEO_METADATA, OGP_METADATA, STRUCTURED_DATA } from "@/constants/metadata";
import { URLS } from "@/constants/urls";
import { motion, AnimatePresence } from "framer-motion";
import MainVisual from "@/components/sections/MainVisual";
import Slide from "@/components/sections/Slide";
import About from "@/components/sections/About";
import Service from "@/components/sections/Service";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import HamburgerMenu from "@/components/UI/HamburgerMenu";
import BackToTop from "@/components/UI/BackToTop";
import ScrollAnimation from "@/components/UI/ScrollAnimation";
import PageLoadingScreen from "@/components/UI/PageLoadingScreen";
import { usePageLoading } from "@/hooks/usePageLoading";

export default function Home() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { isLoading, resourcesLoaded } = usePageLoading();
  
  return (
    <>
      <Head>
        <title>{SEO_METADATA.title}</title>
        <meta name="description" content={SEO_METADATA.description} />
        <meta name="keywords" content={SEO_METADATA.keywords} />
        <meta name="viewport" content={SEO_METADATA.viewport} />
        <meta name="robots" content={SEO_METADATA.robots} />
        <link rel="sitemap" type="application/xml" href={URLS.SITEMAP} />
        <meta name="author" content={SEO_METADATA.author} />
        <meta name="language" content={SEO_METADATA.language} />
        <meta http-equiv="content-language" content={SEO_METADATA.language} />
        <link rel="canonical" href={URLS.CANONICAL} />
        <link rel="icon" href={URLS.FAVICON} />
        
        {/* OGP設定 */}
        <meta property="og:type" content={OGP_METADATA.type} />
        <meta property="og:title" content={OGP_METADATA.title} />
        <meta property="og:description" content={OGP_METADATA.description} />
        <meta property="og:url" content={URLS.CANONICAL} />
        <meta property="og:site_name" content={OGP_METADATA.siteName} />
        <meta property="og:locale" content={OGP_METADATA.locale} />
        
        {/* SNSリンク設定 */}
        <meta name="instagram:url" content={URLS.INSTAGRAM} />
        <meta name="contact:instagram" content={URLS.INSTAGRAM} />
        
        {/* OGPでInstagramにも対応 */}
        <meta property="og:see_also" content={URLS.INSTAGRAM} />
        
        {/* 構造化データ (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA)
          }}
        />
      </Head>
      
      {/* ページローディングスクリーン */}
      <PageLoadingScreen isLoading={isLoading} resourcesLoaded={resourcesLoaded} />
      
      {/* メインコンテンツ - ローディング完了後にフェードイン表示 */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          >
            <ScrollAnimation />
            <nav role="navigation" aria-label="メインメニュー">
              <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </nav>
            <aside role="complementary" aria-label="ページ内ナビゲーション">
              <BackToTop menuOpen={menuOpen} />
            </aside>
            <main role="main">
              <MainVisual />
              <Slide />
              <About />
              <Service />
              <Contact />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
