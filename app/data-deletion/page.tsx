import type { Metadata } from "next";
import GesTurnoSite from "../GesTurnoSite";

export const metadata: Metadata = { title: "Eliminación de datos · GesTurno", description: "Cómo eliminar datos locales, archivos exportados y calendarios sincronizados de GesTurno." };
export default function DeletionPage() { return <GesTurnoSite page="deletion" />; }
