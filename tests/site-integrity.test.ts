/**
 * Im Karton Website - Site Integrity Tests
 *
 * ビルド前にサイトの整合性を検証するテスト群。
 * - 設定ファイルの値が正しいか
 * - 参照されている画像が存在するか
 * - テンプレートのプレースホルダーが残っていないか
 * - ページファイルが存在するか
 */

import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(__dirname, "..");
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf-8");
const exists = (rel: string) => existsSync(resolve(ROOT, rel));

// -----------------------------------------------------------
// 1. config.json の設定値テスト
// -----------------------------------------------------------
describe("config.json", () => {
  const config = JSON.parse(read("src/config/config.json"));

  it("site.title が Im Karton であること", () => {
    expect(config.site.title).toBe("Im Karton");
  });

  it("base_url が本番ドメインであること", () => {
    expect(config.site.base_url).toBe("https://www.imkarton.net/");
  });

  it("favicon の参照画像が存在すること", () => {
    expect(exists(`public${config.site.favicon}`)).toBe(true);
  });

  it("logo の参照画像が存在すること", () => {
    expect(exists(`public${config.site.logo}`)).toBe(true);
  });

  it("og-image の参照画像が存在すること", () => {
    expect(exists(`public${config.metadata.meta_image}`)).toBe(true);
  });

  it("meta_description が空でないこと", () => {
    expect(config.metadata.meta_description.length).toBeGreaterThan(0);
  });

  it("meta_author が Im Karton であること", () => {
    expect(config.metadata.meta_author).toContain("Im Karton");
  });

  it("hero_slides が3枚定義されていること", () => {
    expect(config.company.hero_slides).toHaveLength(3);
  });

  it("hero_slides の画像がすべて存在すること", () => {
    for (const slide of config.company.hero_slides) {
      expect(exists(`public${slide.image.src}`)).toBe(true);
    }
  });
});

// -----------------------------------------------------------
// 2. プレースホルダーテキスト残存チェック
// -----------------------------------------------------------
describe("プレースホルダーテキスト残存チェック", () => {
  const forbiddenPatterns = [
    "Lorem ipsum",
    "Storeplate",
    "Onlinelightshop",
    "Roxboro Lighting",
    "Corporate Transformation Partner",
    "Conclude collects",
    "this is meta description",
  ];

  const filesToCheck = [
    "src/config/config.json",
    "src/pages/index.astro",
    "src/pages/activities/travel-guide.astro",
    "src/pages/activities/reporting.astro",
    "src/pages/activities/events.astro",
    "src/content/pages/privacy-policy.md",
    "src/content/pages/terms-services.md",
  ];

  for (const file of filesToCheck) {
    for (const pattern of forbiddenPatterns) {
      it(`${file} に "${pattern}" が含まれていないこと`, () => {
        if (exists(file)) {
          const content = read(file);
          expect(content).not.toContain(pattern);
        }
      });
    }
  }
});

// -----------------------------------------------------------
// 3. ページファイル存在チェック
// -----------------------------------------------------------
describe("ページファイルの存在", () => {
  const requiredPages = [
    "src/pages/index.astro",
    "src/pages/activities/travel-guide.astro",
    "src/pages/activities/reporting.astro",
    "src/pages/activities/events.astro",
    "src/pages/404.astro",
  ];

  for (const page of requiredPages) {
    it(`${page} が存在すること`, () => {
      expect(exists(page)).toBe(true);
    });
  }
});

// -----------------------------------------------------------
// 4. コンテンツファイルの整合性
// -----------------------------------------------------------
describe("コンテンツファイルの整合性", () => {
  it("privacy-policy.md が存在し draft: false であること", () => {
    const content = read("src/content/pages/privacy-policy.md");
    expect(content).toContain("draft: false");
  });

  it("terms-services.md が存在し draft: false であること", () => {
    const content = read("src/content/pages/terms-services.md");
    expect(content).toContain("draft: false");
  });

  it("privacy-policy.md のタイトルが日本語であること", () => {
    const content = read("src/content/pages/privacy-policy.md");
    expect(content).toContain("プライバシーポリシー");
  });

  it("terms-services.md のタイトルが日本語であること", () => {
    const content = read("src/content/pages/terms-services.md");
    expect(content).toContain("利用規約");
  });

  it("不要な news コンテンツが削除されていること", () => {
    expect(exists("src/content/news/2024-09-whitepaper.md")).toBe(false);
    expect(exists("src/content/news/2024-11-award.md")).toBe(false);
    expect(exists("src/content/news/2025-01-kickoff.md")).toBe(false);
  });

  it("不要な case-studies コンテンツが削除されていること", () => {
    expect(exists("src/content/case-studies/global-logistics-app.md")).toBe(false);
    expect(exists("src/content/case-studies/im-karton-refresh.md")).toBe(false);
  });

  it("不要な about コンテンツが削除されていること", () => {
    expect(exists("src/content/about/-index.md")).toBe(false);
  });

  it("不要な contact コンテンツが削除されていること", () => {
    expect(exists("src/content/contact/-index.md")).toBe(false);
  });
});

// -----------------------------------------------------------
// 5. 画像アセットの存在チェック
// -----------------------------------------------------------
describe("画像アセットの存在", () => {
  const requiredImages = [
    "public/images/im_Karton_logo.png",
    "public/images/favicon.jpg",
    "public/images/og-image.jpg",
    "public/images/hero_slider_SPIEL_Essen.jpg",
    "public/images/hero_slider_FIJ.jpg",
    "public/images/hero_slider_note.jpg",
    "public/images/books/Essen_Spiel_Guidebook_2023.jpg",
    "public/images/books/GenCon_Guidebook.jpg",
    "public/images/books/Essen_Spiel_Guidebook 2023_Plus_One.jpg",
    "public/images/books/FIJ_Cannes_Guidebook.png",
  ];

  for (const img of requiredImages) {
    it(`${img} が存在すること`, () => {
      expect(exists(img)).toBe(true);
    });
  }

  const removedImages = [
    "public/images/404.png",
    "public/images/aboutUs.png",
    "public/images/avatar.png",
    "public/images/avatar-sm.png",
    "public/images/category-1.png",
    "public/images/category-2.png",
    "public/images/product-1.png",
    "public/images/product-placeholder.jpg",
    "public/images/logo.png",
    "public/images/logo-darkmode.png",
  ];

  for (const img of removedImages) {
    it(`不要画像 ${img} が削除されていること`, () => {
      expect(exists(img)).toBe(false);
    });
  }
});

// -----------------------------------------------------------
// 6. social.json の整合性
// -----------------------------------------------------------
describe("social.json", () => {
  const social = JSON.parse(read("src/config/social.json"));

  it("SNSリンクが定義されていること", () => {
    expect(social.main.length).toBeGreaterThan(0);
  });

  it("すべてのリンクが https:// で始まること", () => {
    for (const item of social.main) {
      if (item.link) {
        expect(item.link).toMatch(/^https:\/\//);
      }
    }
  });
});

// -----------------------------------------------------------
// 7. menu.json のリンク先チェック
// -----------------------------------------------------------
describe("menu.json", () => {
  const menu = JSON.parse(read("src/config/menu.json"));

  it("フッターリンクの参照先コンテンツが存在すること", () => {
    if (menu.footer_copyright_links) {
      for (const link of menu.footer_copyright_links) {
        if (link.url.startsWith("/")) {
          // /privacy-policy -> src/content/pages/privacy-policy.md
          const slug = link.url.replace(/^\//, "");
          const mdPath = `src/content/pages/${slug}.md`;
          expect(exists(mdPath)).toBe(true);
        }
      }
    }
  });
});

// -----------------------------------------------------------
// 8. travel-guide.astro のデータ整合性
// -----------------------------------------------------------
describe("travel-guide.astro のデータ整合性", () => {
  const content = read("src/pages/activities/travel-guide.astro");

  it("4冊の書籍が定義されていること", () => {
    const matches = content.match(/id:\s*"/g);
    expect(matches).toHaveLength(4);
  });

  it("すべての書籍にBOOTH URLが設定されていること", () => {
    const boothUrls = content.match(/boothUrl:\s*"https:\/\/imkarton\.booth\.pm\/items\/\d+"/g);
    expect(boothUrls).toHaveLength(4);
  });

  it("書籍画像がすべて存在すること", () => {
    const imageMatches = content.match(/image:\s*"([^"]+)"/g);
    if (imageMatches) {
      for (const match of imageMatches) {
        const path = match.replace(/image:\s*"/, "").replace(/"$/, "");
        // URL-encoded spaces in path
        const decodedPath = decodeURIComponent(path);
        expect(exists(`public${decodedPath}`)).toBe(true);
      }
    }
  });
});
