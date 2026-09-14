import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";

export const metadata: Metadata = { title: "Instrucciones · GesTurno", description: "Manual completo de configuración y uso de GesTurno.", alternates: { canonical: "/guide/" } };
export default function GuidePage() { return <GesTurnoSite page="guide" />; }
