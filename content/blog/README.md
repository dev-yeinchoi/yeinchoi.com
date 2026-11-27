# Blog 글 쓰는 법

이 폴더에 `.mdx` 파일을 하나 만들면 글 하나가 돼요. 파일 이름이 주소가 돼요.
예: `rsc-first-day.mdx` → `https://yeinchoi.com/blog/rsc-first-day`
(파일 이름은 영어 소문자, 숫자, `-`만 쓰는 걸 추천해요.)

## 맨 위 정보 (frontmatter)

```mdx
---
title: React Server Components를 처음 써 본 날
date: 2026-10-30
category: dev
excerpt: 목록에 보이는 한두 줄 요약이에요.
tags: [React, Next.js]
cover: /images/blog/rsc-first-day.jpg
---

본문은 여기부터 써요.
```

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 글 제목 |
| `date` | O | `YYYY-MM-DD` |
| `category` | O | `dev`(개발) · `retro`(회고) · `travel`(여행) · `daily`(일상) · `reading`(독서) |
| `excerpt` |  | 목록과 대표 글에 보이는 요약 |
| `tags` |  | 글 아래에 보이는 태그 |
| `cover` |  | 대표 이미지. `public/images/blog/`에 넣고 `/images/blog/파일이름`으로 적어요 |
| `draft` |  | `true`면 사이트에 안 보여요 |

## 본문

- `## 제목`이 목차 항목이 돼요. 위쪽 읽기 바의 "목차"에서 바로 이동할 수 있어요.
- 코드 블록 언어 뒤에 파일 이름을 적으면 코드 위에 이름이 보여요.

  ````mdx
  ```tsx page.tsx
  export default function Page() {}
  ```
  ````

- 인용은 `>`, 목록은 `-`, 인라인 코드는 `` `code` ``로 써요.
- 읽는 시간은 글자 수로 자동 계산돼요.

글을 추가하고 `main`에 머지하면 자동으로 배포돼요.
