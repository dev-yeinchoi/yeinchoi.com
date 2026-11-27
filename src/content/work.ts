/**
 * Work 활동. 한 활동이 책 한 권이에요.
 * 실제 내용이 정해지기 전까지 [대괄호]는 자리 표시예요.
 */
export type WorkType = "ta" | "instructor" | "volunteer" | "club" | "parttime";

/** 책장에 꽂히는 순서 (종류별로 모아요) */
export const WORK_ORDER: WorkType[] = ["ta", "instructor", "volunteer", "club", "parttime"];

export interface WorkItem {
  type: WorkType;
  /** 책등과 표지에 쓰는 짧은 이름 */
  short: string;
  /** 아래 설명의 제목 */
  title: string;
  /** 기관·소속 */
  org: string;
  /** 도장에 찍히는 도시 */
  city: string;
  /** 시작·끝 (연도 + 개월/12). 책 두께를 정해요. */
  start: number;
  end: number;
  /** 화면에 보이는 기간 */
  period: string;
  desc: string;
}

export const work: WorkItem[] = [
  {
    type: "club",
    short: "[개발 동아리]",
    title: "[동아리 이름]",
    org: "[학교 동아리]",
    city: "[도시]",
    start: 2021.0,
    end: 2023.4,
    period: "[2021 — 2023]",
    desc: "[맡은 역할: 회장, 스터디 리드 등]",
  },
  {
    type: "parttime",
    short: "[카페]",
    title: "[아르바이트]",
    org: "[일한 곳]",
    city: "[도시]",
    start: 2021.5,
    end: 2022.6,
    period: "[2021.07 — 2022.08]",
    desc: "[맡았던 일]",
  },
  {
    type: "volunteer",
    short: "[여름 캠프]",
    title: "[봉사 프로그램]",
    org: "[기관]",
    city: "[도시]",
    start: 2022.5,
    end: 2022.6,
    period: "[2022.07]",
    desc: "[누구를 위해 무엇을 했는지]",
  },
  {
    type: "parttime",
    short: "[과외]",
    title: "[과외 선생님]",
    org: "[학원]",
    city: "[도시]",
    start: 2023.0,
    end: 2024.0,
    period: "[2023]",
    desc: "[누구를 가르쳤는지]",
  },
  {
    type: "club",
    short: "[사진 동아리]",
    title: "[동아리 이름]",
    org: "[학교 동아리]",
    city: "[도시]",
    start: 2023.45,
    end: 2024.4,
    period: "[2023 — 2024]",
    desc: "[맡은 역할]",
  },
  {
    type: "volunteer",
    short: "[코딩 교실]",
    title: "[봉사 프로그램]",
    org: "[기관]",
    city: "[도시]",
    start: 2023.6,
    end: 2023.7,
    period: "[2023.08]",
    desc: "[누구를 위해 무엇을 했는지]",
  },
  {
    type: "volunteer",
    short: "[섬마을 학교]",
    title: "[봉사 프로그램]",
    org: "[기관]",
    city: "[도시]",
    start: 2023.9,
    end: 2024.0,
    period: "[2023.12]",
    desc: "[누구를 위해 무엇을 했는지]",
  },
  {
    type: "instructor",
    short: "[겨울 캠프]",
    title: "[강사]",
    org: "[회사]",
    city: "[도시]",
    start: 2024.0,
    end: 2024.2,
    period: "[2024.01 — 2024.02]",
    desc: "[누구를 얼마나 가르쳤는지]",
  },
  {
    type: "volunteer",
    short: "[멘토링]",
    title: "[봉사 프로그램]",
    org: "[기관]",
    city: "[도시]",
    start: 2024.35,
    end: 2024.45,
    period: "[2024.05]",
    desc: "[누구를 위해 무엇을 했는지]",
  },
  {
    type: "instructor",
    short: "[코딩 캠프]",
    title: "[코딩 캠프 강사]",
    org: "[회사]",
    city: "[도시]",
    start: 2024.5,
    end: 2024.65,
    period: "[2024.07]",
    desc: "[누구를 얼마나 가르쳤는지]",
  },
  {
    type: "instructor",
    short: "[AI 수업]",
    title: "[강사]",
    org: "[회사]",
    city: "[도시]",
    start: 2025.05,
    end: 2025.2,
    period: "[2025.02]",
    desc: "[누구를 얼마나 가르쳤는지]",
  },
  {
    type: "ta",
    short: "[과목 A] TA",
    title: "[과목명] TA",
    org: "[담당 교수] · 숙명여자대학교",
    city: "서울",
    start: 2025.2,
    end: 2025.5,
    period: "[2025 봄]",
    desc: "[매주 N명 대상 실습 진행]",
  },
  {
    type: "instructor",
    short: "[파이썬 수업]",
    title: "[강사]",
    org: "[회사]",
    city: "[도시]",
    start: 2025.6,
    end: 2025.7,
    period: "[2025.08]",
    desc: "[누구를 얼마나 가르쳤는지]",
  },
  {
    type: "ta",
    short: "[과목 B] TA",
    title: "[과목명] TA",
    org: "[담당 교수] · 숙명여자대학교",
    city: "서울",
    start: 2025.7,
    end: 2025.95,
    period: "[2025 가을]",
    desc: "[가르치거나 도운 일]",
  },
  {
    type: "ta",
    short: "[과목 C] TA",
    title: "[과목명] TA",
    org: "[담당 교수] · 숙명여자대학교",
    city: "서울",
    start: 2026.2,
    end: 2026.5,
    period: "[2026 봄]",
    desc: "[가르치거나 도운 일]",
  },
];
