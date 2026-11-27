/** 서버(빌드)에서만 불러요. 파일 시스템을 읽어요. */
import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { CATEGORIES, type Category } from "@/lib/categories";

/** 글은 이 폴더의 `.mdx` 파일이에요. 파일 이름이 주소가 돼요 (`hello.mdx` → `/blog/hello`). */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const BLOG_CATEGORIES = ["dev", "retro", "travel", "daily", "reading"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface TocItem {
  id: string;
  label: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  category: BlogCategory;
  excerpt: string;
  tags: string[];
  /** public 폴더 기준 대표 이미지 경로 (예: /images/blog/hello.jpg) */
  cover?: string;
  /** 분 */
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

const isBlogCategory = (v: unknown): v is BlogCategory =>
  typeof v === "string" && (BLOG_CATEGORIES as readonly string[]).includes(v);

function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? "");
}

/** 한글 기준 1분에 500자 정도 읽어요. 코드 블록은 빼고 세요. */
function readingMinutes(content: string): number {
  const text = content.replace(/```[\s\S]*?```/g, "").replace(/\s+/g, "");
  return Math.max(1, Math.round(text.length / 500));
}

/** 본문의 `## 제목`으로 목차를 만들어요. id는 rehype-slug와 같은 규칙이에요. */
function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const toc: TocItem[] = [];
  for (const line of withoutCode.split("\n")) {
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const label = m[2].replace(/`/g, "");
    const id = slugger.slug(label);
    if (m[1].length === 2) toc.push({ id, label });
  }
  return toc;
}

function readPostFile(file: string): Post & { draft: boolean } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`[blog] ${file}: title이 없어요.`);
  if (!isBlogCategory(data.category)) {
    throw new Error(`[blog] ${file}: category는 ${BLOG_CATEGORIES.join(", ")} 중 하나여야 해요.`);
  }
  const date = toDateString(data.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`[blog] ${file}: date는 YYYY-MM-DD 형식이에요.`);

  return {
    slug,
    title: String(data.title),
    date,
    category: data.category,
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: readingMinutes(content),
    content,
    toc: extractToc(content),
    draft: Boolean(data.draft),
  };
}

/** 모든 글 (최신순). `draft: true`인 글은 빼요. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPostFile)
    .filter((p) => !p.draft)
    .map(({ draft: _d, ...post }) => post)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export function getPostMetas(): PostMeta[] {
  return getAllPosts().map(({ content: _c, toc: _t, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** 이전 글 = 더 오래된 글, 다음 글 = 더 최근 글 */
export function getAdjacentPosts(slug: string): { prev?: PostMeta; next?: PostMeta } {
  const metas = getPostMetas();
  const i = metas.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: metas[i + 1], next: metas[i - 1] };
}

export function categoryName(category: Category): string {
  return CATEGORIES[category].label;
}

/** 2026-10-30 → 2026.10.30 */
export const formatDate = (date: string) => date.replace(/-/g, ".");
