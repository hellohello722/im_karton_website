import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { aboutCollection } from "./types/pages/aboutCollection";
import { contactCollection } from "./types/pages/contactCollection";
import { ctaSectionCollection } from "./types/sections/ctaSectionCollection";
import { paymentCollection } from "./types/sections/paymentCollection";

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const caseStudyCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.string().optional(),
    year: z.number().optional(),
    cover_image: z.string().optional(),
    results: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    linkedin: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional(),
  }),
});

const newsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/news" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  // Pages
  pages: pagesCollection,
  about: aboutCollection,
  contact: contactCollection,

  // sections
  ctaSection: ctaSectionCollection,
  paymentSection: paymentCollection,
  caseStudies: caseStudyCollection,
  team: teamCollection,
  news: newsCollection,
};
