import { Button } from "@/components/ui";
import { site } from "@/content/site";

/** 임시 Home. 3D 캐릭터 장면은 Home 화면 PR에서 들어와요. */
export default function HomePage() {
  return (
    <section
      className="l-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
        paddingTop: "var(--gnb-height)",
      }}
    >
      <h1 className="t-title2">안녕하세요, 최예인이에요.</h1>
      <p className="t-body1r" style={{ color: "var(--label-neutral)", maxWidth: 560 }}>
        숙명여자대학교 IT공학과 석사과정이에요. 사이트를 새 디자인으로 다시 만들고 있어요.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
        <Button href={site.links.github} variant="assist" target="_blank" rel="noreferrer">
          GitHub
        </Button>
        <Button href={site.links.linkedin} variant="assist" target="_blank" rel="noreferrer">
          LinkedIn
        </Button>
        <Button href={`mailto:${site.email}`} variant="assist">
          Email
        </Button>
        <Button href="/design-system" variant="text" style={{ marginLeft: 8 }}>
          디자인 시스템 보기
        </Button>
      </div>
    </section>
  );
}
