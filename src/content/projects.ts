/**
 * Project 페이지에 보이는 프로젝트와 수상 기록.
 *
 * 추가하는 법: 아래 `projects` 배열에 객체를 하나 더 넣어요. 순서는 상관없어요
 * (폴더 안에서는 최신 연도부터 보여요). 지금 있는 항목은 모두 [대괄호] 자리 표시라서,
 * 실제 프로젝트로 바꾸거나 지우면 돼요. 배열이 비면 빈 상태 화면이 보여요.
 *
 * - type: research(개인 연구) · hackathon(해커톤) · contest(공모전) · team(팀 프로젝트)
 * - keywords: 위쪽 #키워드 필터에 쓰여요. 모든 프로젝트의 키워드가 자동으로 모여요.
 * - image: public 폴더 기준 대표 이미지 경로 (예: /images/projects/foo.jpg). 없으면 빈 칸.
 * - award: 받은 상이 있으면 카드에 배지로 붙어요.
 * - link: 있으면 "자세히 보기" 버튼이 생겨요 (GitHub, 데모, 글 주소 등).
 */
export type ProjectType = "research" | "hackathon" | "contest" | "team";

export const PROJECT_TYPE_ORDER: ProjectType[] = ["research", "hackathon", "contest", "team"];

export interface Project {
  type: ProjectType;
  year: string;
  title: string;
  keywords: string[];
  /** 문제: 어떤 문제였고 무엇을 하려 했는지 한두 줄 */
  problem: string;
  /** 성과: 크게 보이는 숫자나 한 단어 */
  metric: string;
  /** 성과 아래 작은 설명 */
  metricLabel: string;
  role: string;
  stack: string;
  image?: string;
  award?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    type: "research",
    year: "2026",
    title: "[프로젝트 이름 1]",
    keywords: ["AI", "Research"],
    problem: "[어떤 문제였고, 왜 중요했고, 무엇을 알아내려 했는지 한 줄]",
    metric: "[+20%]",
    metricLabel: "[가장 자랑스러운 결과]",
    role: "[리드 연구]",
    stack: "[Python]",
  },
  {
    type: "hackathon",
    year: "2026",
    title: "[해커톤 프로젝트]",
    keywords: ["Web"],
    problem: "[N시간 동안 누구를 위해 무엇을 만들었는지]",
    metric: "[1위]",
    metricLabel: "[N팀 중]",
    role: "[프론트엔드]",
    stack: "[Next.js]",
    award: "[대상]",
  },
  {
    type: "contest",
    year: "2025",
    title: "[공모전 출품작]",
    keywords: ["Data", "AI"],
    problem: "[과제와 접근 방법]",
    metric: "[0.91]",
    metricLabel: "[최종 점수 또는 순위]",
    role: "[모델링]",
    stack: "[PyTorch]",
    award: "[우수상]",
  },
  {
    type: "team",
    year: "2025",
    title: "[팀 프로젝트]",
    keywords: ["App"],
    problem: "[수업이나 팀, 그리고 맡은 문제]",
    metric: "[4주]",
    metricLabel: "[아이디어부터 데모까지]",
    role: "[PM · 앱]",
    stack: "[Flutter]",
  },
  {
    type: "research",
    year: "2025",
    title: "[프로젝트 이름 2]",
    keywords: ["Web", "Design"],
    problem: "[누가 어떤 불편을 겪었고 어떻게 풀었는지]",
    metric: "[3배]",
    metricLabel: "[더 빠르게, 더 많이 쓰이게]",
    role: "[풀스택]",
    stack: "[React]",
  },
  {
    type: "research",
    year: "2024",
    title: "[프로젝트 이름 3]",
    keywords: ["Data"],
    problem: "[탐구한 질문과 알아낸 것]",
    metric: "[논문]",
    metricLabel: "[발표한 곳]",
    role: "[공동 저자]",
    stack: "[R]",
  },
  {
    type: "hackathon",
    year: "2024",
    title: "[해커톤 프로젝트]",
    keywords: ["App"],
    problem: "[N시간 동안 만든 것]",
    metric: "[24시간]",
    metricLabel: "[하룻밤에 완성]",
    role: "[백엔드]",
    stack: "[Firebase]",
    award: "[특별상]",
  },
  {
    type: "team",
    year: "2024",
    title: "[팀 프로젝트]",
    keywords: ["Web"],
    problem: "[수업이나 팀, 그리고 맡은 부분]",
    metric: "[200명+]",
    metricLabel: "[실제로 쓴 사람]",
    role: "[프론트엔드]",
    stack: "[Vue]",
  },
  {
    type: "contest",
    year: "2023",
    title: "[공모전 출품작]",
    keywords: ["Design"],
    problem: "[과제와 접근 방법]",
    metric: "[본선]",
    metricLabel: "[M팀 중 상위 N팀]",
    role: "[디자인 리드]",
    stack: "[Figma]",
  },
];

/** 키워드 칩 순서. 여기 없는 키워드는 뒤에 가나다·ABC 순으로 붙어요. */
export const KEYWORD_ORDER = ["AI", "Web", "App", "Data", "Design", "Research"];
