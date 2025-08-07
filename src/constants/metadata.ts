// メタデータ関連の定数定義
import { BUSINESS_INFO, GEO_INFO, SERVICES } from './content';
import { URLS } from './urls';

/** SEO メタデータ */
export const SEO_METADATA = {
  title: "着付け師 | 東京都・渋谷区の出張着付けサービス - 成人式・七五三・卒業式",
  description: "東京都・渋谷区の着付け師境。成人式・七五三・卒業式・振袖・留袖など出張着付けサービス。経験豊富なプロが訪問してお客様のご希望に合わせた美しい着物姿を実現します。料金相談・予約受付中。",
  keywords: "着付け,渋谷区,新宿区,東京,出張着付け,成人式,七五三,卒業式,振袖,留袖,浴衣,訪問着付け,着物,着付け師",
  author: "着付け師境",
  language: "ja",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1"
} as const;

/** OGP メタデータ */
export const OGP_METADATA = {
  type: "website",
  title: "着付け師境 | 東京都・渋谷区の出張着付けサービス",
  description: "東京都・渋谷区の着付け師。成人式・七五三・卒業式など出張着付けサービス。経験豊富なプロが美しい着物姿を実現します。",
  siteName: "着付け師",
  locale: "ja_JP"
} as const;

/** 構造化データ (JSON-LD) */
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${URLS.CANONICAL}#business`,
  name: BUSINESS_INFO.name,
  alternateName: BUSINESS_INFO.alternateName,
  description: BUSINESS_INFO.description,
  url: URLS.CANONICAL,
  telephone: BUSINESS_INFO.telephone,
  email: BUSINESS_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: GEO_INFO.address.locality,
    addressRegion: GEO_INFO.address.region,
    addressCountry: GEO_INFO.address.country
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO_INFO.latitude,
    longitude: GEO_INFO.longitude
  },
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: GEO_INFO.latitude,
        longitude: GEO_INFO.longitude
      },
      geoRadius: GEO_INFO.radius
    }
  ],
  hasOfferingCatalog: {
    "@type": "OfferingCatalog",
    name: "着付けサービス",
    itemListElement: SERVICES.map(service => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${service.name}着付け`,
        description: service.description,
        serviceType: "着付け"
      }
    }))
  },
  priceRange: BUSINESS_INFO.priceRange,
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: GEO_INFO.latitude,
      longitude: GEO_INFO.longitude
    },
    geoRadius: GEO_INFO.radius
  },
  openingHours: "Mo-Su 09:00-18:00",
  paymentAccepted: BUSINESS_INFO.paymentAccepted,
  currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
  founder: {
    "@type": "Person",
    name: BUSINESS_INFO.name
  },
  foundingDate: BUSINESS_INFO.foundingDate,
  slogan: BUSINESS_INFO.slogan,
  sameAs: [URLS.INSTAGRAM]
} as const;