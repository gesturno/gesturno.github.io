import type { Metadata } from "next";
import GesTurnoSite from "../../GesTurnoSite";
import { isLang, languages, type Lang } from "../../i18n";

export function generateStaticParams() { return languages.map(({ code }) => ({ lang: code })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: value } = await params;
  const lang = isLang(value) ? value : "es";
  return { title: `Instrucciones de GesTurno · ${lang.toUpperCase()}`, description: "Guía completa para configurar servicios, turnos, cuadrantes, horas, grupos, copias y privacidad en GesTurno.", alternates: { canonical: `/${lang}/guide/` } };
}
export default async function LocalizedGuide({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: value } = await params;
  const lang: Lang = isLang(value) ? value : "es";
  return <GesTurnoSite page="guide" initialLang={lang} />;
}
