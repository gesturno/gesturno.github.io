import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";

export const metadata: Metadata = { title: "Condiciones de uso · GesTurno", description: "Condiciones para usar GesTurno de forma segura y responsable.", alternates: { canonical: "/terms/" } };
export default function TermsPage() { return <GesTurnoSite page="terms" />; }
