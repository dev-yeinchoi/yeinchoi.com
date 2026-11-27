import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { buttonClass } from "@/components/ui";
import { site } from "@/content/site";
import { categoryName, formatDate, getAdjacentPosts, getAllPosts, getPost } from "@/lib/blog";
import { BlogIcon } from "../BlogIcon";
import { CopyLinkButton } from "./CopyLinkButton";
import { mdxComponents, rehypeCodeMeta } from "./mdx";
import { ReadingBar } from "./ReadingBar";
import "../blog.css";
import "./post.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <ReadingBar toc={post.toc} articleId="b-article" title={post.title} />
      <div className="b-post">
        <nav aria-label="경로" className="b-crumb">
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="b-crumb__cat">{categoryName(post.category)}</span>
        </nav>
        <h1 className="b-post__title">{post.title}</h1>
        <div className="b-post__meta">
          <span aria-hidden="true" className="b-avatar">
            Y
          </span>
          <span className="b-post__author">최예인</span>
          <span aria-hidden="true">·</span>
          <time className="num" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}분 읽기</span>
        </div>

        <figure className="b-cover">
          {post.cover ? (
            <img src={post.cover} alt="" />
          ) : (
            <div className="b-cover__empty" aria-hidden="true">
              <BlogIcon category={post.category} size={64} />
            </div>
          )}
        </figure>

        <article id="b-article" className="prose">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug, rehypeCodeMeta] } }}
          />
        </article>

        <div className="b-post__foot">
          <div className="b-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="b-tag">
                #{tag}
              </span>
            ))}
          </div>
          <CopyLinkButton />
        </div>

        {prev || next ? (
          <nav aria-label="이전 글, 다음 글" className="b-adjacent">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="b-adjacent__item">
                <span className="b-adjacent__label">이전 글</span>
                <span className="b-adjacent__title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="b-adjacent__item b-adjacent__item--next">
                <span className="b-adjacent__label">다음 글</span>
                <span className="b-adjacent__title">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        ) : null}

        <div className="b-back">
          <Link href="/blog" className={buttonClass("outline", "lg")}>
            목록으로
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 검색 엔진용 구조화 데이터
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            author: { "@type": "Person", name: site.name },
            url: `${site.url}/blog/${post.slug}`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
