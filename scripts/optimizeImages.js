/**
 * optimizeImages.js
 *
 * ビルド前に public/images/ 内の画像を自動最適化するスクリプト。
 * - 大きすぎる画像をリサイズ
 * - JPEG品質を調整して圧縮
 * - PNG を圧縮
 * - 元ファイルを上書き（ビルド環境上のみ。git の元ファイルは変更されない）
 *
 * 使い方:
 *   node scripts/optimizeImages.js          # public/images/ を処理
 *   node scripts/optimizeImages.js --dry-run # 実際には書き込まず、処理内容だけ表示
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.resolve("public/images");
const DRY_RUN = process.argv.includes("--dry-run");

// 画像カテゴリ別の最適化ルール
const RULES = [
  {
    // ヒーロースライダー: 横幅が非常に大きいバナー画像
    match: (name) => name.startsWith("hero_slider_"),
    maxWidth: 2560,
    jpegQuality: 82,
  },
  {
    // OG画像: SNSシェア用（推奨 1200x630）
    match: (name) => name.startsWith("og-image"),
    maxWidth: 1200,
    maxHeight: 630,
    jpegQuality: 85,
  },
  {
    // ファビコン: ブラウザタブ用アイコン
    match: (name) => name.startsWith("favicon"),
    maxWidth: 512,
    maxHeight: 512,
    jpegQuality: 90,
  },
  {
    // ロゴ: 横長ロゴ
    match: (name) => name.includes("logo"),
    maxWidth: 1200,
    pngCompressionLevel: 9,
  },
  {
    // デフォルトルール: その他すべての画像
    match: () => true,
    maxWidth: 2000,
    maxHeight: 2000,
    jpegQuality: 82,
    pngCompressionLevel: 9,
  },
];

/**
 * 再帰的にディレクトリ内の画像ファイルを取得
 */
function getImageFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * ファイルサイズを人間が読める形式に変換
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 1つの画像を最適化
 */
async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = fs.statSync(filePath).size;

  // マッチするルールを検索
  const rule = RULES.find((r) => r.match(fileName));
  if (!rule) return null;

  // ファイルをバッファに読み込み（Windows のファイルロック回避）
  const inputBuffer = fs.readFileSync(filePath);

  // メタデータ取得
  const metadata = await sharp(inputBuffer).metadata();
  const { width, height, format } = metadata;

  // リサイズが必要か判定
  const needsResize =
    (rule.maxWidth && width > rule.maxWidth) ||
    (rule.maxHeight && height > rule.maxHeight);

  // 小さい画像 (100KB未満) かつリサイズ不要ならスキップ
  if (!needsResize && originalSize < 100 * 1024) {
    return null;
  }

  // sharp パイプライン構築（バッファから処理）
  let pipeline = sharp(inputBuffer);

  if (needsResize) {
    pipeline = pipeline.resize({
      width: rule.maxWidth || undefined,
      height: rule.maxHeight || undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // フォーマット別の圧縮設定
  if (format === "jpeg" || ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({
      quality: rule.jpegQuality || 82,
      mozjpeg: true,
    });
  } else if (format === "png" || ext === ".png") {
    pipeline = pipeline.png({
      compressionLevel: rule.pngCompressionLevel || 9,
      effort: 10,
    });
  }

  // 処理実行
  const outputBuffer = await pipeline.toBuffer();
  const newSize = outputBuffer.length;

  // サイズが増えた場合はスキップ（圧縮の意味がない）
  if (newSize >= originalSize) {
    return null;
  }

  const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(
    0,
  );

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, outputBuffer);
  }

  // リサイズ後のサイズ取得
  const newMeta = await sharp(outputBuffer).metadata();

  return {
    file: path.relative(IMAGES_DIR, filePath),
    originalSize,
    newSize,
    savedPercent,
    originalDimensions: `${width}x${height}`,
    newDimensions: `${newMeta.width}x${newMeta.height}`,
    resized: needsResize,
  };
}

// メイン処理
async function main() {
  console.log(
    `\n  Image Optimization ${DRY_RUN ? "(dry-run)" : ""}\n  ${"=".repeat(40)}`,
  );

  const files = getImageFiles(IMAGES_DIR);
  console.log(`  Found ${files.length} images in public/images/\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      if (result) {
        optimizedCount++;
        totalOriginal += result.originalSize;
        totalNew += result.newSize;

        const dims = result.resized
          ? `${result.originalDimensions} -> ${result.newDimensions}`
          : result.originalDimensions;

        console.log(
          `  ✓ ${result.file.padEnd(45)} ${formatSize(result.originalSize).padStart(8)} -> ${formatSize(result.newSize).padStart(8)}  (${dims}, -${result.savedPercent}%)`,
        );
      }
    } catch (err) {
      console.error(`  ✗ ${path.relative(IMAGES_DIR, file)}: ${err.message}`);
    }
  }

  if (optimizedCount > 0) {
    const totalSaved = totalOriginal - totalNew;
    console.log(
      `\n  Summary: ${optimizedCount} images optimized, ${formatSize(totalSaved)} saved (${formatSize(totalOriginal)} -> ${formatSize(totalNew)})`,
    );
  } else {
    console.log("\n  All images are already optimized.");
  }
  console.log();
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
