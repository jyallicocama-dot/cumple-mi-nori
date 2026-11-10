import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feliz Cumpleaños Mi Ñori ⭐ | 21 Motivos Por Los Que Te Amo",
  description:
    "Una página romántica hecha con todo mi amor para celebrar el cumpleaños de la persona más especial de mi vida.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-black text-white antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
