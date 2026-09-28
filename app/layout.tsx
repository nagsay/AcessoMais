import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acesso+ | Hub de Oportunidades",
  description: "Cursos, vagas, estágios, bolsas, eventos e editais reunidos em um só lugar.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
