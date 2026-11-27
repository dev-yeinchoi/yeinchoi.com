"use client";

import { type ComponentType, useEffect, useState } from "react";
import { buttonClass, Icon, SegmentedControl } from "@/components/ui";
import { about, type ContactKind, contacts, type Lang } from "@/content/about";
import { site } from "@/content/site";

const LANG_KEY = "about-lang";

const contactIcon: Record<ContactKind, ComponentType> = {
  email: Icon.Mail,
  github: Icon.GitHub,
  linkedin: Icon.LinkedIn,
  instagram: Icon.Instagram,
};

type Status = { kind: "idle" | "busy" | "saved" | "failed" };

export function AboutView() {
  const [lang, setLang] = useState<Lang>("ko");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const t = about[lang];
  const busy = status.kind === "busy";

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "ko" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  function pickLang(next: Lang) {
    setLang(next);
    setStatus({ kind: "idle" });
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {}
  }

  async function onDownload() {
    if (busy) return;
    setStatus({ kind: "busy" });
    try {
      const { downloadCv } = await import("./cv");
      await downloadCv(lang, t);
      setStatus({ kind: "saved" });
    } catch (e) {
      console.error(e);
      setStatus({ kind: "failed" });
    }
  }

  const message =
    status.kind === "busy"
      ? t.ui.making
      : status.kind === "saved"
        ? t.ui.saved
        : status.kind === "failed"
          ? t.ui.failed
          : "";

  return (
    <div className="about" lang={lang}>
      <aside className="about__side" aria-label={t.ui.contact}>
        <img className="about__photo" src={site.avatar} alt={t.photoAlt} width={300} height={300} />
        <div className="about__id">
          <h1 className="t-title2 about__name">{t.name}</h1>
          <p className="about__role">{t.role}</p>
          <p className="about__loc">{t.location}</p>
        </div>

        <div className="about__cv">
          <button
            type="button"
            className={buttonClass("primary", "lg", "about__cv-btn")}
            onClick={onDownload}
            aria-busy={busy}
            disabled={busy}
          >
            {busy ? <Icon.Spinner className="about__spin" /> : <Icon.Download size={18} />}
            {busy ? t.ui.making : t.ui.cv}
          </button>
          <span
            className="about__cv-msg"
            role="status"
            aria-live="polite"
            data-bad={status.kind === "failed" || undefined}
          >
            {status.kind === "busy" ? "" : message}
          </span>
        </div>

        <nav className="about__contacts" aria-label={t.ui.contact}>
          {contacts.map((c) => {
            const ContactIcon = contactIcon[c.kind];
            const external = c.href.startsWith("http");
            return (
              <a
                key={c.key}
                className="about__contact"
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <span className="about__contact-icon">
                  <ContactIcon />
                </span>
                <span className="about__contact-text">
                  <span className="about__contact-label">{c.label}</span>
                  <span className="about__contact-value">{c.value}</span>
                </span>
                <span className="about__contact-arrow">
                  <Icon.ArrowUpRight />
                </span>
              </a>
            );
          })}
        </nav>
      </aside>

      <div className="about__main">
        <div className="about__head">
          <h2 className="t-heading1 about__h">{t.ui.about}</h2>
          <SegmentedControl
            label={t.ui.language}
            value={lang}
            onChange={pickLang}
            options={[
              { value: "ko", label: "KO" },
              { value: "en", label: "EN" },
            ]}
          />
        </div>
        <p className="about__intro">{t.intro}</p>

        {t.sections.map((s) => (
          <section key={s.key} className="about__section" aria-labelledby={`about-${s.key}`}>
            <h2 id={`about-${s.key}`} className="t-headline1 about__section-title">
              {s.label}
            </h2>
            <ul className="about__list">
              {s.items.map((i) => (
                <li key={`${i.title}-${i.period ?? ""}-${i.sub ?? ""}`} className="about__item">
                  <span className="about__period">{i.period}</span>
                  <span className="about__item-body">
                    <span className="about__item-title">{i.title}</span>
                    {i.sub ? <span className="about__item-sub">{i.sub}</span> : null}
                    {i.desc ? <span className="about__item-desc">{i.desc}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
