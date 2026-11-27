import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface ThumbnailProps {
  /** 이미지 주소. 없으면 children(자리 표시 문구)을 보여줘요. */
  src?: string;
  alt?: string;
  /** 예: "16 / 10" */
  ratio?: string;
  /** 사진이 없을 때 배경 (예: 카테고리 90 색) */
  tint?: string;
  radius?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** 사진 자리. 사진이 없으면 [ ] 설명을 넣어요. */
export function Thumbnail({
  src,
  alt = "",
  ratio = "16 / 10",
  tint,
  radius,
  children,
  className,
  style,
}: ThumbnailProps) {
  return (
    <div
      className={cx("c-thumb", className)}
      style={{ aspectRatio: ratio, background: tint, borderRadius: radius, ...style }}
    >
      {src ? (
        // 이미지 최적화는 화면별 PR에서 next/image로 바꿔요.
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        children
      )}
    </div>
  );
}
