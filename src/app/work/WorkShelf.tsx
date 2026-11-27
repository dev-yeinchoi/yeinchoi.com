"use client";

import { type CSSProperties, type PointerEvent, useEffect, useRef, useState, type WheelEvent } from "react";
import { Chip, Icon, IconButton, StatusText } from "@/components/ui";
import { WORK_ORDER, type WorkItem, type WorkType, work } from "@/content/work";
import { CATEGORIES, hueColors } from "@/lib/categories";

/** 책장에 꽂힌 순서: 종류별로 모으고, 같은 종류 안에서는 시간순 */
const BOOKS: WorkItem[] = WORK_ORDER.flatMap((type) =>
  work.filter((w) => w.type === type).sort((a, b) => a.start - b.start),
);

/** 펼친 표지 너비 */
const COVER = 190;
const GAP = 4;
const OPEN_GAP = 44;
const HEIGHTS = [250, 268, 240, 276, 258, 246];
const AUTOPLAY_MS = 3500;
/** 이만큼 끌면 한 권 넘어가요 */
const DRAG_STEP = 70;

const months = (w: WorkItem) => Math.max(1, Math.round((w.end - w.start) * 12));
/** 오래 한 활동일수록 두꺼운 책 */
const thickness = (w: WorkItem) => Math.round(Math.min(112, 26 + months(w) * 3.2));

function typeInfo(type: WorkType) {
  const { label, hue } = CATEGORIES[type];
  const { ink, tint } = hueColors(hue);
  return { label, ink, tint };
}

/** 책등 세 가지 모양: 진한 색 · 연한 색 · 흰색 */
function spineColors(index: number, ink: string, tint: string) {
  const style = index % 3;
  if (style === 0) return { background: ink, color: "#FFFFFF" };
  if (style === 1) return { background: tint, color: ink };
  return { background: "#FFFFFF", color: ink };
}

const yy = (w: WorkItem) => `'${String(Math.floor(w.start)).slice(2)}`;

export function WorkShelf() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);
  const lastWheel = useRef(0);

  const go = (i: number) => {
    const n = BOOKS.length;
    const next = ((i % n) + n) % n;
    setActive(next);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // 마우스를 올리거나 끄는 중이 아니면 한 권씩 차례로 펼쳐요
  useEffect(() => {
    if (reduceMotion || hover || dragging) return;
    const timer = setInterval(() => go(active + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  });

  // 고른 책이 가운데 오도록 줄 전체를 옮겨요
  let offset = 0;
  BOOKS.forEach((w, k) => {
    const slot = k === active ? COVER : thickness(w);
    if (k < active) offset += slot + GAP;
    if (k === active) offset += OPEN_GAP + slot / 2;
  });

  const current = BOOKS[active];
  const currentType = typeInfo(current.type);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
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
    setDragging(false);
    setDragX(0);
    go(active + Math.round(-dragX / DRAG_STEP));
  };
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) < 12 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now - lastWheel.current < 420) return;
    lastWheel.current = now;
    go(active + (e.deltaX > 0 ? 1 : -1));
  };

  return (
    <>
      <section className="l-container w-head">
        <div className="w-head__text">
          <h1 className="t-title1">Work</h1>
          <p className="t-body2">한 활동이 책 한 권이에요. 오래 한 일일수록 책이 두꺼워요.</p>
        </div>
        <div className="w-chips" role="group" aria-label="활동 종류로 이동">
          {WORK_ORDER.map((type) => {
            const info = typeInfo(type);
            const count = BOOKS.filter((w) => w.type === type).length;
            if (count === 0) return null;
            return (
              <Chip
                key={type}
                dot={info.ink}
                count={count}
                selected={current.type === type}
                onClick={() => go(BOOKS.findIndex((w) => w.type === type))}
              >
                {info.label}
              </Chip>
            );
          })}
        </div>
      </section>

      <section
        className="w-shelf"
        aria-roledescription="carousel"
        aria-label="활동 책장"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div
          className="w-stage"
          data-dragging={dragging}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          <div className="w-track" style={{ transform: `translateX(${Math.round(-offset + dragX)}px)` }}>
            {BOOKS.map((w, k) => {
              const on = k === active;
              const info = typeInfo(w.type);
              const thick = thickness(w);
              const slot = on ? COVER : thick;
              const groupStart = k === 0 || BOOKS[k - 1].type !== w.type;
              const wrapStyle: CSSProperties = {
                width: slot,
                height: HEIGHTS[k % HEIGHTS.length],
                margin: `0 ${on ? OPEN_GAP : 0}px`,
              };
              return (
                <div className="w-slot" key={`${w.type}-${w.short}-${w.start}`}>
                  <div className="w-book-wrap" style={wrapStyle}>
                    <button
                      type="button"
                      className="w-book"
                      aria-pressed={on}
                      aria-label={`${w.title}, ${info.label}, ${w.period}, ${months(w)}개월`}
                      onClick={() => {
                        if (!justDragged.current) go(k);
                      }}
                      style={{
                        width: thick,
                        marginLeft: -thick / 2,
                        transform: `rotateY(${on ? -90 : 0}deg)`,
                      }}
                    >
                      <span
                        className="w-spine"
                        style={{
                          ...spineColors(k, info.ink, info.tint),
                          transform: `translateZ(${COVER / 2}px)`,
                        }}
                      >
                        <span className="w-spine__year" aria-hidden="true">
                          {yy(w)}
                        </span>
                        <span className="w-spine__title" style={{ fontSize: thick < 36 ? 11 : 14 }}>
                          {w.short}
                        </span>
                        <span className="w-spine__mark" aria-hidden="true">
                          {w.city.replace(/^\[/, "").charAt(0)}
                        </span>
                      </span>
                      <span
                        className="w-cover"
                        aria-hidden="true"
                        style={{
                          left: (thick - COVER) / 2,
                          width: COVER,
                          background: info.tint,
                          transform: `rotateY(90deg) translateZ(${thick / 2}px)`,
                        }}
                      >
                        <span className="w-cover__type">{info.label}</span>
                        <span className="w-cover__title" style={{ color: info.ink }}>
                          {w.short}
                        </span>
                        <span className="w-stamp" style={{ color: info.ink }}>
                          {w.city}
                          <small>{yy(w)}</small>
                        </span>
                        <span className="w-cover__period">{w.period}</span>
                      </span>
                    </button>
                  </div>
                  <span className="w-shadow" aria-hidden="true" style={{ width: slot + 30 }} />
                  {groupStart ? (
                    <span className="w-group" aria-hidden="true" style={{ color: info.ink }}>
                      {info.label}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="l-container w-detail">
          <div className="w-detail__side">
            <span className="t-label2" style={{ color: currentType.ink }}>
              {currentType.label}
            </span>
            <span className="t-label1">{current.org}</span>
          </div>

          <div className="w-detail__main" aria-live="polite">
            <h2 key={`t-${active}`} className="t-title3 w-pop">
              {current.title}
            </h2>
            <p key={`d-${active}`} className="t-body1r w-pop w-pop--late">
              {current.desc}
            </p>
            <div className="w-controls">
              <IconButton label="이전 활동" icon={<Icon.ChevronLeft />} onClick={() => go(active - 1)} />
              <div className="w-ticks" aria-hidden="true">
                {BOOKS.map((w, k) => (
                  <span key={`${w.type}-${w.start}`} className="w-tick" data-on={k === active} />
                ))}
              </div>
              <IconButton
                label="다음 활동"
                icon={<Icon.ChevronRight />}
                solid
                onClick={() => go(active + 1)}
              />
            </div>
            <StatusText>
              {reduceMotion
                ? `${active + 1} / ${BOOKS.length} · 책을 누르면 펼쳐져요`
                : hover
                  ? "끌거나 옆으로 스크롤 · 책을 누르면 펼쳐져요"
                  : "한 권씩 차례로 펼치는 중"}
            </StatusText>
          </div>

          <div className="w-detail__side w-detail__side--end">
            <span className="t-label2 num" style={{ color: "var(--label-neutral)" }}>
              {current.period}
            </span>
            <span className="t-label1">
              {months(current)}개월 · {current.city}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
