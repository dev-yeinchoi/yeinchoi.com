import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  /** 선택됨 → 진한 배경으로 뒤집혀요 (다크 화면에서는 primary) */
  selected?: boolean;
  /** 카테고리 색 점 (예: "var(--blue-50)") */
  dot?: string;
  /** 개수 */
  count?: number;
  /** 32px · radius 8 (키워드, 장소) */
  small?: boolean;
}

/** 여러 개 중에서 고르거나 걸러 볼 때. 토글 버튼이라 aria-pressed를 써요. */
export function Chip({
  children,
  selected = false,
  dot,
  count,
  small,
  className,
  type = "button",
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx("c-chip", small && "c-chip--sm", className)}
      {...rest}
    >
      {dot ? <span className="c-chip__dot" aria-hidden="true" style={{ background: dot }} /> : null}
      {children}
      {count !== undefined ? <span className="c-chip__n">{count}</span> : null}
    </button>
  );
}
