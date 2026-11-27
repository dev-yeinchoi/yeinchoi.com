/**
 * About 화면과 같은 내용으로 A4 CV PDF를 만들어요. 글자가 그림이 아니라 진짜 글자로 들어가서
 * 복사·검색이 되고, 연락처는 눌러지는 링크예요.
 * 무거운 PDF 라이브러리라서 버튼을 누를 때만 불러와요 (AboutView의 dynamic import).
 */
import { Document, Font, Image, Link, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer";
import { type AboutContent, type ContactLink, contacts, type Lang } from "@/content/about";
import { site } from "@/content/site";

const FAMILY = "CV Sans";
let registered = false;

function registerFonts(origin: string) {
  if (registered) return;
  Font.register({
    family: FAMILY,
    fonts: [
      { src: `${origin}/fonts/cv-sans-regular.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/cv-sans-semibold.ttf`, fontWeight: 600 },
      { src: `${origin}/fonts/cv-sans-bold.ttf`, fontWeight: 700 },
    ],
  });
  // 한글·영문 단어를 하이픈으로 끊지 않아요.
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}

const C = {
  strong: "#171719",
  neutral: "#2E2F33",
  alt: "#5D5E63",
  line: "#E1E2E4",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 48,
    paddingHorizontal: 45,
    fontFamily: FAMILY,
    fontSize: 9.5,
    color: C.strong,
    lineHeight: 1.5,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1.2,
    borderBottomColor: C.strong,
  },
  headText: { flexDirection: "column", gap: 3, flexShrink: 1, paddingRight: 16 },
  name: { fontSize: 21, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.3 },
  nameAlt: { fontSize: 13, fontWeight: 600, color: C.alt },
  role: { fontSize: 10.5, color: C.neutral },
  contactLine: { flexDirection: "row", flexWrap: "wrap", fontSize: 8.5, color: C.alt },
  contactPart: { flexDirection: "row" },
  sep: { marginHorizontal: 6 },
  contactLink: { color: C.alt, textDecoration: "none" },
  photo: { width: 57, height: 57, borderRadius: 7, objectFit: "cover" },
  row: {
    flexDirection: "row",
    paddingVertical: 13,
    borderBottomWidth: 0.75,
    borderBottomColor: C.line,
  },
  rowLabel: {
    width: 90,
    flexShrink: 0,
    paddingTop: 1,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 0.2,
    color: C.alt,
  },
  rowBody: { flex: 1, flexDirection: "column", gap: 9 },
  intro: { fontSize: 9.75, lineHeight: 1.7, color: C.neutral },
  item: { flexDirection: "column", gap: 1.5 },
  itemTop: { flexDirection: "row", justifyContent: "space-between" },
  itemTitle: { fontSize: 10, fontWeight: 600, flexShrink: 1, paddingRight: 12 },
  itemInline: { fontWeight: 400, color: C.neutral },
  period: { fontSize: 9, color: C.alt },
  sub: { fontSize: 9, color: C.alt },
  desc: { fontSize: 9.4, lineHeight: 1.6, color: C.neutral },
  footLeft: { position: "absolute", left: 45, bottom: 24, fontSize: 8, color: C.alt },
});

function stamp(d: Date) {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function CvDocument({
  lang,
  t,
  links,
  photo,
}: { lang: Lang; t: AboutContent; links: ContactLink[]; photo: string }) {
  const contactParts: Array<string | ContactLink> = [t.location, ...links];
  return (
    <Document title={`${t.name} CV`} author={site.name} language={lang}>
      <Page size="A4" style={s.page}>
        <Text style={s.footLeft} fixed>{`yeinchoi.com  ·  ${t.ui.updated} ${stamp(new Date())}`}</Text>
        <View style={s.head}>
          <View style={s.headText}>
            <Text style={s.name}>
              {t.name}
              {"  "}
              <Text style={s.nameAlt}>{t.nameAlt}</Text>
            </Text>
            <Text style={s.role}>{t.role}</Text>
            <View style={s.contactLine}>
              {contactParts.map((p, i) => (
                <View key={typeof p === "string" ? p : p.key} style={s.contactPart}>
                  {typeof p === "string" ? (
                    <Text>{p}</Text>
                  ) : (
                    <Link src={p.href} style={s.contactLink}>
                      {p.cvValue ?? p.value}
                    </Link>
                  )}
                  {i < contactParts.length - 1 ? <Text style={s.sep}>·</Text> : null}
                </View>
              ))}
            </View>
          </View>
          <Image src={photo} style={s.photo} />
        </View>

        <View style={s.row} wrap={false}>
          <Text style={s.rowLabel}>{t.ui.about}</Text>
          <View style={s.rowBody}>
            <Text style={s.intro}>{t.intro}</Text>
          </View>
        </View>

        {t.sections.map((sec) => (
          <View key={sec.key} style={s.row}>
            <Text style={s.rowLabel}>{sec.label}</Text>
            <View style={s.rowBody}>
              {sec.items.map((i) => {
                const inline = i.desc && !i.sub && !i.period;
                return (
                  <View key={`${i.title}-${i.period ?? ""}-${i.sub ?? ""}`} style={s.item} wrap={false}>
                    <View style={s.itemTop}>
                      <Text style={s.itemTitle}>
                        {i.title}
                        {inline ? <Text style={s.itemInline}>{`   ${i.desc}`}</Text> : null}
                      </Text>
                      {i.period ? <Text style={s.period}>{i.period}</Text> : null}
                    </View>
                    {i.sub ? <Text style={s.sub}>{i.sub}</Text> : null}
                    {i.desc && !inline ? <Text style={s.desc}>{i.desc}</Text> : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

/** 지금 화면의 언어로 CV PDF를 만들어 내려받게 해요. */
export async function downloadCv(lang: Lang, t: AboutContent) {
  const origin = window.location.origin;
  registerFonts(origin);
  const blob = await pdf(
    <CvDocument lang={lang} t={t} links={contacts.filter((c) => c.cv)} photo={`${origin}${site.avatar}`} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Yein_Choi_CV_${lang.toUpperCase()}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
