"use client";
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import {
  AlarmClock,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ContactRound,
  DatabaseBackup,
  Download,
  FileKey2,
  Globe2,
  IdCard,
  Menu,
  NotebookTabs,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { copyByLanguage, isLang, languages, type Lang, type PageKind } from "./i18n";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.gesturno.app";

const paths: Record<PageKind, string> = {
  home: "/",
  guide: "/guide/",
  privacy: "/privacy/",
  terms: "/terms/",
  deletion: "/data-deletion/",
};

const moduleIcons = [CalendarDays, Route, Clock3, Sparkles, AlarmClock, ContactRound, IdCard, NotebookTabs, UsersRound, Globe2, DatabaseBackup, ShieldCheck];

function AppMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="/" aria-label="GesTurno · Inicio">
      <span className="brand-mark" aria-hidden="true"><Check size={compact ? 19 : 23} strokeWidth={3.2} /></span>
      <span className="brand-name"><strong>Ges</strong><em>Turno</em></span>
    </a>
  );
}

function CalendarMock() {
  const cells = ["L", "M", "M", "J", "V", "S", "D", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  const shifts: Record<string, string> = { "2": "M", "3": "M", "4": "T", "6": "L", "7": "N", "8": "N", "10": "AP", "12": "D", "13": "D", "14": "VAC", "15": "VAC", "18": "T", "19": "T", "22": "M", "23": "M", "24": "M", "27": "N", "28": "N" };
  return (
    <div className="calendar-device" aria-label="Vista ilustrativa del calendario de GesTurno">
      <div className="device-top"><span /><b>Ges<span>Turno</span></b><span className="tiny-dot" /></div>
      <div className="month-row"><button aria-label="Mes anterior">‹</button><strong>AGOSTO 2026</strong><button aria-label="Mes siguiente">›</button></div>
      <div className="calendar-grid">
        {cells.map((cell, index) => {
          const shift = shifts[cell];
          const className = index < 7 ? "weekday" : shift ? `day shift shift-${shift.toLowerCase()}` : "day";
          return <div className={className} key={`${cell}-${index}`}>{index < 7 ? cell : <><span>{cell}</span>{shift && <b>{shift}</b>}</>}</div>;
        })}
      </div>
      <div className="device-summary"><span>Horas realizadas</span><strong>142,5 h</strong><small>+ 6,5 h</small></div>
    </div>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const c = copyByLanguage[lang];
  return (
    <header className="site-header">
      <div className="header-inner">
        <AppMark compact />
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
          <a href="/">{c.nav.home}</a>
          <a href="/#features">{c.nav.features}</a>
          <a href="/guide/">{c.nav.guide}</a>
          <a href="/privacy/">{c.nav.privacy}</a>
          <a href="mailto:gesturnoapk@gmail.com">{c.nav.support}</a>
        </nav>
        <div className="header-actions">
          <label className="language-picker">
            <Globe2 size={17} aria-hidden="true" />
            <span className="sr-only">{c.language}</span>
            <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} aria-label={c.language}>
              {languages.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={c.menu} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const c = copyByLanguage[lang];
  return (
    <section className="hero">
      <div className="hero-matrix" aria-hidden="true">061&nbsp;&nbsp;062&nbsp;&nbsp;091&nbsp;&nbsp;112&nbsp;&nbsp;062<br />091&nbsp;&nbsp;060&nbsp;&nbsp;112&nbsp;&nbsp;085&nbsp;&nbsp;062<br />080&nbsp;&nbsp;091&nbsp;&nbsp;062&nbsp;&nbsp;112&nbsp;&nbsp;060</div>
      <div className="hero-stripes" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><ShieldCheck size={18} /> {c.hero.eyebrow}</p>
          <h1>{c.hero.title}</h1>
          <p>{c.hero.body}</p>
          <div className="hero-cta">
            <a className="button primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">{c.download.button}<Download size={18} /></a>
            <a className="button secondary" href="#features">{c.hero.primary}<ArrowRight size={18} /></a>
          </div>
          <ul className="trust-list">
            <li><Check size={16} />{c.trust.local}</li>
            <li><Check size={16} />{c.trust.languages}</li>
            <li><Check size={16} />{c.trust.noAccount}</li>
          </ul>
        </div>
        <div className="hero-visual">
          <img className="theme-source" src="/gesturno-header-gc.png" width={650} height={394} alt="" aria-hidden="true" />
          <div className="visual-badge"><span>ANDROID</span><strong>GesTurno</strong></div>
          <CalendarMock />
        </div>
      </div>
    </section>
  );
}

function HomePage({ lang }: { lang: Lang }) {
  const c = copyByLanguage[lang];
  return (
    <>
      <Hero lang={lang} />
      <section className="privacy-band">
        <div className="shell privacy-band-inner">
          <ShieldCheck size={36} />
          <div><h2>{c.privacyBand.title}</h2><p>{c.privacyBand.body}</p></div>
          <a href="/privacy/">{c.privacyBand.link}<ArrowRight size={17} /></a>
        </div>
      </section>
      <section className="section shell" id="features">
        <div className="section-heading"><span className="kicker">GES·TURNO / 01</span><h2>{c.featuresTitle}</h2><p>{c.featuresLead}</p></div>
        <div className="feature-grid">
          {c.modules.map((module, index) => {
            const Icon = moduleIcons[index];
            return <article className="feature-item" key={module.title}><span className="feature-icon"><Icon /></span><div><h3>{module.title}</h3><p>{module.body}</p></div></article>;
          })}
        </div>
      </section>
      <section className="workflow-section">
        <div className="shell workflow-grid">
          <div className="workflow-intro"><span className="kicker light">GES·TURNO / 02</span><h2>{c.workflowTitle}</h2><p>{c.workflowLead}</p><a className="text-link" href="/guide/">{c.nav.guide}<ArrowRight size={17} /></a></div>
          <ol className="workflow-list">{c.workflow.map((step) => <li key={step.title}><span>{step.title.split(".")[0]}</span><div><h3>{step.title.replace(/^\d+\.\s*/, "")}</h3><p>{step.body}</p></div></li>)}</ol>
        </div>
      </section>
      <DownloadSection lang={lang} />
    </>
  );
}

function DownloadSection({ lang }: { lang: Lang }) {
  const c = copyByLanguage[lang];
  return (
    <section className="download-section" aria-labelledby="download-title">
      <div className="shell download-card">
        <div className="download-app-panel" aria-hidden="true">
          <span className="download-orbit" />
          <img src="/gesturno-icon.webp" width={132} height={132} alt="" />
          <div><strong>GesTurno</strong><span>ANDROID</span></div>
        </div>
        <div className="download-copy">
          <span className="kicker">{c.download.eyebrow}</span>
          <h2 id="download-title">{c.download.title}</h2>
          <p>{c.download.body}</p>
          <div className="download-actions">
            <a className="button primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
              <Smartphone size={20} />{c.download.button}<ArrowRight size={18} />
            </a>
            <span><ShieldCheck size={18} />{c.download.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentPage({ lang, page }: { lang: Lang; page: Exclude<PageKind, "home"> }) {
  const c = copyByLanguage[lang];
  const config = {
    guide: { icon: BookOpenText, kicker: "GES·TURNO / GUIDE", title: c.guideTitle, lead: c.guideLead, sections: c.guideSections },
    privacy: { icon: ShieldCheck, kicker: "GES·TURNO / PRIVACY", title: c.privacyTitle, lead: c.privacyLead, sections: c.privacySections },
    terms: { icon: FileKey2, kicker: "GES·TURNO / TERMS", title: c.termsTitle, lead: c.termsLead, sections: c.termsSections },
    deletion: { icon: DatabaseBackup, kicker: "GES·TURNO / DATA", title: c.deletionTitle, lead: c.deletionLead, sections: c.deletionSections },
  }[page];
  const Icon = config.icon;
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="shell"><span className="page-icon"><Icon /></span><span className="kicker light">{config.kicker}</span><h1>{config.title}</h1><p>{config.lead}</p></div>
      </section>
      <section className="content-layout shell">
        <aside className="content-aside"><strong>{config.title}</strong><p>GesTurno · Android</p><a href="#contact">{c.nav.support}<ArrowRight size={15} /></a></aside>
        <div className="content-stack">
          {config.sections.map((section) => <article className="content-section" key={section.title}><h2>{section.title}</h2><p>{section.body}</p></article>)}
          {page !== "guide" && <div className="legal-note"><ShieldCheck size={20} /><p>{c.note}</p></div>}
        </div>
      </section>
    </>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const c = copyByLanguage[lang];
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-inner"><div><span className="kicker light">GESTURNO / SUPPORT</span><h2>{c.contactTitle}</h2><p>{c.contactBody}</p></div><a className="button primary" href="mailto:gesturnoapk@gmail.com?subject=GesTurno%20-%20Soporte">{c.contactButton}<ArrowRight size={18} /></a></div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const c = copyByLanguage[lang];
  return (
    <footer className="site-footer"><div className="shell footer-grid"><div><AppMark compact /><p>{c.footer.rights}</p><small>{c.footer.updated}</small></div><div><strong>{c.footer.product}</strong><a href="/">{c.nav.home}</a><a href="/#features">{c.nav.features}</a><a href="/guide/">{c.nav.guide}</a></div><div><strong>{c.footer.legal}</strong><a href="/privacy/">{c.privacyTitle}</a><a href="/terms/">{c.termsTitle}</a><a href="/data-deletion/">{c.deletionTitle}</a></div><div><strong>{c.nav.support}</strong><a href="mailto:gesturnoapk@gmail.com">gesturnoapk@gmail.com</a><a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">Google Play</a></div></div></footer>
  );
}

export default function GesTurnoSite({ page }: { page: PageKind }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    const saved = window.localStorage.getItem("gesturno-language");
    const browser = window.navigator.language.slice(0, 2);
    const selected = [query, saved, browser].find((value) => isLang(value ?? null));
    if (selected && isLang(selected)) {
      const timer = window.setTimeout(() => setLangState(selected), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);
  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("gesturno-language", next);
    document.documentElement.lang = copyByLanguage[next].locale;
  };
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GesTurno",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android",
    inLanguage: languages.map((item) => item.code),
    url: `https://gesturno.github.io${paths[page]}`,
    installUrl: PLAY_STORE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  }), [page]);
  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header lang={lang} setLang={setLang} />
      <main>{page === "home" ? <HomePage lang={lang} /> : <ContentPage lang={lang} page={page} />}</main>
      <Contact lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
