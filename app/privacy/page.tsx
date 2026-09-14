import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";

export const metadata: Metadata = { title: "Política de privacidad · GesTurno", description: "Información sobre datos locales, permisos, publicidad y servicios externos de GesTurno.", alternates: { canonical: "/privacy/" } };
export default function PrivacyPage() { return <GesTurnoSite page="privacy" />; }
