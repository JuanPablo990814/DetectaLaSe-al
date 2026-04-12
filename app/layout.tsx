import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Detecta la Señal",
  description: "Aprende a reconocer síntomas, mitos y acciones de prevención del cáncer de mama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} font-sans antialiased text-neutral-800`} style={{ fontFamily: 'var(--font-outfit)' }}>
        {children}
      </body>
    </html>
  );
}
