import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface StatusTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** 바뀔 때 화면 낭독기가 읽어 줘요 (캐러셀 상태) */
  live?: boolean;
}

/** 캐러셀 상태 문구. 예: "2 / 6 · 5초 뒤 다음 카드" */
export function StatusText({ children, live, className, ...rest }: StatusTextProps) {
  return (
    <span className={cx("c-status", className)} aria-live={live ? "polite" : undefined} {...rest}>
      {children}
    </span>
  );
}
