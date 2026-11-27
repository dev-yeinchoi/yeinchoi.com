import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "inverse" | "outline" | "assist" | "text";
export type ButtonSize = "lg" | "md" | "sm";

interface BaseProps {
  /** primary: 화면에서 가장 중요한 행동 하나 · inverse: 켜진 토글 · outline: 보조 이동 · assist: 가벼운 행동 · text: 본문 속 링크 */
  variant?: ButtonVariant;
  /** lg 48px · md 40px · sm 32px */
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsLink;

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string) {
  return cx("c-btn", `c-btn--${variant}`, size !== "md" && `c-btn--${size}`, extra);
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const cls = buttonClass(variant, size, className);

  if (typeof rest.href === "string") {
    const { href, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const external = /^(https?:|mailto:|tel:)/.test(href) || anchor.download !== undefined;
    if (external) {
      return (
        <a className={cls} href={href} {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...anchor}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={type} {...button}>
      {children}
    </button>
  );
}
