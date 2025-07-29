import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import MainVisual from "@/components/sections/MainVisual";
import Slide from "@/components/sections/Slide";
import About from "@/components/sections/About";
import Service from "@/components/sections/Service";
import HamburgerMenu from "@/components/UI/HamburgerMenu";
import BackToTop from "@/components/UI/BackToTop";
import ScrollAnimation from "@/components/UI/ScrollAnimation";
import PageLoadingScreen from "@/components/UI/PageLoadingScreen";
import { usePageLoading } from "@/hooks/usePageLoading";

export default function Home() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { isLoading } = usePageLoading();
  
  return (
    <>
      <Head>
        <title>着付け師堺 | 千葉・君津市・木更津市の出張着付けサービス - 成人式・七五三・卒業式</title>
        <meta name="description" content="千葉・君津市・木更津市の着付け師堺。成人式・七五三・卒業式・振袖・留袖など出張着付けサービス。経験豊富なプロが訪問してお客様のご希望に合わせた美しい着物姿を実現します。料金相談・予約受付中。" />
        <meta name="keywords" content="着付け,君津市,木更津市,千葉,出張着付け,成人式,七五三,卒業式,振袖,留袖,浴衣,訪問着付け,着物,着付け師堺" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="author" content="着付け師堺" />
        <meta name="language" content="ja" />
        <meta http-equiv="content-language" content="ja" />
        <link rel="canonical" href="https://kituke-sakai.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OGP設定 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="着付け師堺 | 千葉・君津市・木更津市の出張着付けサービス" />
        <meta property="og:description" content="千葉・君津市・木更津市の着付け師堺。成人式・七五三・卒業式など出張着付けサービス。経験豊富なプロが美しい着物姿を実現します。" />
        <meta property="og:url" content="https://kituke-sakai.vercel.app/" />
        <meta property="og:site_name" content="着付け師堺" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="着付け師堺 | 千葉・君津市・木更津市の出張着付けサービス" />
        <meta name="twitter:description" content="千葉・君津市・木更津市の着付け師堺。成人式・七五三・卒業式など出張着付けサービス。" />
        
        {/* 構造化データ (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://kituke-sakai.vercel.app/#business",
              "name": "着付け師堺",
              "alternateName": "きつけしさかい",
              "description": "千葉・君津市・木更津市の着付け師堺。成人式・七五三・卒業式・振袖・留袖など出張着付けサービス。経験豊富なプロが訪問してお客様のご希望に合わせた美しい着物姿を実現します。",
              "url": "https://kituke-sakai.vercel.app/",
              "telephone": "+81-XX-XXXX-XXXX",
              "email": "info@kituke-sakai.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "君津市",
                "addressRegion": "千葉県",
                "addressCountry": "JP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 35.3315,
                "longitude": 139.9023
              },
              "areaServed": [
                {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 35.3315,
                    "longitude": 139.9023
                  },
                  "geoRadius": "30000"
                }
              ],
              "hasOfferingCatalog": {
                "@type": "OfferingCatalog",
                "name": "着付けサービス",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "成人式着付け",
                      "description": "成人式の振袖着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "七五三着付け",
                      "description": "七五三の着物着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "卒業式着付け",
                      "description": "卒業式の袴着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "振袖着付け",
                      "description": "振袖の着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "留袖着付け",
                      "description": "留袖の着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "浴衣着付け",
                      "description": "浴衣の着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "お宮参り着付け",
                      "description": "お宮参りの着物着付けサービス",
                      "serviceType": "着付け"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "出張着付け",
                      "description": "お客様のご自宅への出張着付けサービス",
                      "serviceType": "着付け"
                    }
                  }
                ]
              },
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 35.3315,
                  "longitude": 139.9023
                },
                "geoRadius": "30000"
              },
              "openingHours": "Mo-Su 09:00-18:00",
              "paymentAccepted": ["現金", "銀行振込"],
              "currenciesAccepted": "JPY",
              "founder": {
                "@type": "Person",
                "name": "着付け師堺"
              },
              "foundingDate": "2020",
              "slogan": "美しい着物姿を実現する出張着付けサービス"
            })
          }}
        />
      </Head>
      
      {/* ページローディングスクリーン */}
      <PageLoadingScreen isLoading={isLoading} />
      
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
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
