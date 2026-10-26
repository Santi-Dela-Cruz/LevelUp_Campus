import type { Metadata } from "next";
import "./globals.css";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "LevelUp Campus",
  description:
    "Plataforma interactiva de gamificación académica acompañada por Dev'is.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-rune-yellow selection:text-mystic-deep">
        {children}
      </body>
    </html>
  );
}
