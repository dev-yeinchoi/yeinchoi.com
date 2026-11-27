import { site } from "./site";

/**
 * About 페이지와 CV PDF가 함께 쓰는 내용. 화면에 보이는 그대로 PDF가 만들어져요.
 * [ ] 로 감싼 부분은 아직 채우지 않은 자리예요.
 */

export type Lang = "ko" | "en";

export interface AboutItem {
  /** 제목 (학교, 직함, 수상명 등) */
  title: string;
  /** 한 줄 보조 정보 (전공, 기관 등) */
  sub?: string;
  /** 기간 */
  period?: string;
  /** 설명 한 줄 */
  desc?: string;
}

export interface AboutSection {
  key: string;
  label: string;
  items: AboutItem[];
}

export interface AboutContent {
  name: string;
  nameAlt: string;
  role: string;
  location: string;
  photoAlt: string;
  intro: string;
  sections: AboutSection[];
  ui: {
    about: string;
    contact: string;
    language: string;
    cv: string;
    making: string;
    saved: string;
    failed: string;
    updated: string;
  };
}

export type ContactKind = "email" | "github" | "linkedin" | "instagram";

export interface ContactLink {
  key: string;
  kind: ContactKind;
  /** CV PDF의 연락처 줄에도 넣을지 */
  cv: boolean;
  /** CV에 쓸 표기 (없으면 value) */
  cvValue?: string;
  label: string;
  value: string;
  href: string;
}

/** 연락처. 계정 정보는 site.ts에서 바꿔요. */
export const contacts: ContactLink[] = [
  { key: "email", kind: "email", cv: true, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    key: "github",
    kind: "github",
    cv: true,
    label: "GitHub",
    value: site.links.github.replace(/^https:\/\//, ""),
    href: site.links.github,
  },
  {
    key: "linkedin",
    kind: "linkedin",
    cv: true,
    label: "LinkedIn",
    value: site.links.linkedin.replace(/^https:\/\/(www\.)?/, ""),
    href: site.links.linkedin,
  },
  ...site.links.instagram.map((ig) => ({
    key: `instagram-${ig.handle}`,
    kind: "instagram" as const,
    cv: ig.cv,
    label: ig.label,
    value: `@${ig.handle}`,
    cvValue: `instagram.com/${ig.handle}`,
    href: `https://www.instagram.com/${ig.handle}/`,
  })),
];

export const about: Record<Lang, AboutContent> = {
  ko: {
    name: "최예인",
    nameAlt: "Yein Choi",
    role: "숙명여자대학교 IT공학과 석사과정",
    location: "서울, 대한민국",
    photoAlt: "최예인 프로필 사진",
    intro: "[소개 두세 문장: 지금 무엇을 연구하고 만드는지, 일할 때 무엇을 중요하게 생각하는지.]",
    ui: {
      about: "소개",
      contact: "연락처",
      language: "언어",
      cv: "CV 다운로드",
      making: "PDF 만드는 중…",
      saved: "PDF를 저장했어요.",
      failed: "PDF를 만들지 못했어요. 다시 시도해 주세요.",
      updated: "업데이트",
    },
    sections: [
      {
        key: "edu",
        label: "학력",
        items: [
          {
            title: "숙명여자대학교 대학원",
            sub: "IT공학과 석사과정 · 인공지능공학 전공",
            period: "2026.09 – 현재",
          },
          { title: "숙명여자대학교", sub: "인공지능공학부 학사", period: "2023.03 – 2026.08" },
        ],
      },
      {
        key: "awards",
        label: "수상",
        items: [
          { title: "[수상명]", sub: "[대회명 · 주최]", period: "[20XX]" },
          { title: "[수상명]", sub: "[대회명 · 주최]", period: "[20XX]" },
        ],
      },
      {
        key: "exp",
        label: "경력",
        items: [
          {
            title: "[과목명] 조교 (TA)",
            sub: "숙명여자대학교 · [담당 교수]",
            period: "[20XX 학기]",
            desc: "[맡은 일 한 줄: 실습 진행, 과제 채점 등]",
          },
          {
            title: "학부연구생",
            sub: "숙명여자대학교 인간중심인공지능연구실(SM-HCAI Lab)",
            period: "2024.11 – 2026.08",
            desc: "인간-AI 상호작용 연구, 사용자 실험 설계, 시스템 개발",
          },
          {
            title: "멘토 · 강사",
            sub: "씨드콥 운영지원팀",
            period: "2023.08 – 현재",
            desc: "청소년과 장애인 대상 AI·디지털 강의 진행",
          },
        ],
      },
      {
        key: "act",
        label: "활동",
        items: [
          { title: "[봉사 / 동아리 이름]", sub: "[기관] · [역할]", period: "[20XX]" },
          { title: "[봉사 / 동아리 이름]", sub: "[기관] · [역할]", period: "[20XX]" },
        ],
      },
      {
        key: "certs",
        label: "자격증",
        items: [
          { title: "리눅스마스터 2급", sub: "한국정보통신진흥협회", period: "2025.03" },
          { title: "Microsoft Certified: Azure Fundamentals (AZ-900)", sub: "Microsoft", period: "2024.11" },
          {
            title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
            sub: "Microsoft",
            period: "2024.07",
          },
          {
            title: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
            sub: "Microsoft",
            period: "2024.07",
          },
          { title: "SQLD (SQL 개발자)", sub: "한국데이터산업진흥원", period: "2023.07" },
        ],
      },
      {
        key: "skills",
        label: "기술",
        items: [
          { title: "언어", desc: "[Python, TypeScript]" },
          { title: "프레임워크", desc: "[React, Next.js]" },
          { title: "도구", desc: "[Git, Figma]" },
        ],
      },
    ],
  },
  en: {
    name: "Yein Choi",
    nameAlt: "최예인",
    role: "M.S. student in IT Engineering, Sookmyung Women's University",
    location: "Seoul, South Korea",
    photoAlt: "Profile photo of Yein Choi",
    intro: "[Two or three sentences on what you research and build, and what you care about in your work.]",
    ui: {
      about: "About",
      contact: "Contact",
      language: "Language",
      cv: "Download CV",
      making: "Creating PDF…",
      saved: "PDF saved.",
      failed: "Couldn't create the PDF. Please try again.",
      updated: "Updated",
    },
    sections: [
      {
        key: "edu",
        label: "Education",
        items: [
          {
            title: "Sookmyung Women's University",
            sub: "M.S. in IT Engineering · Artificial Intelligence",
            period: "Sep 2026 – Present",
          },
          {
            title: "Sookmyung Women's University",
            sub: "B.S. in Artificial Intelligence Engineering",
            period: "Mar 2023 – Aug 2026",
          },
        ],
      },
      {
        key: "awards",
        label: "Awards",
        items: [
          { title: "[Award name]", sub: "[Competition · Host]", period: "[20XX]" },
          { title: "[Award name]", sub: "[Competition · Host]", period: "[20XX]" },
        ],
      },
      {
        key: "exp",
        label: "Experience",
        items: [
          {
            title: "Teaching Assistant, [Course]",
            sub: "Sookmyung Women's University · [Professor]",
            period: "[Semester 20XX]",
            desc: "[One line on what you did: lab sessions, grading, etc.]",
          },
          {
            title: "Undergraduate Researcher",
            sub: "Human-Centered AI Lab (SM-HCAI Lab), Sookmyung Women's University",
            period: "Nov 2024 – Aug 2026",
            desc: "Human-AI interaction research, user study design, and system development",
          },
          {
            title: "Mentor & Instructor",
            sub: "SEEDCOOP · Operations Support Team",
            period: "Aug 2023 – Present",
            desc: "Teaching AI and digital literacy classes for teenagers and people with disabilities",
          },
        ],
      },
      {
        key: "act",
        label: "Activities",
        items: [
          { title: "[Volunteer / club name]", sub: "[Organization] · [Role]", period: "[20XX]" },
          { title: "[Volunteer / club name]", sub: "[Organization] · [Role]", period: "[20XX]" },
        ],
      },
      {
        key: "certs",
        label: "Certifications",
        items: [
          { title: "Linux Master Level 2", sub: "Korea Association for ICT Promotion", period: "Mar 2025" },
          { title: "Microsoft Certified: Azure Fundamentals (AZ-900)", sub: "Microsoft", period: "Nov 2024" },
          {
            title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
            sub: "Microsoft",
            period: "Jul 2024",
          },
          {
            title: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
            sub: "Microsoft",
            period: "Jul 2024",
          },
          { title: "SQL Developer (SQLD)", sub: "Korea Data Agency", period: "Jul 2023" },
        ],
      },
      {
        key: "skills",
        label: "Skills",
        items: [
          { title: "Languages", desc: "[Python, TypeScript]" },
          { title: "Frameworks", desc: "[React, Next.js]" },
          { title: "Tools", desc: "[Git, Figma]" },
        ],
      },
    ],
  },
};
