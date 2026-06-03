import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/audio/AudioProvider";
import SnowField from "@/components/SnowField";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XV Años · Kate Alejandra Reyes Tutillo",
  description:
    "Te invitamos a celebrar los XV años de Kate Alejandra Reyes Tutillo · 6 de febrero de 2027 · Una noche de ensueño al estilo Cenicienta",
  openGraph: {
    title: "XV Años · Kate Alejandra Reyes Tutillo",
    description: "Una noche de ensueño al estilo Cenicienta · 6 de febrero de 2027",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#071a30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable}`}
      >
        <AudioProvider>
          <SnowField />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
