"use client";

import { type ReactNode, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Chip,
  Footer,
  Gnb,
  Icon,
  IconButton,
  PageTitle,
  Progress,
  ProgressSteps,
  SegmentedControl,
  StatusText,
  Tabs,
  Thumbnail,
} from "@/components/ui";
import { CATEGORIES, type Category, hueColors } from "@/lib/categories";

/* ---------------- data ---------------- */

const SEMANTIC: Array<[string, Array<[string, string]>]> = [
  [
    "글자",
    [
      ["--label-strong", "가장 강한 글자"],
      ["--label-normal", "본문·제목"],
      ["--label-neutral", "긴 본문"],
      ["--label-alt", "보조 설명"],
      ["--label-assist", "힌트·비활성 라벨"],
      ["--label-disable", "비활성"],
    ],
  ],
  [
    "배경·선",
    [
      ["--bg", "기본 배경"],
      ["--bg-alt", "구역 배경"],
      ["--bg-elevated", "카드·떠 있는 면"],
      ["--fill", "약한 채움(assist 버튼)"],
      ["--line", "테두리"],
      ["--line-alt", "구분선"],
    ],
  ],
  [
    "포인트·상태",
    [
      ["--primary", "주요 버튼·링크·선택"],
      ["--primary-text", "초록 글자(링크·배지)"],
      ["--on-primary", "primary 위 글자"],
      ["--primary-strong", "hover"],
      ["--primary-weak", "선택 배경·배지"],
      ["--inverse-bg", "선택된 칩·진한 버튼"],
      ["--positive", "성공"],
      ["--cautionary", "주의"],
      ["--negative", "오류"],
    ],
  ],
];

const HUES: Array<[string, string]> = [
  ["Blue", "blue"],
  ["Violet", "violet"],
  ["Green", "green"],
  ["Red Orange", "redorange"],
  ["Orange", "orange"],
  ["Light Blue", "lightblue"],
  ["Pink", "pink"],
  ["Red", "red"],
];
const STEPS = [95, 90, 80, 70, 60, 50, 40, 30];
const COOL = [99, 97, 95, 90, 80, 70, 50, 30, 10];

const TYPE: Array<[string, string, string]> = [
  ["t-display1", "56px · 72px · -3.19% · 700", "쓰지 않음(예약)"],
  ["t-display2", "40px · 52px · -2.82% · 700", "쓰지 않음(예약)"],
  ["t-display3", "36px · 48px · -2.7% · 700", "이 문서 제목"],
  ["t-title1", "32px · 44px · -2.53% · 700", "페이지 제목 (Project, Work, Blog, Gallery)"],
  ["t-title2", "28px · 38px · -2.36% · 700", "Home 인사, About 이름, 이 문서 섹션"],
  ["t-title3", "24px · 32px · -2.3% · 700", "Work 활동 이름, 글 제목"],
  ["t-heading1", "22px · 30px · -1.94% · 600", "카드 제목, 장소 이름"],
  ["t-heading2", "20px · 28px · -1.2% · 600", "컴포넌트 이름"],
  ["t-headline1", "18px · 26px · -0.02% · 600", "목록 제목, 강조 문장"],
  ["t-headline2", "17px · 24px · 0% · 600", "작은 카드 제목"],
  ["t-body1", "16px · 24px · 0.57% · 400", "기본 본문"],
  ["t-body1r", "16px · 26px · 0.57% · 400", "긴 본문 (행간 넓게)"],
  ["t-body2", "15px · 22px · 0.96% · 400", "페이지 설명, 카드 설명"],
  ["t-body2r", "15px · 24px · 0.96% · 400", "블로그 요약"],
  ["t-label1", "14px · 20px · 1.45% · 500", "버튼, 칩, 메타 정보"],
  ["t-label2", "13px · 18px · 1.94% · 500", "보조 라벨, 카테고리 이름"],
  ["t-caption1", "12px · 16px · 2.52% · 500", "날짜, 배지, 상태 문구"],
  ["t-caption2", "11px · 14px · 3.11% · 500", "아주 작은 주석"],
];

const RADII: Array<[string, string, string]> = [
  ["--r-xs", "4px", "4 · 배지 안쪽"],
  ["--r-sm", "6px", "6 · 배지"],
  ["--r-md", "8px", "8 · 작은 버튼, 세그먼트 버튼"],
  ["--r-btn", "10px", "10 · 버튼, 칩"],
  ["--r-lg", "12px", "12 · 큰 버튼, 썸네일"],
  ["--r-xl", "16px", "16 · 카드"],
  ["--r-2xl", "20px", "20 · 큰 카드, 폴더"],
  ["--r-full", "999px", "full · 아이콘 버튼, 점"],
];

const SPACES: Array<[number, string]> = [
  [4, "아이콘-글자"],
  [8, "칩 사이"],
  [12, "카드 안 요소"],
  [16, "카드 안쪽 여백"],
  [20, "목록 행 사이"],
  [24, "화면 좌우 여백"],
  [32, "블록 사이"],
  [40, "GNB 좌우"],
  [56, "제목 위"],
  [80, "섹션 사이"],
];

const SHADOWS: Array<[string, string]> = [
  ["--shadow-xs", "눌린 세그먼트"],
  ["--shadow-sm", "카드 기본"],
  ["--shadow-md", "떠 있는 바·hover 카드"],
  ["--shadow-lg", "모달·포커스 카드"],
];

const WORK_CHIPS: Array<[Category, number]> = [
  ["ta", 3],
  ["instructor", 4],
  ["volunteer", 4],
  ["club", 2],
  ["parttime", 2],
];
const KEYWORDS = ["AI", "Web", "Data", "Research", "Design"];
const BLOG_TABS = [
  { value: "all", label: "전체", count: 24 },
  { value: "dev", label: "개발", count: 9 },
  { value: "retro", label: "회고", count: 6 },
  { value: "travel", label: "여행", count: 5 },
  { value: "daily", label: "일상", count: 4 },
] as const;

const PAGES: Array<[string, string, string]> = [
  ["Home", "GNB overlay, Button assist·inverse·text, Card, Status", "3D 캐릭터 장면"],
  ["About", "GNB, Segmented(언어), Button primary lg, Footer", "프로필 사이드바, 이력 타임라인"],
  [
    "Project",
    "GNB, Page heading, Segmented, Chip sm, Icon button, Progress, Card, Badge, Button primary",
    "폴더 묶음 + 카드 캐러셀",
  ],
  ["Work", "GNB, Page heading, Chip(점·개수), Icon button, Status", "책장 (책 두께 = 기간)"],
  ["Blog", "GNB, Page heading, Tabs, Segmented(정렬), Badge primary", "대표 글 + 카테고리 목록"],
  ["Blog 글", "GNB, Button outline lg, Progress(읽기 바)", "위쪽 읽기 바 + 펼치는 목차"],
  ["Gallery", "GNB(다크), Page heading, Icon button, Chip sm, Card, Badge, Thumbnail", "지구본"],
];

const NAV: Array<[string, Array<[string, string]>]> = [
  [
    "Foundations",
    [
      ["principles", "원칙"],
      ["color", "색"],
      ["type", "타이포그래피"],
      ["shape", "모서리·간격·그림자"],
      ["motion", "모션"],
    ],
  ],
  [
    "Components",
    [
      ["gnb", "GNB"],
      ["footer", "Footer"],
      ["page-heading", "Page heading"],
      ["button", "Button"],
      ["icon-button", "Icon button"],
      ["chip", "Chip"],
      ["segmented", "Segmented"],
      ["tabs", "Tabs"],
      ["badge", "Badge"],
      ["card", "Card · Thumbnail"],
      ["progress", "Progress"],
      ["status", "Status text"],
      ["pages", "페이지별 정리"],
    ],
  ],
];

/* ---------------- helpers ---------------- */

function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="ds-sec" id={id}>
      <p className="c-eyebrow">{eyebrow}</p>
      <h2 className="t-title2" style={{ margin: "4px 0 8px" }}>
        {title}
      </h2>
      <p className="t-body1r ds-sec__desc">{desc}</p>
      {children}
    </section>
  );
}

function Comp({
  id,
  name,
  desc,
  used,
  spec,
  children,
}: {
  id: string;
  name: string;
  desc: ReactNode;
  used: string[];
  spec: Array<[ReactNode, ReactNode]>;
  children: ReactNode;
}) {
  return (
    <article className="ds-comp" id={id}>
      <div className="ds-comp__head">
        <h3 className="t-heading2">{name}</h3>
        <p className="t-body2 ds-muted">{desc}</p>
        <div className="ds-used">
          <span className="t-caption1" style={{ color: "var(--label-assist)" }}>
            쓰는 곳
          </span>
          {used.map((u) => (
            <Badge key={u}>{u}</Badge>
          ))}
        </div>
      </div>
      <div className="ds-demo">{children}</div>
      <table className="ds-spec">
        <tbody>
          {spec.map(([k, v], i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 고정된 표
            <tr key={i}>
              <td>{k}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

const Caption = ({ children }: { children: ReactNode }) => (
  <span className="t-caption1 ds-muted">{children}</span>
);

/* ---------------- page ---------------- */

export function DesignSystemDoc() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [chip, setChip] = useState<Category>("ta");
  const [kw, setKw] = useState<Record<string, boolean>>({ AI: true });
  const [view, setView] = useState<"kind" | "year">("kind");
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [tab, setTab] = useState<(typeof BLOG_TABS)[number]["value"]>("all");
  const [pct, setPct] = useState(40);
  const [slide, setSlide] = useState(1);

  return (
    <div className="ds-root" data-theme={theme === "dark" ? "dark" : undefined}>
      <div className="ds-wrap">
        <nav className="ds-nav" aria-label="디자인 시스템 목차">
          <div className="ds-nav__in">
            {NAV.map(([group, items]) => (
              <div key={group} style={{ display: "contents" }}>
                <span className="t-caption1 ds-nav__g">{group}</span>
                {items.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="ds-main">
          <div className="ds-hero">
            <div>
              <p className="c-eyebrow">yeinchoi.com · v1.0</p>
              <h1 className="t-display3" style={{ margin: "4px 0 12px" }}>
                Design System
              </h1>
              <p className="t-body1r" style={{ maxWidth: 640, color: "var(--label-neutral)" }}>
                Wanted Design System(Montage)을 바탕으로 개인 사이트 여섯 화면에 공통으로 쓰는 색, 글자, 모양,
                움직임, 컴포넌트를 정리했어요. 오른쪽에서 다크 모드로 바꿔 볼 수 있어요.
              </p>
            </div>
            <SegmentedControl
              label="테마"
              options={[
                { value: "light", label: "라이트" },
                { value: "dark", label: "다크" },
              ]}
              value={theme}
              onChange={setTheme}
            />
          </div>

          {/* ---------- Principles ---------- */}
          <Section
            id="principles"
            eyebrow="Principles"
            title="원칙"
            desc="여섯 화면이 한 사이트처럼 보이도록 지키는 세 가지 약속이에요."
          >
            <div className="ds-grid3">
              <Card variant="line" className="ds-pad">
                <span className="t-headline1">글꼴은 하나</span>
                <p className="t-body2 ds-muted" style={{ marginTop: 6 }}>
                  모든 화면을 Pretendard로 써요. 크기와 굵기는 아래 16단계 타입 스케일에서만 골라요.
                </p>
              </Card>
              <Card variant="line" className="ds-pad">
                <span className="t-headline1">색은 이름으로</span>
                <p className="t-body2 ds-muted" style={{ marginTop: 6 }}>
                  hex 값 대신 <code>--label-normal</code>, <code>--bg-alt</code> 같은 의미 토큰을 써요. 그래야
                  다크 모드가 저절로 맞춰져요.
                </p>
              </Card>
              <Card variant="line" className="ds-pad">
                <span className="t-headline1">포인트는 초록 하나</span>
                <p className="t-body2 ds-muted" style={{ marginTop: 6 }}>
                  버튼·링크·선택 상태는 <code>--primary</code> 초록만 써요. 그 밖의 색은 종류를 구분하는
                  카테고리 색으로만 써요.
                </p>
              </Card>
            </div>
          </Section>

          {/* ---------- Color ---------- */}
          <Section
            id="color"
            eyebrow="Foundations · Color"
            title="색"
            desc="의미 토큰은 라이트와 다크에서 값이 바뀌어요. 메인 색(primary)은 맑고 차가운 에메랄드 초록(#00A67E)이에요. 작은 글자(링크·배지·eyebrow)에는 흰 바탕에서 잘 읽히도록 한 톤 진한 --primary-text(#00805F)를 써요. 다크에서는 밝은 에메랄드(#34D3A6)에 어두운 글자를 써요. 원자 팔레트와 카테고리 색은 두 모드에서 같아요."
          >
            {SEMANTIC.map(([group, toks]) => (
              <div key={group}>
                <h3 className="t-headline1 ds-h3">{group}</h3>
                <div className="ds-toks">
                  {toks.map(([name, use]) => (
                    <div className="ds-tok" key={name}>
                      <span className="ds-tok__sw" style={{ background: `var(${name})` }} />
                      <code>{name}</code>
                      <Caption>{use}</Caption>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h3 className="t-headline1 ds-h3" style={{ marginTop: 40 }}>
              원자 팔레트 (Wanted Atomic)
            </h3>
            <div className="ds-pal">
              <div className="ds-pal__row">
                <span />
                {STEPS.map((s) => (
                  <span key={s} className="t-caption2 ds-pal__h">
                    {s}
                  </span>
                ))}
              </div>
              {HUES.map(([label, key]) => (
                <div className="ds-pal__row" key={key}>
                  <span className="t-label2" style={{ fontWeight: 600 }}>
                    {label}
                  </span>
                  {STEPS.map((s) => (
                    <span
                      key={s}
                      className="ds-pal__c"
                      title={`--${key}-${s}`}
                      style={{
                        background: `var(--${key}-${s})`,
                        color: s >= 60 ? "#171719" : "#FFFFFF",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ))}
              <div className="ds-pal__row ds-pal__row--cool">
                <span className="t-label2" style={{ fontWeight: 600 }}>
                  Cool Neutral
                </span>
                {COOL.map((s) => (
                  <span
                    key={s}
                    className="ds-pal__c"
                    title={`--cool-${s}`}
                    style={{
                      background: `var(--cool-${s})`,
                      color: s >= 70 ? "#171719" : "#FFFFFF",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="t-headline1 ds-h3" style={{ marginTop: 40 }}>
              카테고리 색
            </h3>
            <div className="ds-cats">
              {(Object.keys(CATEGORIES) as Category[]).map((key) => {
                const c = CATEGORIES[key];
                const col = hueColors(c.hue);
                return (
                  <div className="ds-cat" key={key}>
                    <span className="t-caption1 ds-cat__grp">{c.group}</span>
                    <span className="ds-cat__chip" style={{ background: col.tint, color: col.ink }}>
                      <span className="c-chip__dot" style={{ background: col.ink }} />
                      {c.label}
                    </span>
                    <span className="ds-cat__sw" style={{ background: col.surface }} title="90 표지" />
                    <span className="ds-cat__sw" style={{ background: col.ink }} title="글자·점" />
                    <code>{col.ink.replace(/var\(--|\)/g, "")} / 90 / 95</code>
                  </div>
                );
              })}
            </div>
            <p className="t-label1 ds-muted" style={{ marginTop: 16 }}>
              규칙: 점·글자는 50(주황·초록·하늘색 계열은 흰 바탕 대비를 위해 40), 책·폴더 같은 넓은 면은 90,
              연한 배경은 95를 써요. 같은 개념은 페이지가 달라도 같은 색이에요(예: TA와 개인 연구는 모두
              Blue). 코드에서는 <code>hueColors()</code>와 <code>CATEGORIES</code>
              (src/lib/categories.ts)를 써요.
            </p>
          </Section>

          {/* ---------- Type ---------- */}
          <Section
            id="type"
            eyebrow="Foundations · Typography"
            title="타이포그래피"
            desc="Pretendard, 원티드 타입 스케일 16단계(+긴 본문용 행간 2개). 크기 · 행간 · 자간 · 기본 굵기 순서예요."
          >
            {TYPE.map(([cls, meta, use]) => (
              <div className="ds-type" key={cls}>
                <div className="ds-type__meta">
                  <code>.{cls}</code>
                  <Caption>{meta}</Caption>
                </div>
                <div className={`${cls} ds-type__sample`}>예인의 기록 Aa 123</div>
                <span className="t-caption1 ds-muted ds-type__use">{use}</span>
              </div>
            ))}
          </Section>

          {/* ---------- Shape ---------- */}
          <Section
            id="shape"
            eyebrow="Foundations · Shape"
            title="모서리 · 간격 · 그림자"
            desc="모서리는 요소가 클수록 둥글게, 간격은 4의 배수로 맞춰요."
          >
            <h3 className="t-headline1 ds-h3">모서리</h3>
            <div className="ds-rads">
              {RADII.map(([name, v, use]) => (
                <div className="ds-rad" key={name}>
                  <span className="ds-rad__box" style={{ borderRadius: v }} />
                  <code>{name}</code>
                  <Caption>{use}</Caption>
                </div>
              ))}
            </div>
            <div className="ds-grid2" style={{ marginTop: 40 }}>
              <div>
                <h3 className="t-headline1 ds-h3">간격 (4의 배수)</h3>
                {SPACES.map(([n, use]) => (
                  <div className="ds-sp" key={n}>
                    <span className="ds-sp__bar" style={{ width: n }} />
                    <code>--space-{n}</code>
                    <Caption>{use}</Caption>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="t-headline1 ds-h3">그림자</h3>
                <div className="ds-shs">
                  {SHADOWS.map(([name, use]) => (
                    <div className="ds-sh" key={name}>
                      <span className="ds-sh__box" style={{ boxShadow: `var(${name})` }} />
                      <code>{name}</code>
                      <Caption>{use}</Caption>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ---------- Motion ---------- */}
          <Section
            id="motion"
            eyebrow="Foundations · Motion"
            title="모션"
            desc="색은 부드럽게, 위치는 살짝 튀게 움직여요."
          >
            <div className="ds-grid2">
              <table className="ds-spec ds-spec--3">
                <tbody>
                  {[
                    ["--ease", "cubic-bezier(.2,.8,.2,1)", "색·배경 전환"],
                    ["--ease-spring", "cubic-bezier(.34,1.3,.64,1)", "살짝 튀는 움직임 (hover, 등장)"],
                    ["--dur-fast", "160ms", "hover 색 변화"],
                    ["--dur", "240ms", "기본 전환"],
                    ["--dur-slow", "420ms", "카드 등장, 책 펼침"],
                  ].map(([a, b, c]) => (
                    <tr key={a}>
                      <td>
                        <code>{a}</code>
                      </td>
                      <td>
                        <code>{b}</code>
                      </td>
                      <td>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ds-motion">
                <button type="button" className="ds-motion__b ds-motion__b--ease">
                  ease
                </button>
                <button type="button" className="ds-motion__b ds-motion__b--spring">
                  spring
                </button>
                <Caption>
                  마우스를 올려 보세요. 움직임을 줄이기 설정을 켠 사람에게는 모든 애니메이션이 꺼져요.
                </Caption>
              </div>
            </div>
          </Section>

          {/* ---------- Components ---------- */}
          <Section
            id="components"
            eyebrow="Components"
            title="컴포넌트"
            desc={
              <>
                여섯 화면에서 두 번 이상 나오는 UI를 골라 이름을 붙였어요. 예시는 실제로 눌러볼 수 있어요.
                모두 <code>@/components/ui</code>에서 가져다 써요.
              </>
            }
          >
            <Comp
              id="gnb"
              name="GNB (상단 메뉴)"
              desc="로고와 다섯 메뉴. 지금 페이지는 굵은 글자와 밑줄로 표시해요. Home에서는 배경 없는 overlay 형태를 써요."
              used={["전체 페이지"]}
              spec={[
                [<code key="a">{"<Gnb />"}</code>, "기본 (배경 + 아래 구분선, 위에 붙어 있음)"],
                [<code key="b">{"<Gnb overlay />"}</code>, "3D 장면 위에 겹칠 때 (Home에서는 자동)"],
                [<code key="c">[aria-current=page]</code>, "지금 페이지 (경로로 자동 표시)"],
              ]}
            >
              <div className="ds-frame">
                <Gnb static overlay={false} currentPath="/project" />
              </div>
              <div className="ds-frame ds-frame--soft">
                <Gnb static overlay currentPath="/" />
              </div>
            </Comp>

            <Comp
              id="footer"
              name="Footer"
              desc="저작권 한 줄만 두는 간단한 푸터. 연락 링크는 About과 Home 소개에 있어요."
              used={["Home 제외 전체"]}
              spec={[[<code key="a">{"<Footer />"}</code>, "Home에서는 자동으로 숨겨요"]]}
            >
              <div className="ds-frame">
                <Footer always />
              </div>
            </Comp>

            <Comp
              id="page-heading"
              name="Page heading"
              desc="각 페이지 맨 위. 영어 페이지 이름(title1) + 한국어 한 줄 설명(body2, label-alt). 위 여백 56."
              used={["Project", "Work", "Blog", "Gallery"]}
              spec={[
                [<code key="a">title</code>, "영어 페이지 이름 (h1.t-title1)"],
                [<code key="b">description</code>, "설명 한 줄 (p.t-body2)"],
                [<code key="c">eyebrow · actions</code>, "선택: 위 초록 글자 · 오른쪽 보기 전환"],
              ]}
            >
              <div style={{ marginTop: -56, marginBottom: -32 }}>
                <PageTitle
                  title="Work"
                  description="한 활동이 책 한 권이에요. 오래 한 일일수록 책이 두꺼워요."
                />
              </div>
            </Comp>

            <Comp
              id="button"
              name="Button"
              desc="높이 48 / 40 / 32 세 가지. 한 화면의 가장 중요한 행동 하나만 primary로 써요."
              used={["About", "Project", "Blog 글", "Home"]}
              spec={[
                [<code key="a">primary</code>, "주요 행동 (이력서 받기, 자세히 보기)"],
                [<code key="b">inverse</code>, "켜진 토글"],
                [<code key="c">outline</code>, "보조 이동 (목록으로)"],
                [<code key="d">assist</code>, "가벼운 행동 (Home 동작)"],
                [<code key="e">text</code>, "본문 속 링크"],
                [<code key="f">size: lg / md / sm</code>, "48px·radius 12 / 40px·radius 10 / 32px·radius 8"],
                [<code key="g">href</code>, "주면 링크로 그려져요 (내부는 next/link)"],
              ]}
            >
              <div className="ds-row">
                <Button size="lg">
                  <Icon.Download />
                  이력서 받기
                </Button>
                <Button>자세히 보기</Button>
                <Button size="sm">작게</Button>
              </div>
              <div className="ds-row">
                <Button variant="inverse">따라가는 중</Button>
                <Button variant="outline">목록으로</Button>
                <Button variant="assist">👋 인사하기</Button>
                <Button variant="text" href="#button">
                  텍스트 링크
                </Button>
                <Button disabled>비활성</Button>
              </div>
            </Comp>

            <Comp
              id="icon-button"
              name="Icon button"
              desc="둥근 40px 버튼. 앞으로 가는 쪽(다음)을 solid로 강조하고, 옆에 상태 문구를 붙여요. label은 꼭 달아요."
              used={["Project", "Work", "Gallery"]}
              spec={[
                [<code key="a">{"<IconButton label icon />"}</code>, "기본 (테두리)"],
                [<code key="b">solid</code>, "강조 (다음)"],
                [<code key="c">small</code>, "32px"],
              ]}
            >
              <div className="ds-row">
                <IconButton label="이전" icon={<Icon.ChevronLeft />} />
                <IconButton label="다음" solid icon={<Icon.ChevronRight />} />
                <IconButton label="일시정지" icon={<Icon.Pause />} />
                <IconButton label="확대" icon={<Icon.Plus />} />
                <IconButton label="축소" icon={<Icon.Minus />} />
                <IconButton label="처음으로" small icon={<Icon.Target />} />
              </div>
              <div className="ds-row">
                <IconButton
                  label="이전"
                  icon={<Icon.ChevronLeft />}
                  onClick={() => setSlide((s) => (s + 5) % 6)}
                />
                <StatusText live>{slide + 1} / 6 · 5초 뒤 다음 카드</StatusText>
                <IconButton
                  label="다음"
                  solid
                  icon={<Icon.ChevronRight />}
                  onClick={() => setSlide((s) => (s + 1) % 6)}
                />
              </div>
            </Comp>

            <Comp
              id="chip"
              name="Chip"
              desc="여러 개 중에서 고르거나 걸러 볼 때. 선택되면 진한 배경으로 뒤집혀요. 종류가 있으면 카테고리 색 점과 개수를 붙여요."
              used={["Project", "Work", "Gallery"]}
              spec={[
                [<code key="a">{"<Chip />"}</code>, "36px, radius 10"],
                [<code key="b">small</code>, "32px, radius 8 (키워드, 장소)"],
                [<code key="c">dot · count</code>, "카테고리 점 / 개수"],
                [<code key="d">selected</code>, "aria-pressed=true (다크 화면은 primary)"],
              ]}
            >
              <div className="ds-row" role="group" aria-label="활동 종류">
                {WORK_CHIPS.map(([key, n]) => (
                  <Chip
                    key={key}
                    selected={chip === key}
                    dot={hueColors(CATEGORIES[key].hue).ink}
                    count={n}
                    onClick={() => setChip(key)}
                  >
                    {CATEGORIES[key].label}
                  </Chip>
                ))}
              </div>
              <div className="ds-row" role="group" aria-label="키워드">
                {KEYWORDS.map((k) => (
                  <Chip key={k} small selected={!!kw[k]} onClick={() => setKw({ ...kw, [k]: !kw[k] })}>
                    {k}
                  </Chip>
                ))}
              </div>
            </Comp>

            <Comp
              id="segmented"
              name="Segmented control"
              desc="같은 내용을 다르게 보여주는 2~3개의 보기 전환. 칩과 달리 항상 하나만 켜져 있어요. 좌우 화살표로도 바뀌어요."
              used={["About 언어", "Project 종류/연도", "Blog 정렬"]}
              spec={[
                [<code key="a">{"<SegmentedControl />"}</code>, "회색 바탕 + 흰 버튼"],
                [<code key="b">[aria-checked=true]</code>, "선택된 보기"],
              ]}
            >
              <div className="ds-row">
                <SegmentedControl
                  label="보기"
                  options={[
                    { value: "kind", label: "종류별" },
                    { value: "year", label: "연도별" },
                  ]}
                  value={view}
                  onChange={setView}
                />
                <SegmentedControl
                  label="언어"
                  options={[
                    { value: "ko", label: "KO" },
                    { value: "en", label: "EN" },
                  ]}
                  value={lang}
                  onChange={setLang}
                />
                <SegmentedControl
                  label="정렬"
                  options={[
                    { value: "new", label: "최신순" },
                    { value: "old", label: "오래된순" },
                  ]}
                  value={sort}
                  onChange={setSort}
                />
              </div>
            </Comp>

            <Comp
              id="tabs"
              name="Tabs"
              desc="콘텐츠를 큰 묶음으로 나눌 때. 밑줄로 지금 탭을 표시하고, 개수를 옆에 작게 붙여요."
              used={["Blog"]}
              spec={[
                [<code key="a">{"<Tabs />"}</code>, "아래 구분선이 있는 줄, 좌우 화살표·Home·End로 이동"],
                [<code key="b">[aria-selected=true]</code>, "지금 탭"],
                [<code key="c">count</code>, "개수"],
              ]}
            >
              <Tabs label="글 분류" items={BLOG_TABS} value={tab} onChange={setTab} />
            </Comp>

            <Comp
              id="badge"
              name="Badge"
              desc="누를 수 없는 작은 라벨. 높이 24, radius 6. 카테고리 배지는 95 배경에 50/40 글자를 써요."
              used={["Blog", "Project", "Gallery"]}
              spec={[
                [<code key="a">{"<Badge />"}</code>, "회색 기본"],
                [<code key="b">tone=&quot;primary&quot;</code>, "초록 강조"],
                [<code key="c">hue=&quot;violet&quot;</code>, "카테고리 배지 (팔레트 95 / 50)"],
              ]}
            >
              <div className="ds-row">
                <Badge>해커톤</Badge>
                <Badge tone="primary">최신 글</Badge>
                <Badge tone="primary">일했던 곳</Badge>
                <Badge hue="orange">🏆 [대상]</Badge>
                <Badge hue="violet">팀 프로젝트</Badge>
              </div>
            </Comp>

            <Comp
              id="card"
              name="Card · Thumbnail"
              desc="정보 묶음은 radius 16 카드에 담아요. 그림자 카드와 선 카드, 떠 있는 카드 세 가지. 사진 자리는 Thumbnail에 [ ] 설명을 넣어요."
              used={["Project", "Gallery", "Home"]}
              spec={[
                [<code key="a">{"<Card />"}</code>, "흰 면 + shadow-sm"],
                [<code key="b">variant=&quot;line&quot;</code>, "그림자 없이 선만 (정보 패널)"],
                [<code key="c">variant=&quot;float&quot;</code>, "떠 있는 카드 (shadow-md)"],
                [<code key="d">interactive</code>, "hover 때 살짝 떠오름 (링크 카드)"],
                [<code key="e">{"<Thumbnail src ratio tint />"}</code>, "사진 또는 자리 표시"],
              ]}
            >
              <div className="ds-grid3" style={{ alignItems: "start" }}>
                <Card interactive style={{ overflow: "hidden" }}>
                  <Thumbnail ratio="16 / 10" radius={0} tint="var(--blue-90)">
                    [썸네일]
                  </Thumbnail>
                  <div className="ds-pad ds-stack">
                    <Badge hue="blue" style={{ alignSelf: "flex-start" }}>
                      개인 연구
                    </Badge>
                    <span className="t-headline1">[프로젝트 이름]</span>
                    <span className="t-body2 ds-muted">[한 줄 설명]</span>
                  </div>
                </Card>
                <Card variant="line" className="ds-pad ds-stack">
                  <span className="t-label2 ds-muted">성과</span>
                  <span className="t-title3" style={{ color: "var(--primary)" }}>
                    [+20%]
                  </span>
                  <span className="t-body2 ds-muted">[가장 자랑스러운 결과]</span>
                </Card>
                <Card
                  variant="float"
                  className="ds-pad"
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <span className="t-label1 ds-muted">떠 있는 카드</span>
                  <div className="ds-row" style={{ gap: 6 }}>
                    <Button variant="assist" size="sm">
                      👋 인사
                    </Button>
                    <Button variant="inverse" size="sm">
                      🐾 따라가기
                    </Button>
                  </div>
                </Card>
              </div>
            </Comp>

            <Comp
              id="progress"
              name="Progress"
              desc="자동으로 넘어가는 캐러셀의 단계 막대와 글 읽기 진행률. 높이 4px, 채움은 primary."
              used={["Project", "Blog 글"]}
              spec={[
                [<code key="a">{"<Progress value />"}</code>, "채워진 정도 0–100"],
                [<code key="b">{"<ProgressSteps total current value />"}</code>, "단계 막대 (카드 수만큼)"],
                [<code key="c">thin</code>, "읽기 바, 글 화면 위쪽에 2px"],
              ]}
            >
              <div className="ds-stack" style={{ gap: 16, maxWidth: 420 }}>
                <ProgressSteps total={3} current={1} value={pct} label="캐러셀 진행" />
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ flex: 1 }}>
                    <Progress value={pct} label="읽은 정도" />
                  </span>
                  <span className="t-caption1 num ds-muted" style={{ flex: "0 0 auto" }}>
                    {pct}% 읽음
                  </span>
                </div>
                <Progress value={pct} thin label="읽기 바" />
                <div className="ds-row" style={{ gap: 8 }}>
                  <Button variant="assist" size="sm" onClick={() => setPct((p) => Math.max(0, p - 10))}>
                    −10
                  </Button>
                  <Button variant="assist" size="sm" onClick={() => setPct((p) => Math.min(100, p + 10))}>
                    +10
                  </Button>
                </div>
              </div>
            </Comp>

            <Comp
              id="status"
              name="Status text"
              desc="캐러셀이나 지구본처럼 스스로 움직이는 요소 옆에 지금 상태를 알려 주는 작은 글자. 바뀌는 문구는 live로 화면 낭독기에도 알려요."
              used={["Home", "Project", "Work", "Gallery"]}
              spec={[
                [<code key="a">{"<StatusText />"}</code>, "12px · 500 · label-alt"],
                [<code key="b">live</code>, "aria-live=polite"],
              ]}
            >
              <div className="ds-row">
                <StatusText>2 / 6 · 5초 뒤 다음 카드</StatusText>
                <StatusText>지구본을 불러오는 중이에요…</StatusText>
                <StatusText>지금은 작업 중이에요 · 서울 14:20</StatusText>
              </div>
            </Comp>
          </Section>

          {/* ---------- Pages ---------- */}
          <Section
            id="pages"
            eyebrow="Pages"
            title="페이지별 정리"
            desc="각 페이지가 어떤 공통 컴포넌트를 쓰고, 무엇이 그 페이지만의 특징인지예요."
          >
            <div style={{ overflowX: "auto" }}>
              <table className="ds-spec ds-spec--3">
                <thead>
                  <tr>
                    <th>페이지</th>
                    <th>공통 컴포넌트</th>
                    <th>이 페이지만의 것</th>
                  </tr>
                </thead>
                <tbody>
                  {PAGES.map(([p, c, own]) => (
                    <tr key={p}>
                      <td>{p}</td>
                      <td>{c}</td>
                      <td>{own}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
