import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "XV Años · Kate Alejandra Reyes Tutillo",
  description: "Te invitamos a celebrar los XV años de Kate Alejandra Reyes Tutillo · 6 de febrero de 2027",
  openGraph: {
    title: "XV Años · Kate Alejandra Reyes Tutillo",
    description: "Una noche de ensueño al estilo Cenicienta · 6 de febrero de 2027",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${greatVibes.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
