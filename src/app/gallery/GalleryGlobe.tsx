"use client";

import type { GlobeInstance } from "globe.gl";
import { useEffect, useRef, useState } from "react";
import { Chip, Icon, IconButton, StatusText } from "@/components/ui";
import { type Place, places } from "@/content/gallery";

const AUTOPLAY_MS = 4500;

/** 지구 색: 시안 그림과 같은 바다 파랑, 땅 초록, 극지방 흰색 */
const LAND = "#95D5AA";
const LAND_SIDE = "rgba(80, 150, 110, 0.6)";
const ICE = "#EEF2FA";
/** Natural Earth 나라 번호: 남극(010), 그린란드(304)는 흰색으로 */
const ICE_IDS = new Set(["010", "304"]);

/** 바다는 위아래가 조금 밝은 세로 그라데이션. 이미지 대신 그때그때 그려서 흐려지지 않아요. */
function oceanTexture(): string {
  const c = document.createElement("canvas");
  c.width = 8;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const grad = ctx.createLinearGradient(0, 0, 0, c.height);
  grad.addColorStop(0, "#4470C9");
  grad.addColorStop(0.5, "#2346A8");
  grad.addColorStop(1, "#4470C9");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);
  return c.toDataURL("image/png");
}

const tint = (p: Place) => `var(--${p.hue}-90)`;

export function GalleryGlobe() {
  const globeEl = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeInstance | null>(null);
  const pins = useRef<HTMLButtonElement[]>([]);
  const reduceMotion = useRef(false);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  /** 장소 카드가 바뀔 때마다 애니메이션을 다시 틀기 위한 키 */
  const [cardKey, setCardKey] = useState(0);

  // Gallery는 어두운 화면이에요. 이 페이지에 있는 동안만 GNB·푸터까지 다크 모드로 바꿔요.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.dataset.theme;
    html.dataset.theme = "dark";
    return () => {
      if (prev) html.dataset.theme = prev;
      else delete html.dataset.theme;
    };
  }, []);

  const flyTo = (i: number, ms?: number) => {
    const g = globe.current;
    const p = places[i];
    if (!g || !p) return;
    const alt = g.pointOfView().altitude;
    g.pointOfView(
      { lat: p.lat - 4, lng: p.lng, altitude: Math.min(Math.max(alt, 1.2), 2.4) },
      ms ?? (reduceMotion.current ? 0 : 1400),
    );
  };

  const pick = (i: number) => {
    setActive(i);
    setCardKey((k) => k + 1);
    flyTo(i);
  };

  // 지구본은 브라우저에서만 불러와요 (three.js)
  // biome-ignore lint/correctness/useExhaustiveDependencies: 지구본은 처음 한 번만 만들어요
  useEffect(() => {
    const el = globeEl.current;
    if (!el) return;
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let ro: ResizeObserver | undefined;

    Promise.all([import("globe.gl"), import("topojson-client"), import("world-atlas/countries-50m.json")])
      .then(([{ default: Globe }, topojson, atlas]) => {
        if (disposed) return;
        // biome-ignore lint/suspicious/noExplicitAny: world-atlas JSON에는 타입이 없어요
        const world = (atlas as any).default ?? atlas;
        const countries = topojson.feature(world, world.objects.countries) as unknown as {
          features: Array<{ id?: string }>;
        };
        const g = new Globe(el, { rendererConfig: { antialias: true, alpha: true } })
          .backgroundColor("rgba(0,0,0,0)")
          .globeImageUrl(oceanTexture())
          .polygonsData(countries.features)
          .polygonCapColor((f) => (ICE_IDS.has(String((f as { id?: string }).id)) ? ICE : LAND))
          .polygonSideColor(() => LAND_SIDE)
          .polygonStrokeColor(() => false)
          .polygonAltitude(0.004)
          .showAtmosphere(true)
          .atmosphereColor("#7FA8FF")
          .atmosphereAltitude(0.22)
          .htmlElementsData(places)
          .htmlLat("lat")
          .htmlLng("lng")
          .htmlAltitude(0.01)
          .htmlElement((d) => {
            const p = d as Place;
            const i = places.indexOf(p);
            const pin = document.createElement("button");
            pin.type = "button";
            pin.className = "g-pin";
            pin.dataset.on = String(i === 0);
            pin.setAttribute("aria-label", `${p.name}, ${p.country}`);
            const ring = document.createElement("span");
            ring.className = "g-pin__ring";
            ring.style.background = tint(p);
            ring.textContent = p.work ? "💼" : "📷";
            const stem = document.createElement("span");
            stem.className = "g-pin__stem";
            pin.append(ring, stem);
            pin.addEventListener("click", (e) => {
              e.stopPropagation();
              pick(i);
            });
            pins.current[i] = pin;
            return pin;
          });

        // 레티나 화면에서도 또렷하게
        g.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const size = () => {
          g.width(el.clientWidth);
          g.height(el.clientHeight);
        };
        size();
        ro = new ResizeObserver(size);
        ro.observe(el);

        const c = g.controls();
        c.autoRotate = !reduceMotion.current;
        c.autoRotateSpeed = 0.35;
        c.enableDamping = true;
        c.minDistance = 130;
        c.maxDistance = 600;

        globe.current = g;
        const first = places[0];
        g.pointOfView(first ? { lat: first.lat, lng: first.lng, altitude: 2.2 } : { altitude: 2.4 }, 0);
        setStatus("ready");
      })
      .catch(() => {
        if (!disposed) setStatus("failed");
      });

    return () => {
      disposed = true;
      ro?.disconnect();
      globe.current?._destructor();
      globe.current = null;
      el.replaceChildren();
    };
  }, []);

  // 고른 장소의 핀을 크게, 초록 테두리로
  useEffect(() => {
    pins.current.forEach((pin, i) => {
      if (pin) pin.dataset.on = String(i === active);
    });
  }, [active]);

  // 마우스를 올리지 않으면 장소를 차례로 돌아봐요
  // biome-ignore lint/correctness/useExhaustiveDependencies: active가 바뀔 때마다 타이머를 새로 걸어요
  useEffect(() => {
    if (status !== "ready" || hover || reduceMotion.current || places.length < 2) return;
    const timer = setTimeout(() => pick((active + 1) % places.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [status, hover, active]);

  const zoom = (factor: number) => {
    const g = globe.current;
    if (!g) return;
    const v = g.pointOfView();
    g.pointOfView({ ...v, altitude: Math.min(5, Math.max(0.25, v.altitude * factor)) }, 500);
  };

  const reset = () => {
    const g = globe.current;
    if (!g) return;
    g.pointOfView({ ...g.pointOfView(), altitude: 2.6 }, 800);
  };

  const cur = places[active];

  return (
    <section className="g-stage" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <div aria-hidden="true" className="g-stars" />

      <div className="g-intro">
        <h1 className="t-title1">Gallery</h1>
        <p className="t-body2">
          카메라를 들었던 곳들이에요. 지구본을 끌어서 돌리고, 스크롤해서 확대해 보세요. 💼 표시는 일하러 갔던
          곳이에요.
        </p>
        {status !== "ready" ? (
          <StatusText live>
            {status === "failed" ? "지구본을 불러오지 못했어요. 새로고침해 주세요." : "지구본을 불러오는 중…"}
          </StatusText>
        ) : null}
        {places.length === 0 ? <StatusText>아직 올린 사진이 없어요.</StatusText> : null}
      </div>

      <div className="g-globe-wrap">
        <div
          ref={globeEl}
          className="g-globe"
          role="img"
          aria-label="사진을 찍은 장소가 표시된 지구본. 끌어서 돌리고, 스크롤해서 확대할 수 있어요."
        />
        <div className="g-zoom">
          <IconButton label="확대" icon={<Icon.Plus />} onClick={() => zoom(0.7)} />
          <IconButton label="축소" icon={<Icon.Minus />} onClick={() => zoom(1.4)} />
          <IconButton label="지구 전체 보기" icon={<Icon.Target />} onClick={reset} />
        </div>
      </div>

      {cur ? (
        <>
          <article key={cardKey} className="c-card g-card" aria-live="polite">
            <div className="c-thumb g-card__photo" style={{ background: tint(cur) }}>
              {cur.photo ? <img src={cur.photo} alt={`${cur.name} 사진`} /> : `[${cur.name} 사진]`}
            </div>
            <div className="g-card__head">
              <span className="t-heading1 g-card__name">{cur.name}</span>
              <span className="t-caption1 num g-card__date">{cur.date}</span>
            </div>
            <div className="g-card__meta">
              <span className="t-label1">
                {cur.country} · 사진 {cur.count}장
              </span>
              {cur.work ? <span className="c-badge c-badge--primary">일했던 곳</span> : null}
            </div>
          </article>

          <div role="group" aria-label="장소" className="g-chips">
            {places.map((p, i) => (
              <Chip key={`${p.name}-${p.lat}-${p.lng}`} small selected={i === active} onClick={() => pick(i)}>
                {p.name}
              </Chip>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
