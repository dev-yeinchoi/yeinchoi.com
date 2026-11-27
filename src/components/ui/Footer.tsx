"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export interface FooterProps {
  /** Home과 Gallery(화면 꽉 찬 페이지)에서는 기본으로 숨겨요. true면 어디서든 보여요. */
  always?: boolean;
}

/** 화면을 꽉 채우는 페이지라서 푸터를 숨기는 경로 */
const HIDDEN_ON = ["/", "/gallery"];

/** 저작권 한 줄만 두는 푸터. 연락 링크는 About과 Home 소개에 있어요. */
export function Footer({ always }: FooterProps) {
  const pathname = usePathname();
  if (!always && HIDDEN_ON.includes(pathname)) return null;

  return (
    <footer className="c-footer">
      <div className="c-footer__in">
        <span>© 2026 {site.name}</span>
      </div>
    </footer>
  );
}
