# 残タスク一覧（2026-03-14更新）

## インフラ・デプロイ関連

| # | タスク | 状況 | 備考 |
|---|--------|------|------|
| 1 | 独自ドメイン `www.imkarton.net` 設定 | 未着手 | Cloudflareダッシュボードでの操作 |
| 2 | GTM ID の設定 | 未着手 | `src/config/config.json` の `google_tag_manager_id`。現在 `GTM-XXXXXX` |

## コンテンツ関連

| # | タスク | 状況 | 対象ファイル・備考 |
|---|--------|------|-------------------|
| 3 | トップページ画像・テキスト最終化 | 未着手 | スライダー画像の個別化（現在3スライドで同じ画像を使い回し）、統計数値確認、About文言確認。対象: `src/config/config.json`, `src/pages/index.astro` |
| 4 | About/Contactページの再構築判断 | 要検討 | ページは削除済み（参照先コンテンツが空のため）。必要なら実コンテンツで再作成。`src/content/about/`, `src/content/contact/` も空 |
| 5 | SNS・外部リンクの設定 | 未着手 | `src/config/social.json` がプレースホルダー `#` のまま |
| 6 | Works（実績）コンテンツ | 未着手 | `src/content/case-studies/` が空 |
| 7 | 書籍ガイドページの記載内容修正 | 未着手 | 仮コンテンツの説明文修正。対象: `src/pages/activities/travel-guide.astro` |

## SEO・メタデータ

| # | タスク | 状況 | 対象ファイル |
|---|--------|------|-------------|
| 8 | OGP画像の差し替え | 未着手 | `public/images/og-image.jpg`（現在プレースホルダー） |
| 9 | ファビコンの差し替え | 未着手 | `public/images/favicon.jpg`（現在2334×2334の仮画像） |
| 10 | 各ページの meta_title / description 確認 | 未着手 | 各MDファイルのフロントマター |

---

## 完了済み

- Cloudflare Pages デプロイ
- Cloudflare Access（プレビューサイト限定公開）
- 画像最適化自動化（`scripts/optimizeImages.js`）
- 静的サイト化（`output: "static"`、adapter不要化）
- `about.astro` / `contact.astro` 削除
- `@astrojs/cloudflare`, `@astrojs/node` パッケージ削除
- Activitiesカード画像差し替え（3枚、1200×900）
- 書籍ガイドページ完成（4冊掲載）
- Merge conflict修正

## 作業履歴

### セッション3（2026-03-14）
- **画像最適化自動化**: `scripts/optimizeImages.js` 新規作成。ビルド時に `public/images/` を自動リサイズ・圧縮（31.5MB → 2.3MB、93%削減）。sharp読み込み失敗時は自動インストール or スキップ。
- **静的サイト化**: `output: "server"` → `"static"` に変更。adapter削除、動的ルートに `getStaticPaths()` 追加、`Astro.redirect` 削除、`wrangler.toml` から `nodejs_compat` 削除。Workers不要化でランタイムエラーを根本解消。

### セッション2（2026-03-06〜07）
- **Cloudflare Pages移行**: Netlify → Cloudflare Pages。adapter変更、`wrangler.toml` 作成、`netlify.toml` 削除。sharp問題は `imageService: "passthrough"` で回避（セッション3で最適化スクリプトに置換）。
- **Cloudflare Access設定**: Zero Trust → Access Controls で preview サイト限定公開。
- **不要ページ削除**: `about.astro`, `contact.astro`（参照先コンテンツが削除済みだったため）。
- **Merge conflict修正**: `travel-guide.astro` の重複記事削除、「シリーズの特徴」セクション再削除、タイトル戻し。

### セッション1（初期〜2026-02）
- Storeplateボイラープレートからのサイト構築。
- Activities セクション（travel-guide, reporting, events）作成。
- 書籍ガイドページに4冊掲載。
- カード画像差し替え（`activity-*.jpg`、各1200×900）。
