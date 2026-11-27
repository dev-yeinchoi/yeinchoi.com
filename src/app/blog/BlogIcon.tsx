import type { BlogCategory } from "@/lib/blog";

/** 대표 이미지가 없을 때 썸네일에 보이는 카테고리 아이콘 */
const PATHS: Record<BlogCategory, string> = {
  dev: "M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16",
  retro: "M12 8v4l3 2M3.5 12a8.5 8.5 0 1 0 2.5-6M3 4v4h4",
  travel:
    "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  daily: "M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3",
  reading: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5",
};

export function BlogIcon({ category, size = 32 }: { category: BlogCategory; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[category]} />
    </svg>
  );
}

/** 대표 이미지 또는 카테고리 아이콘 썸네일 */
export function BlogThumb({
  cover,
  category,
  iconSize,
  className,
}: {
  cover?: string;
  category: BlogCategory;
  iconSize: number;
  className: string;
}) {
  return (
    <span className={className} aria-hidden="true">
      <span className="b-thumb__in">
        {cover ? <img src={cover} alt="" loading="lazy" /> : <BlogIcon category={category} size={iconSize} />}
      </span>
    </span>
  );
}
