// コンテンツ関連の定数定義

/** セクションタイトル */
export const SECTION_TITLES = {
  MAIN_VISUAL: "着物コレクション",
  ABOUT: "私について", 
  SERVICE: "サービス内容",
  CONTACT: "お問い合わせ",
} as const;

/** サービス一覧 */
export const SERVICES = [
  { id: "seijinshiki", name: "成人式", description: "成人式の振袖着付けサービス" },
  { id: "sotsugyoushiki", name: "卒業式", description: "卒業式の袴着付けサービス" },
  { id: "shichigosan", name: "七五三", description: "七五三の着物着付けサービス" },
  { id: "yukata", name: "浴衣", description: "浴衣の着付けサービス" },
  { id: "hurisode", name: "振袖", description: "振袖の着付けサービス" },
  { id: "tomesode", name: "留袖", description: "留袖の着付けサービス" },
  { id: "omiyamairi", name: "お宮参り", description: "お宮参りの着物着付けサービス" },
  { id: "houmon", name: "出張/訪問", description: "お客様のご自宅への出張着付けサービス" },
] as const;

/** FAQ データ */
export const FAQ_DATA = [
  {
    question: "Q. 婚礼ロケーション撮影はヘアメイクや撮影も含まれますか？",
    answer: "A. 着付けのみ承っております。ヘアメイクやカメラマンの手配はお客様でお願いいたします。"
  },
  {
    question: "Q. ヘアセットやメイクをしてから着付けをお願いしてもいいですか？", 
    answer: "A. 問題ありません。当方からヘアセットやメイクの手配を行うことも可能です。"
  },
  {
    question: "Q. 早朝や夜間の着付けも可能ですか？",
    answer: "A. はい、対応可能です。成人式や卒業式などの早朝着付けもお任せください。"
  },
  {
    question: "Q. 何日前までに予約が必要ですか？",
    answer: "A. できるだけ早めのご予約をお勧めしますが、お急ぎの場合もお気軽にご相談ください。"
  },
  {
    question: "Q. レンタル衣装はどのくらいの種類がありますか？",
    answer: "A. 数が少ないためお任せになります。"
  }
] as const;

/** 事業者情報 */
export const BUSINESS_INFO = {
  name: "着付け師境",
  alternateName: "きつけしさかい",
  description: "千葉・君津市・木更津市の着付け師境。成人式・七五三・卒業式・振袖・留袖など出張着付けサービス。経験豊富なプロが訪問してお客様のご希望に合わせた美しい着物姿を実現します。",
  shortDescription: "千葉・君津市・木更津市の出張着付けサービス",
  serviceArea: "千葉県君津市・木更津市を中心とした周辺地域",
  openingHours: "9:00〜18:00（年中無休）",
  foundingDate: "2020",
  slogan: "美しい着物姿を実現する出張着付けサービス",
  paymentAccepted: ["現金", "銀行振込"],
  currenciesAccepted: "JPY",
  priceRange: "$$",
  telephone: "+81-XX-XXXX-XXXX",
  email: "info@kituke-sakai.com"
} as const;

/** 地理的情報 */
export const GEO_INFO = {
  latitude: 35.3315,
  longitude: 139.9023,
  radius: "30000", // 30km
  address: {
    locality: "君津市",
    region: "千葉県", 
    country: "JP"
  }
} as const;

/** About セクションのテキスト */
export const ABOUT_TEXT = {
  experience_1: "千葉県君津市在住の着付け師です。",
  experience_2: "もっと着物を日常に！着物は大変。苦しい。高い。",
  experience_3: "そんな色々を吹き飛ばしもっと気楽に着ていただきたい。",
  experience_4: "着る楽しさ。着せる喜び。",
  experience_5: "着物の装いをお手伝いできる喜びをモットーに地域密着で活動させていただいてます。",
} as const;

/** ポリシー関連 */
export const POLICIES = {
  SITE_POLICY: {
    title: "サイトポリシー",
    content: `
<h3>1. 当サイトについて</h3>
<p>当サイトは、着付け師境が運営する着付けサービスの公式ウェブサイトです。</p>

<h3>2. 免責事項</h3>
<p>当サイトに掲載している情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。</p>

<h3>3. 著作権</h3>
<p>当サイトのコンテンツ（文章、画像、デザインなど）の著作権は境祐岐江に帰属します。無断転載・複製を禁止します。</p>

<h3>4. リンクについて</h3>
<p>当サイトへのリンクは原則として自由ですが、事前にご連絡いただけますと幸いです。</p>

<h3>5. サイトポリシーの変更</h3>
<p>当サイトポリシーは予告なく変更する場合があります。</p>
    `
  },
  PRIVACY_POLICY: {
    title: "プライバシーポリシー",
    content: `
<h3>1. 個人情報の収集について</h3>
<p>当サイトでは、お客様からのお問い合わせやご予約の際に、必要最小限の個人情報をお伺いする場合があります。</p>

<h3>2. 個人情報の利用目的</h3>
<p>収集した個人情報は、以下の目的で利用いたします：</p>
<ul>
<li>サービスの提供・運営のため</li>
<li>お客様からのお問い合わせへの対応のため</li>
<li>サービス向上のための分析のため</li>
</ul>

<h3>3. 個人情報の第三者提供</h3>
<p>お客様の同意なく個人情報を第三者に提供することはありません。ただし、法令に基づく場合を除きます。</p>

<h3>4. 個人情報の保護</h3>
<p>個人情報の漏洩、滅失、毀損等を防ぐため、適切な安全管理措置を講じます。</p>

<h3>5. お問い合わせ</h3>
<p>個人情報の取り扱いに関するお問い合わせは、Instagramのダイレクトメッセージにてお願いします。</p>

<h3>6. プライバシーポリシーの変更</h3>
<p>本プライバシーポリシーは予告なく変更する場合があります。</p>
    `
  }
} as const;