# 着付けサービス

このプロジェクトは、着付けサービスの個人サイトです。
Next.jsをベースに、和の雰囲気を持つGoogle Fonts「Shippori Mincho B1」を全体に適用し、
スマートフォンにも最適化されたレスポンシブデザイン、ダーク/ライトテーマ切り替え、
FontAwesomeによるアイコン表示、セクションごとのカスタマイズ性を重視しています。

## 主な特徴
- Next.js（TypeScript）
- Google Fonts「Shippori Mincho B1」デフォルト適用
- スマホ・PC両対応のレスポンシブデザイン
- ダーク/ライトテーマ切り替え（右上トグル）
- FontAwesomeアイコン（テーマ切り替え・ハンバーガーメニュー）
- セクションごとに独自CSSでカスタマイズ可能
- テキストやリスト内容は各ファイルで自由に編集可能

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## カスタマイズ方法
- フォントを変更したい場合は `src/pages/_document.tsx` のGoogle Fonts `<link>` を編集
- セクションの内容やデザインは `src/components/sections/` 配下の各ファイル・CSSで編集
- テーマ切り替えやアイコンは `src/components/ThemeToggle.tsx` で制御

## デプロイ
VercelなどのNext.js対応ホスティングでそのままデプロイ可能です。

---

Next.jsの詳細は[公式ドキュメント](https://nextjs.org/docs)をご覧ください。
