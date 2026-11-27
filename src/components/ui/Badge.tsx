import type { HTMLAttributes, ReactNode } from "react";
import { type Hue, hueColors } from "@/lib/categories";
import { cx } from "@/lib/cx";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** neutral: 회색 기본 · primary: 초록 강조 */
  tone?: "neutral" | "primary";
  /** 카테고리 배지: 95 배경 + 50/40 글자 */
  hue?: Hue;
}

/** 누를 수 없는 작은 라벨. 높이 24, radius 6. */
export function Badge({ children, tone = "neutral", hue, className, style, ...rest }: BadgeProps) {
  const colors = hue ? hueColors(hue) : null;
  return (
    <span
      className={cx("c-badge", !hue && tone === "primary" && "c-badge--primary", className)}
      style={colors ? { background: colors.tint, color: colors.ink, ...style } : style}
      {...rest}
    >
      {children}
    </span>
  );
}
