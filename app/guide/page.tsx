import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";

export const metadata: Metadata = { title: "Instrucciones · GesTurno", description: "Manual completo de configuración y uso de GesTurno." };
export default function GuidePage() { return <GesTurnoSite page="guide" />; }
