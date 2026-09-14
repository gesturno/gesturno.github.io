import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gesturno.eu"),
  title: { default: "GesTurno", template: "%s" },
  description: "Descarga GesTurno en Google Play y organiza turnos, cuadrantes, horas, notas y agenda laboral desde Android.",
  applicationName: "GesTurno",
  alternates: { canonical: "/" },
  icons: { icon: "/gesturno-icon.webp", shortcut: "/gesturno-icon.webp", apple: "/gesturno-icon.webp" },
  openGraph: {
    title: "GesTurno · Tu cuadrante, bajo control",
    description: "Descarga GesTurno para Android: planificación laboral clara, flexible y privada para profesionales a turnos.",
    url: "https://gesturno.eu/",
    siteName: "GesTurno",
    images: [{ url: "/gesturno-social.png", width: 1200, height: 630, alt: "GesTurno, calendario laboral y control de horas" }],
    locale: "es_ES",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "JLunHgAzGgExBldn1HR2rDUBuvFRs5YSvKKvM--JJvs",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#032417", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head><meta name="google-site-verification" content="JLunHgAzGgExBldn1HR2rDUBuvFRs5YSvKKvM--JJvs" /></head><body>{children}</body></html>;
}
