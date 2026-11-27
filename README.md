# yeinchoi.com

최예인의 개인 사이트. Next.js(App Router) + 순수 CSS 디자인 시스템.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint       # biome
```

## 개발 방식

이슈를 만들고 이슈 브랜치(`feat/2-design-system` 등)에서 작업한 뒤, PR로 `main`에 머지해요.
커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/)를 따라요.

## 배포

- `main`에 머지하면 Vercel이 자동으로 배포해요. PR 브랜치는 미리보기 배포가 만들어져요.
- 도메인 `yeinchoi.com`은 Cloudflare에서 샀고, DNS는 Vercel을 가리켜요.
