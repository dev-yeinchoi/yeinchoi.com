import type { ReactNode } from "react";

export interface PageTitleProps {
  /** 영어 페이지 이름 */
  title: ReactNode;
  /** 한국어 한 줄 설명 */
  description?: ReactNode;
  /** 제목 위 작은 초록 글자 */
  eyebrow?: ReactNode;
  /** 오른쪽에 둘 보기 전환·버튼 등 */
  actions?: ReactNode;
}

/** 각 페이지 맨 위. title1 페이지 이름 + body2 설명, 위 여백 56. */
export function PageTitle({ title, description, eyebrow, actions }: PageTitleProps) {
  const heading = (
    <div className="c-page-title" style={actions ? { padding: 0 } : undefined}>
      {eyebrow ? <p className="c-eyebrow">{eyebrow}</p> : null}
      <h1 className="t-title1 c-page-title__title">{title}</h1>
      {description ? <p className="t-body2 c-page-title__desc">{description}</p> : null}
    </div>
  );

  if (!actions) return heading;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        padding: "var(--space-56) 0 var(--space-32)",
      }}
    >
      {heading}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{actions}</div>
    </div>
  );
}
