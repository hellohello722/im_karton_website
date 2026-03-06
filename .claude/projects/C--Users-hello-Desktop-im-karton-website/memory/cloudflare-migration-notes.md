# Cloudflare Pages 移行時の検討事項メモ

## 将来検討すべき項目

### 1. output: "server" → "static" への変更検討
- 現在SSRで動いているが、実際のSSR使用箇所は `Astro.redirect("/404")` のみ（draftコンテンツ判定）
- 完全静的にすればWorkers不要・高速・シンプルになる
- ただし動的ルート（`[slug].astro`）に `getStaticPaths()` の追加が必要

### 2. about.astro / contact.astro の対処
- 両ページは削除済みコンテンツを参照している
- 現在はSSRの `Astro.redirect("/404")` で404転送されている
- 静的出力に切り替えるとビルドエラーになる可能性あり
- 対策: ページごと削除 or エラーハンドリング追加

### 3. sharp の互換性
- `astro.config.mjs` で `image: { service: sharp() }` を使用
- Cloudflare Workers上ではsharpのネイティブバイナリが動作しない
- サーバーモードでは実行時にWorkers上でsharpが呼ばれる可能性がある
- 対策: 静的出力にする（ビルド時のみsharp使用）か、画像サービスを変更

### 4. @astrojs/node の未使用パッケージ
- package.json に `@astrojs/node` が残っているが使われていない
- クリーンアップ推奨

### 5. 画像最適化の再導入
- 現在 `imageService: "passthrough"` で画像最適化なし
- Cloudflareビルド環境でsharpが使えないため一時的にパススルーにした
- 画像が最適化されないためページ表示速度やデータ量に影響あり
- 対策候補:
  - Cloudflare Image Resizing（有料プラン）を使う
  - ビルド前にローカルで画像を事前最適化（WebP変換・リサイズ）しておく
  - `output: "static"` に変更してビルドマシンにsharpをインストールする方法を検討
