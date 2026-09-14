import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";
import { isLang, languages, type Lang } from "../i18n";

export function generateStaticParams() { return languages.map(({ code }) => ({ lang: code })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: value } = await params;
  const lang = isLang(value) ? value : "es";
  return { title: `GesTurno · ${lang === "es" ? "Aplicación de turnos y cuadrantes" : "Shift calendar and work schedule"}`, description: lang === "es" ? "Aplicación Android para organizar turnos, guardias, cuadrantes y horas trabajadas." : "Android app to organize shifts, work schedules, duties and working hours.", alternates: { canonical: `/${lang}/` } };
}

export default async function LocalizedHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: value } = await params;
  const lang: Lang = isLang(value) ? value : "es";
  return <GesTurnoSite page="home" initialLang={lang} />;
}
