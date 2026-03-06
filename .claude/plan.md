# Cloudflare Pages 移行プラン

## 現状分析

- **アダプター**: `@astrojs/netlify`（edgeMiddleware有効）
- **出力モード**: `output: "server"`（全ページSSR）
- **SSR使用箇所**: `Astro.redirect("/404")` のみ（draft/未存在コンテンツの404転送）
- **API routes / middleware**: なし
- **実態**: SSRの必要性がほぼない静的サイト

## 方針: `output: "static"` に変更（アダプター不要）

このサイトはSSR機能をほぼ使っていないため、完全静的出力に切り替えます。
Cloudflare Pagesは静的サイトをそのままホストでき、アダプター不要・Workers不要で最もシンプルです。

## コード変更

### 1. `astro.config.mjs`
- `@astrojs/netlify` のimportとadapter設定を削除
- `output: "server"` → `output: "static"` に変更

### 2. 動的ルートに `getStaticPaths()` を追加
静的出力では必須。対象:
- `src/pages/news/[slug].astro`
- `src/pages/works/[slug].astro`
- `src/pages/[regular].astro`（既に`prerender: true`だが確認）

### 3. 削除済みコンテンツを参照しているページの対処
`about.astro` と `contact.astro` が削除済みコンテンツを参照→ビルドエラーになる。
- コンテンツが不要なら**ページごと削除**
- 将来使うなら**エラーハンドリングを追加**

### 4. `package.json`
- `@astrojs/netlify` を削除
- `@astrojs/node` を削除（未使用）

### 5. `netlify.toml`
- 削除（不要）

## Cloudflare側の設定（ダッシュボードで実施）

### デプロイ設定
- GitHubリポジトリを接続
- ビルドコマンド: `yarn build`
- 出力ディレクトリ: `dist`
- 環境変数: `NODE_VERSION=22`

### 独自ドメイン（`www.imkarton.net`）
- Cloudflare PagesのカスタムドメインとしてDNS設定
- SSL自動発行

### プレビューの限定公開
- **Cloudflare Access（Zero Trust）** を使用
- プレビューデプロイメント（`*.pages.dev`）にアクセスポリシーを設定
- メールアドレスベースのワンタイムPINで認証（無料枠で50ユーザーまで）
- 本番ドメインには制限なし
