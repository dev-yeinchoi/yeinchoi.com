import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** shadow: 흰 면 + shadow-sm · line: 그림자 없이 선만(정보 패널) · float: 떠 있는 카드(shadow-md) */
  variant?: "shadow" | "line" | "float";
  /** 마우스를 올리면 살짝 떠올라요 (링크 카드) */
  interactive?: boolean;
  as?: ElementType;
}

/** 정보 묶음은 radius 16 카드에 담아요. */
export function Card({
  children,
  variant = "shadow",
  interactive,
  as: Tag = "div",
  className,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cx(
        "c-card",
        variant === "line" && "c-card--line",
        variant === "float" && "c-card--float",
        interactive && "c-card--interactive",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
