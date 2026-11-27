"use client";

import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import { Chip, Icon, IconButton, SegmentedControl, StatusText } from "@/components/ui";
import {
  KEYWORD_ORDER,
  PROJECT_TYPE_ORDER,
  type Project,
  type ProjectType,
  projects,
} from "@/content/projects";
import { CATEGORIES, type Hue } from "@/lib/categories";
import { cx } from "@/lib/cx";

type Mode = "type" | "year";

interface Palette {
  /** 폴더 앞면 (90) */
  face: string;
  /** 폴더 뒷면·탭 (80) */
  back: string;
  /** 폴더에서 삐져나온 종이 (다른 색 90) */
  paper: string;
  /** 연한 배경 (95) */
  tint: string;
  /** 점·글자 */
  ink: string;
}

const INK_STEP: Record<Hue, number> = {
  blue: 50,
  violet: 50,
  redorange: 50,
  green: 40,
  orange: 40,
  lightblue: 40,
};

function palette(hue: Hue, paperHue: Hue): Palette {
  return {
    face: `var(--${hue}-90)`,
    back: `var(--${hue}-80)`,
    paper: `var(--${paperHue}-90)`,
    tint: `var(--${hue}-95)`,
    ink: `var(--${hue}-${INK_STEP[hue]})`,
  };
}

/** 종류별 폴더 색: 앞면 색 + 삐져나온 종이 색 */
const TYPE_PAPER: Record<ProjectType, Hue> = {
  research: "orange",
  hackathon: "lightblue",
  contest: "violet",
  team: "redorange",
};
const typePalette = (t: ProjectType) => palette(CATEGORIES[t].hue, TYPE_PAPER[t]);

/** 연도별 폴더는 이 순서로 색을 돌려 써요 */
const YEAR_PALETTES: Array<[Hue, Hue]> = [
  ["blue", "orange"],
  ["redorange", "lightblue"],
  ["violet", "redorange"],
  ["orange", "violet"],
];

interface Group {
  key: string;
  label: string;
  colors: Palette;
  items: Project[];
}

const CARD_W = 340;
const STEP = 372;
const ROTS = [-1.6, 1.2, -0.8, 1.8];
const AUTOPLAY_MS = 5000;
const TICK_MS = 100;

const byYearDesc = (a: Project, b: Project) => b.year.localeCompare(a.year);

const ALL_KEYWORDS = Array.from(new Set(projects.flatMap((p) => p.keywords))).sort((a, b) => {
  const ia = KEYWORD_ORDER.indexOf(a);
  const ib = KEYWORD_ORDER.indexOf(b);
  if (ia >= 0 && ib >= 0) return ia - ib;
  if (ia >= 0) return -1;
  if (ib >= 0) return 1;
  return a.localeCompare(b, "ko");
});

function buildGroups(mode: Mode, keyword: string | null): Group[] {
  const items = projects.filter((p) => !keyword || p.keywords.includes(keyword));
  if (mode === "type") {
    return PROJECT_TYPE_ORDER.map((t) => ({
      key: t,
      label: CATEGORIES[t].label,
      colors: typePalette(t),
      items: items.filter((p) => p.type === t).sort(byYearDesc),
    }));
  }
  const years = Array.from(new Set(projects.map((p) => p.year)))
    .sort()
    .reverse();
  return years.map((y, i) => {
    const [hue, paperHue] = YEAR_PALETTES[i % YEAR_PALETTES.length];
    return { key: y, label: y, colors: palette(hue, paperHue), items: items.filter((p) => p.year === y) };
  });
}

const pad2 = (n: number) => String(n).padStart(2, "0");

export function ProjectBoard() {
  const [mode, setMode] = useState<Mode>("type");
  const [keyword, setKeyword] = useState<string | null>(null);
  const [open, setOpen] = useState(0);
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  /** 폴더를 새로 열 때마다 카드가 다시 튀어나오게 하는 키 */
  const [openCount, setOpenCount] = useState(0);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const groups = buildGroups(mode, keyword);
  const openIdx = Math.min(open, groups.length - 1);
  const group = groups[openIdx];
  const items = group?.items ?? [];
  const n = items.length;
  const current = Math.min(idx, Math.max(0, n - 1));
  const active = items[current];
  const running = !reduceMotion && !userPaused && !hover && !dragging && n > 0;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const openFolder = (i: number) => {
    setOpen(i);
    setIdx(0);
    setElapsed(0);
    setOpenCount((c) => c + 1);
  };

  const focus = (i: number) => {
    if (!n) return;
    setIdx(Math.max(0, Math.min(n - 1, i)));
    setElapsed(0);
  };

  // 자동 넘김: 마지막 카드 다음에는 프로젝트가 있는 다음 폴더를 열어요
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setElapsed((e) => e + TICK_MS);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [running]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: elapsed가 다 찼을 때만 넘겨요
  useEffect(() => {
    if (elapsed < AUTOPLAY_MS) return;
    if (current + 1 < n) {
      setIdx(current + 1);
      setElapsed(0);
      return;
    }
    for (let s = 1; s <= groups.length; s++) {
      const j = (openIdx + s) % groups.length;
      if (groups[j].items.length) {
        openFolder(j);
        return;
      }
    }
    setElapsed(0);
  }, [elapsed]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    if (d.moved) setDragX(dx);
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    justDragged.current = true;
    setTimeout(() => {
      justDragged.current = false;
    }, 0);
    const shift = Math.round(-dragX / STEP) || (dragX < -60 ? 1 : dragX > 60 ? -1 : 0);
    setDragging(false);
    setDragX(0);
    focus(current + shift);
  };

  if (projects.length === 0) {
    return (
      <>
        <Header mode={mode} onMode={setMode} />
        <section className="l-container">
          <p className="p-empty t-body2">아직 정리한 프로젝트가 없어요. 곧 채워 둘게요.</p>
        </section>
        <div className="p-bottom-space" />
      </>
    );
  }

  const status = running
    ? `${Math.ceil((AUTOPLAY_MS - elapsed) / 1000)}초 뒤 다음 카드 · 끌어서 넘기기`
    : "멈춤 · 끌거나 카드를 눌러 보세요";

  return (
    <>
      <Header
        mode={mode}
        onMode={(m) => {
          setMode(m);
          openFolder(0);
        }}
      />

      {ALL_KEYWORDS.length > 0 ? (
        <section className="l-container p-keywords">
          <div role="group" aria-label="키워드로 거르기" className="p-keywords__in">
            {ALL_KEYWORDS.map((k) => (
              <Chip
                key={k}
                small
                selected={keyword === k}
                onClick={() => {
                  setKeyword(keyword === k ? null : k);
                  setIdx(0);
                  setElapsed(0);
                  setOpenCount((c) => c + 1);
                }}
              >
                #{k}
              </Chip>
            ))}
          </div>
        </section>
      ) : null}

      <section className="l-container p-folders-wrap">
        <div role="tablist" aria-label="폴더" className="p-folders">
          {groups.map((g, i) => {
            const on = i === openIdx;
            const style = {
              "--face": g.colors.face,
              "--back": g.colors.back,
              "--paper": g.colors.paper,
              "--lift": on ? "-44px" : "0px",
            } as CSSProperties;
            return (
              <button
                key={g.key}
                type="button"
                role="tab"
                aria-selected={on}
                className={cx("p-folder", on && "is-open")}
                style={style}
                onClick={() => openFolder(i)}
              >
                <span aria-hidden="true" className="p-folder__back" />
                <span aria-hidden="true" className="p-folder__tab" />
                <span aria-hidden="true" className="p-folder__peek p-folder__peek--a" />
                <span aria-hidden="true" className="p-folder__peek p-folder__peek--b" />
                <span className="p-folder__front">
                  <span className="t-heading1 p-folder__label">{g.label}</span>
                  <span className="p-folder__count num">{g.items.length}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="p-open"
        aria-roledescription="carousel"
        aria-label="열린 폴더의 프로젝트"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <div className="l-container p-open__head">
          <h2 className="t-heading1 p-open__title">
            <span aria-hidden="true" className="p-open__dot" style={{ background: group.colors.ink }} />
            {group.label}
            {n ? (
              <span className="num t-label1 p-open__pos">{`${pad2(current + 1)} / ${pad2(n)}`}</span>
            ) : null}
          </h2>
          <div className="p-open__controls">
            <StatusText className="p-open__status">{status}</StatusText>
            <IconButton
              label="이전 프로젝트"
              icon={<Icon.ChevronLeft />}
              onClick={() => focus(current - 1)}
            />
            <IconButton
              label={userPaused ? "자동 넘김 켜기" : "자동 넘김 멈추기"}
              icon={running ? <Icon.Pause /> : <Icon.Play />}
              onClick={() => setUserPaused((v) => !v)}
            />
            <IconButton
              label="다음 프로젝트"
              icon={<Icon.ChevronRight />}
              solid
              onClick={() => focus(current + 1)}
            />
          </div>
        </div>

        {n > 0 && active ? (
          <>
            <div
              className="p-stage"
              data-dragging={dragging}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                className="p-track"
                style={{ transform: `translateX(${-(current * STEP + CARD_W / 2) + dragX}px)` }}
              >
                {items.map((p, i) => {
                  const d = Math.abs(i - current);
                  const on = i === current;
                  const colors = typePalette(p.type);
                  return (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: 키보드로는 이전·다음 버튼과 아래 목록으로 옮겨요
                    <div
                      key={`${openCount}-${p.title}-${p.year}-${i}`}
                      className="p-card"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${n}개 중 ${i + 1}번째: ${p.title}`}
                      aria-current={on ? "true" : undefined}
                      onClick={() => {
                        if (!justDragged.current) focus(i);
                      }}
                      style={{
                        left: i * STEP,
                        transform: `scale(${on ? 1 : 0.86})`,
                        opacity: d === 0 ? 1 : d === 1 ? 0.6 : 0.35,
                        filter: `saturate(${on ? 1 : 0.6})`,
                        zIndex: 10 - d,
                        cursor: on ? "inherit" : "pointer",
                      }}
                    >
                      <div className="p-card__pop" style={{ animationDelay: `${i * 110}ms` }}>
                        <div
                          className="p-card__lift c-card"
                          style={{
                            boxShadow: on ? "var(--shadow-md)" : "var(--shadow-xs)",
                            transform: `rotate(${on ? 0 : ROTS[i % ROTS.length]}deg)`,
                          }}
                        >
                          <div className="c-thumb p-card__thumb" style={{ background: colors.tint }}>
                            {p.image ? <img src={p.image} alt="" /> : "[대표 이미지]"}
                          </div>
                          <div className="p-card__badges">
                            <span className="c-badge" style={{ background: colors.tint, color: colors.ink }}>
                              {CATEGORIES[p.type].label}
                            </span>
                            <span className="c-badge num">{p.year}</span>
                          </div>
                          <span className="t-headline1 p-card__title">{p.title}</span>
                          {p.award ? (
                            <span className="p-award">
                              <span aria-hidden="true">🏆</span> {p.award}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="l-container" aria-live="polite">
              <div key={`${openCount}-${current}`} className="p-detail">
                <div className="c-card c-card--line p-detail__box p-rise">
                  <span className="t-label2 p-muted">문제</span>
                  <span className="t-body1r p-strong">{active.problem}</span>
                  <span className="t-label2 p-muted">{active.keywords.map((k) => `#${k}`).join("  ")}</span>
                </div>
                <div
                  className="p-detail__box p-detail__metric p-rise"
                  style={{ background: typePalette(active.type).tint, animationDelay: "60ms" }}
                >
                  <span className="t-label2 p-neutral">성과</span>
                  <span className="t-title1 num" style={{ color: typePalette(active.type).ink }}>
                    {active.metric}
                  </span>
                  <span className="t-label1 p-neutral" style={{ fontWeight: 400 }}>
                    {active.metricLabel}
                  </span>
                </div>
                <div
                  className="c-card c-card--line p-detail__box p-detail__role p-rise"
                  style={{ animationDelay: "120ms" }}
                >
                  <dl>
                    <div>
                      <dt className="t-label2 p-muted">역할</dt>
                      <dd className="t-body1">{active.role}</dd>
                    </div>
                    <div>
                      <dt className="t-label2 p-muted">기술</dt>
                      <dd className="t-body1">{active.stack}</dd>
                    </div>
                  </dl>
                  {active.link ? (
                    <a
                      href={active.link}
                      className="c-btn c-btn--primary p-detail__link"
                      target={/^https?:\/\//.test(active.link) ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      자세히 보기 <Icon.ArrowRight />
                    </a>
                  ) : null}
                </div>
              </div>

              <ol aria-label="이 폴더의 프로젝트" className="p-steps">
                {items.map((p, i) => (
                  <li key={`${p.title}-${p.year}-${i}`}>
                    <button
                      type="button"
                      aria-current={i === current ? "true" : undefined}
                      className={cx("p-step", i === current && "is-current")}
                      onClick={() => focus(i)}
                    >
                      <span className="c-progress" aria-hidden="true">
                        <span
                          style={{
                            width: `${i < current ? 100 : i === current ? Math.min(100, (elapsed / AUTOPLAY_MS) * 100) : 0}%`,
                            background: group.colors.ink,
                          }}
                        />
                      </span>
                      <span className="t-label2">{p.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </>
        ) : (
          <div className="l-container">
            <p className="p-empty t-body2">
              {keyword
                ? "이 폴더에는 그 키워드의 프로젝트가 아직 없어요."
                : "이 폴더에는 아직 프로젝트가 없어요."}
            </p>
          </div>
        )}
      </section>
      <div className="p-bottom-space" />
    </>
  );
}

function Header({ mode, onMode }: { mode: Mode; onMode: (m: Mode) => void }) {
  return (
    <section className="l-container p-head">
      <div className="p-head__text">
        <h1 className="t-title1">Project</h1>
        <p className="t-body2">만든 것과 받은 상을 종류별 폴더에 모아 두었어요.</p>
      </div>
      <SegmentedControl
        label="묶는 기준"
        options={[
          { value: "type", label: "종류별" },
          { value: "year", label: "연도별" },
        ]}
        value={mode}
        onChange={(v) => onMode(v as Mode)}
      />
    </section>
  );
}
