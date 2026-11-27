"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/blog";
import { cx } from "@/lib/cx";

/**
 * 글 위쪽에 붙어 있는 읽기 바.
 * 지금 읽는 소제목, 목차 펼침, 읽은 비율(%)과 진행 막대를 보여줘요.
 */
export function ReadingBar({ toc, articleId, title }: { toc: TocItem[]; articleId: string; title: string }) {
  const [current, setCurrent] = useState(0);
  const [pct, setPct] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const art = document.getElementById(articleId);
      let next = 0;
      if (art) {
        const r = art.getBoundingClientRect();
        // 본문이 화면 아래쪽 끝에 닿으면 100%
        const total = Math.max(1, r.height - window.innerHeight * 0.6);
        next = Math.round(Math.min(1, Math.max(0, -r.top / total)) * 100);
      }
      setPct(next);

      let cur = 0;
      toc.forEach((t, i) => {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) cur = i;
      });
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc, articleId]);

  // 바깥을 누르거나 Esc를 누르면 목차를 닫아요
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (i: number) => {
    const el = document.getElementById(toc[i].id);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    setCurrent(i);
    setOpen(false);
  };

  const hasToc = toc.length > 0;

  return (
    <div className="b-bar">
      <div className="b-bar__in" ref={wrapRef}>
        {hasToc ? (
          <button
            type="button"
            className="b-bar__toggle"
            aria-expanded={open}
            aria-controls="b-toc"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
            </svg>
            <span className="b-bar__label">목차</span>
            <span aria-hidden="true" className="b-bar__dot">
              ·
            </span>
            <span className="b-bar__current">{toc[current]?.label}</span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cx("b-bar__chev", open && "is-open")}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        ) : (
          <span className="b-bar__current b-bar__current--solo">{title}</span>
        )}
        <span className="b-bar__pct num">{pct}% 읽음</span>

        {open ? (
          <div id="b-toc" role="menu" className="b-toc">
            {toc.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="menuitem"
                aria-current={i === current ? "location" : undefined}
                className={cx("b-toc__item", i === current && "is-current")}
                onClick={() => go(i)}
              >
                <span className="b-toc__n num">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="b-bar__track" aria-hidden="true">
        <div className="b-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
