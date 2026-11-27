/**
 * 카테고리 색 규칙
 * - 점·글자: 50 (orange·green·lightblue는 흰 바탕 대비를 위해 40)
 * - 책·폴더 같은 넓은 면: 90
 * - 연한 배경(배지·칩): 95
 * 같은 개념은 페이지가 달라도 같은 색이에요. (예: TA와 개인 연구는 모두 Blue)
 */
export type Hue = "blue" | "violet" | "green" | "redorange" | "orange" | "lightblue";

const INK_STEP: Record<Hue, 40 | 50> = {
  blue: 50,
  violet: 50,
  redorange: 50,
  green: 40,
  orange: 40,
  lightblue: 40,
};

export interface HueColors {
  /** 점·글자 */
  ink: string;
  /** 넓은 면 (표지·폴더) */
  surface: string;
  /** 연한 배경 (배지·칩) */
  tint: string;
}

export function hueColors(hue: Hue): HueColors {
  return {
    ink: `var(--${hue}-${INK_STEP[hue]})`,
    surface: `var(--${hue}-90)`,
    tint: `var(--${hue}-95)`,
  };
}

export type Category =
  // Project
  | "research"
  | "hackathon"
  | "contest"
  | "team"
  // Work
  | "ta"
  | "instructor"
  | "volunteer"
  | "club"
  | "parttime"
  // Blog
  | "dev"
  | "retro"
  | "travel"
  | "daily"
  | "reading";

export const CATEGORIES: Record<Category, { label: string; hue: Hue; group: "Project" | "Work" | "Blog" }> = {
  research: { label: "개인 연구", hue: "blue", group: "Project" },
  hackathon: { label: "해커톤", hue: "redorange", group: "Project" },
  contest: { label: "공모전", hue: "orange", group: "Project" },
  team: { label: "팀 프로젝트", hue: "violet", group: "Project" },
  ta: { label: "TA", hue: "blue", group: "Work" },
  instructor: { label: "강사", hue: "redorange", group: "Work" },
  volunteer: { label: "봉사", hue: "green", group: "Work" },
  club: { label: "동아리", hue: "violet", group: "Work" },
  parttime: { label: "아르바이트", hue: "orange", group: "Work" },
  dev: { label: "개발", hue: "blue", group: "Blog" },
  retro: { label: "회고", hue: "violet", group: "Blog" },
  travel: { label: "여행", hue: "green", group: "Blog" },
  daily: { label: "일상", hue: "orange", group: "Blog" },
  reading: { label: "독서", hue: "lightblue", group: "Blog" },
};
