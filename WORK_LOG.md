# Im Karton Website - 作業ログ

最終更新: 2026-02-24

## プロジェクト概要

- **サイト**: Im Karton コーポレートサイト
- **技術**: Astro 5 + React 18 + Tailwind CSS 4（Storeplate ボイラープレート）
- **パッケージマネージャ**: yarn（Classic 1.22.22 / Volta管理）
- **デプロイ先**: Netlify

## Im Karton について

海外アナログゲームイベントを訪ねて旅する3人組。
主な活動:
- 海外アナログゲームイベント旅行ガイドブックの制作・販売
- メディアへのイベントレポート寄稿
- 国内アナログゲームイベントへの出展

SNS:
- X (Twitter): https://x.com/im_karton
- Instagram: https://www.instagram.com/im.karton/

---

## 完了済みタスク

### Task 1: 書籍ガイドページの完成
**ファイル**: `src/pages/activities/travel-guide.astro`
- 既存2冊（Essen Spiel 2023、Gen Con）に加え、2冊追加（Essen Plus One、FIJ Cannes）
- 全4冊にアンカーID付与（`#essen-spiel-2023`, `#gen-con`, `#essen-spiel-2023-plus-one`, `#fij-cannes`）
- ヒーロースライダーからの深リンク対応
- 末尾のお問い合わせリンクブロック削除

### Task 2: トップページコンテンツの整備
**ファイル**: `src/config/config.json`, `src/pages/index.astro`, `src/layouts/functional-components/HeroSlider.tsx`

#### config.json の変更:
- `company.tagline`: 「今すぐやろう！エッセン準備」
- `company.lead`: Im Kartonの活動紹介文に書き換え
- `company.stats`: 空配列に（DX系stats削除）
- `company.primary_cta`: label/link を空に（ヘッダーの「お問い合わせ」ボタン非表示化）
- `settings.theme_switcher`: false（ダークモード切替ボタン非表示化）
- ヒーロースライド3枚を設定:
  - スライド1: Essen Spiel Guidebook 2023 → `/activities/travel-guide#essen-spiel-2023`
  - スライド2: 【新刊】FIJ Cannes Guidebook → `/activities/travel-guide#fij-cannes`
  - スライド3: note『月刊Im Karton』 → 準備中（リンクなし・無効ボタン表示）

#### HeroSlider.tsx の変更:
- Swiper Autoplay モジュール追加（5秒間隔、loop有効）
- 空リンクの場合はdisabled風のspanを表示する分岐追加

#### index.astro の変更:
- `aboutUsContent` を Im Karton の紹介文に書き換え:
  - intro: 「海外アナログゲームイベントを訪ねて旅する3人組。」
  - paragraphs: イム・カートンの読み方、訪問イベント、刊行実績

### Task 3: About ページ → 非表示化
- `src/content/about/-index.md`: `draft: true` に変更
- `src/config/menu.json`: main から About 削除
- `src/content/team/*.md`: 3名すべて `draft: true` に変更

### Task 4: Contact ページ → 非表示化
- `src/content/contact/-index.md`: `draft: true` に変更
- `src/config/menu.json`: main / footer から Contact 削除
- `src/pages/contact.astro`: フォームを日本語化済み（復活時にそのまま使える）
  - お名前（ペンネーム等も可）/ メールアドレス / お問い合わせ内容 / 送信する
- `src/pages/activities/reporting.astro`: お問い合わせリンクブロック削除
- `src/pages/activities/events.astro`: お問い合わせリンクブロック削除
- `src/pages/activities/travel-guide.astro`: お問い合わせリンクブロック削除

### Task 5: SNS/外部リンク設定
**ファイル**: `src/config/social.json`
- Facebook / GitHub / LinkedIn 削除
- X (Twitter): `https://x.com/im_karton`
- Instagram: `https://www.instagram.com/im.karton/`

### Task 6: Works (Case Studies) → 非表示化
- `src/content/case-studies/*.md`: 2件とも `draft: true`
- `src/config/menu.json`: main から Works 削除

### News → 非表示化
- `src/content/news/*.md`: 3件とも `draft: true`
- `src/config/menu.json`: main / footer から News 削除

### ナビゲーションメニュー整理
- `src/config/menu.json`: main を空配列に（ロゴのみのヘッダー）
- footer も空配列に
- footerCopyright のみ残存（Privacy & Policy / Terms of Service）

### Task 7: SEO/メタデータ
**ファイル**: `src/config/config.json`
- `meta_description`: Im Kartonの活動に合わせた説明文に更新
- 全ファイルで「IM Karton」→「Im Karton」に統一（正式名称）
  - config.json: site.title, logo_text, copyright, meta_author
  - index.astro: alt属性
  - news/index.astro: description

### shiki エラー修正（セッション1で対応済み）
- node_modules と package-lock.json を削除
- Volta で yarn@1.22.22 をインストール（Yarn 4ではなくClassic）
- `yarn install` で依存関係を再インストール

---

## 残タスク（未着手）

### 1. 書籍ガイドページの内容修正
- `src/pages/activities/travel-guide.astro` の記載内容にユーザーから修正指示が入る予定
- 全タスク完了後に対応

### 2. 画像差し替え
以下をまとめて対応:
- **ヒーロースライダー背景画像**: 現在3枚とも `/images/IMG_6265.jpeg`（モナコ港の写真）
  - config.json の `hero_slides[].image.src` を変更
- **favicon**: `/images/favicon.png`（テンプレート画像の可能性）
  - config.json の `site.favicon` を変更
- **og-image**: `/images/og-image.png`（テンプレート画像の可能性）
  - config.json の `metadata.meta_image` を変更

### 3. base_url の変更
- `src/config/config.json` の `site.base_url` を実際のドメインに変更
- 現在値: `https://www.im-karton.jp/`

### 4. GTM（Google Tag Manager）設定
- `src/config/config.json` の `google_tag_manager`
- 現在: `enable: false`, `gtm_id: "GTM-XXXXXX"`
- GTM IDを取得後に `enable: true` + 正しいIDを設定

### 5. meta_description 最終確認
- 公開前に説明文のレビュー
- 現在値: 「海外アナログゲームイベントを訪ねて旅する3人組、Im Karton。SPIEL Essen・Gen Con・FIJなどの旅行ガイドブックを制作しています。」

### 6. プロダクションデプロイ/検証
- 上記すべて完了後に実施
- `yarn build` でビルド確認
- Netlify へデプロイ

---

## 現在のサイト構成

### 有効なページ
- `/` - トップページ（ヒーロースライダー + Activities + Events + About Us）
- `/activities/travel-guide` - 旅行ガイドブック一覧（4冊）
- `/activities/reporting` - レポート記事寄稿（仮ページ・B2B調テキスト残存）
- `/activities/events` - イベント開催（仮ページ・B2B調テキスト残存）

### 非表示のページ（draft: true / メニュー削除済み）
- `/about` - About ページ
- `/contact` - お問い合わせページ
- `/works` - Works 一覧
- `/news` - News 一覧
- 各コンテンツ記事（case-studies 2件、news 3件）

### 設定ファイルの現在状態
- `menu.json`: main=[], footer=[], footerCopyright=2件
- `social.json`: X + Instagram
- `config.json`: theme_switcher=false, primary_cta=空

---

## 技術メモ

- パッケージマネージャは **yarn Classic (1.22.22)** を使用。npm や Yarn Berry (4.x) は不可
- Volta で Node.js / yarn のバージョン管理
- worktree (`.claude/worktrees/eager-diffie/`) と main project (`C:\Users\hello\Desktop\im_karton_website\`) は別物。編集は main project 側に行うこと
- HeroSlider は React コンポーネント（Swiper.js）で `client:load` hydration
- コンテンツの非表示は `draft: true` で制御（ファイル削除ではない）
- DynamicIcon は react-icons/fa6 を使用（例: FaXTwitter, FaInstagram）
