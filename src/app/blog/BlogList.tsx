"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Card, Icon, SegmentedControl, StatusText, Tabs } from "@/components/ui";
import type { BlogCategory, PostMeta } from "@/lib/blog";
import { CATEGORIES } from "@/lib/categories";
import { cx } from "@/lib/cx";
import { BlogThumb } from "./BlogIcon";

const PER_PAGE = 5;
const CATEGORY_ORDER: BlogCategory[] = ["dev", "retro", "travel", "daily", "reading"];

type Tab = "all" | BlogCategory;
type Sort = "new" | "old";

const formatDate = (d: string) => d.replace(/-/g, ".");

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const [sort, setSort] = useState<Sort>("new");
  const [page, setPage] = useState(0);

  if (posts.length === 0) {
    return (
      <Card variant="line" className="b-empty">
        <StatusText>아직 쓴 글이 없어요. 첫 글을 준비하고 있어요.</StatusText>
      </Card>
    );
  }

  // 대표 글은 가장 최근 글이에요. 아래 목록에서는 빼요.
  const lead = posts[0];
  const filtered = posts.slice(1).filter((p) => tab === "all" || p.category === tab);
  const sorted = sort === "new" ? filtered : [...filtered].reverse();
  const pageCount = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const rows = sorted.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  const tabs = [
    { value: "all" as Tab, label: "전체", count: posts.length },
    ...CATEGORY_ORDER.map((c) => ({
      value: c as Tab,
      label: CATEGORIES[c].label,
      count: posts.filter((p) => p.category === c).length,
    })),
  ];

  return (
    <>
      <section aria-label="대표 글" className="b-lead-wrap">
        <Link href={`/blog/${lead.slug}`} className="b-lead">
          <BlogThumb cover={lead.cover} category={lead.category} iconSize={56} className="b-thumb b-thumb--lead" />
          <span className="b-lead__text">
            <span className="b-lead__meta">
              <Badge tone="primary">최신 글</Badge>
              <span className="t-label2 b-cat">{CATEGORIES[lead.category].label}</span>
            </span>
            <span className="b-lead__title b-hover-title">{lead.title}</span>
            {lead.excerpt ? <span className="t-body1r b-excerpt">{lead.excerpt}</span> : null}
            <span className="t-label2 num b-date">
              {formatDate(lead.date)} · {lead.readingTime}분
            </span>
          </span>
        </Link>
      </section>

      <div className="b-toolbar">
        <Tabs
          label="카테고리"
          items={tabs}
          value={tab}
          onChange={(v) => {
            setTab(v as Tab);
            setPage(0);
          }}
        />
        <SegmentedControl
          label="정렬"
          options={[
            { value: "new", label: "최신순" },
            { value: "old", label: "오래된순" },
          ]}
          value={sort}
          onChange={(v) => {
            setSort(v as Sort);
            setPage(0);
          }}
        />
      </div>

      {rows.length === 0 ? (
        <p className="b-none">
          <StatusText>
            {tab === "all" ? "대표 글 말고는 아직 글이 없어요." : "이 카테고리에는 아직 글이 없어요."}
          </StatusText>
        </p>
      ) : (
        <ul key={`${tab}-${sort}-${current}`} className="b-rows">
          {rows.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="b-row">
                <span className="b-row__text">
                  <span className="t-label2 b-cat">{CATEGORIES[p.category].label}</span>
                  <span className="b-row__title b-hover-title">{p.title}</span>
                  {p.excerpt ? <span className="b-row__excerpt">{p.excerpt}</span> : null}
                  <span className="t-label2 num b-date">
                    {formatDate(p.date)} · {p.readingTime}분
                  </span>
                </span>
                <BlogThumb cover={p.cover} category={p.category} iconSize={32} className="b-thumb b-thumb--row" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 ? (
        <nav aria-label="페이지" className="b-pager">
          <button
            type="button"
            className="b-pager__arrow"
            aria-label="이전 페이지"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
          >
            <Icon.ChevronLeft />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: 페이지 번호가 곧 키예요
              key={i}
              type="button"
              className={cx("b-pager__n num", i === current && "is-current")}
              aria-current={i === current ? "page" : undefined}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="b-pager__arrow"
            aria-label="다음 페이지"
            disabled={current === pageCount - 1}
            onClick={() => setPage(current + 1)}
          >
            <Icon.ChevronRight />
          </button>
        </nav>
      ) : null}
    </>
  );
}
