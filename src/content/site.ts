export const site = {
  name: "Yein Choi",
  url: "https://yeinchoi.com",
  description: "최예인의 개인 사이트 — 프로젝트, 활동, 글, 사진을 기록해요.",
  role: "M.S. IT Engineering at Sookmyung Women's University",
  location: "Seoul, Korea",
  email: "hello.yeinchoi@gmail.com",
  avatar: "/images/me.jpeg",
  links: {
    github: "https://github.com/dev-yeinchoi",
    linkedin: "https://www.linkedin.com/in/yein-choi-54a507382",
    /** Instagram 계정(@ 없이). cv: true인 계정만 CV PDF에 들어가요. */
    instagram: [
      { handle: "c._.yein", label: "Instagram", cv: false },
      { handle: "yein.research", label: "Instagram · Research", cv: true },
    ],
  },
} as const;

/** GNB 메뉴. 메뉴·페이지 이름은 영어, 설명은 한국어. 화면이 생길 때마다 추가해요. */
export const nav: ReadonlyArray<{ href: string; label: string }> = [];
