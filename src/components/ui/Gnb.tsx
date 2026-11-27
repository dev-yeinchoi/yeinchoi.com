"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { cx } from "@/lib/cx";

export interface GnbProps {
  /** 배경 없이 화면 위에 겹쳐요 (Home의 3D 장면 위). 지정하지 않으면 Home에서만 자동으로 켜져요. */
  overlay?: boolean;
  /** 현재 경로를 직접 지정할 때 (디자인 시스템 예시용). */
  currentPath?: string;
  /** sticky 해제 (예시 프레임 안에서 쓸 때). */
  static?: boolean;
}

export function Gnb({ overlay, currentPath, static: isStatic }: GnbProps) {
  const pathname = usePathname();
  const path = currentPath ?? pathname ?? "/";
  const isOverlay = overlay ?? path === "/";

  return (
    <header
      className={cx("c-gnb", isOverlay && "c-gnb--overlay")}
      style={isStatic ? { position: isOverlay ? "absolute" : "relative" } : undefined}
    >
      <div className="c-gnb__in">
        <Link className="c-gnb__logo" href="/">
          <span className="c-gnb__dot" aria-hidden="true" />
          {site.name}
        </Link>
        <nav className="c-gnb__nav" aria-label="Main">
          {nav.map((item) => {
            const active = path === item.href || path.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                className="c-gnb__link"
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
