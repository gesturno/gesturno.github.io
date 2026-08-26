import type { Metadata } from "next";
import GesTurnoSite from "./GesTurnoSite";

export const metadata: Metadata = {
  title: "GesTurno · Tu cuadrante, bajo control",
  description: "Descarga GesTurno para Android: calendario laboral, turnos, control de horas, notas, agenda y copias seguras para profesionales que trabajan a turnos.",
};

export default function Home() {
  return <GesTurnoSite page="home" />;
}
