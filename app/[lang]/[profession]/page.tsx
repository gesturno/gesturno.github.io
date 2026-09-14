import type { Metadata } from "next";
import GesTurnoSite from "../../GesTurnoSite";
import { isLang, languages, type Lang } from "../../i18n";

const professions = ["guardia-civil", "policia", "sanitarios", "turnos"] as const;
export function generateStaticParams() { return languages.flatMap(({ code }) => professions.map((profession) => ({ lang: code, profession }))); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; profession: string }> }): Promise<Metadata> {
  const { lang: value, profession } = await params;
  const lang = isLang(value) ? value : "es";
  const titles: Record<string, string> = { "guardia-civil": "Turnos para Guardia Civil", policia: "Turnos para Policía", sanitarios: "Turnos para sanitarios", turnos: "Aplicación para turnos rotativos" };
  return { title: `GesTurno · ${titles[profession] ?? titles.turnos}`, description: "Organiza turnos, guardias, cuadrantes y horas trabajadas con GesTurno para Android.", alternates: { canonical: `/${lang}/${profession}/` } };
}
export default async function ProfessionLanding({ params }: { params: Promise<{ lang: string; profession: string }> }) {
  const { lang: value, profession } = await params;
  const lang: Lang = isLang(value) ? value : "es";
  return <GesTurnoSite page="home" initialLang={lang} profession={profession} />;
}
