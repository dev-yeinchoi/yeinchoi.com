import { site } from "@/content/site";

/** 임시 Home. 디자인 시스템이 들어오면 새 화면으로 바뀌어요. */
export default function HomePage() {
  return (
    <section style={{ padding: 24 }}>
      <h1>안녕하세요, 최예인이에요.</h1>
      <p>사이트를 새 디자인으로 다시 만들고 있어요.</p>
      <p>
        <a href={site.links.github}>GitHub</a> · <a href={`mailto:${site.email}`}>Email</a>
      </p>
    </section>
  );
}
