import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Escape — Aprenda Cibersegurança",
  description: "Aprenda cibersegurança do zero ao profissional resolvendo desafios interativos. XSS, SQL Injection, Hash, JWT e muito mais.",
  keywords: ["cibersegurança", "hacking ético", "CTF", "programação", "criptografia", "XSS", "SQL Injection"],
  authors: [{ name: "Lucas" }],
  openGraph: {
    title: "Crypto Escape — Aprenda Cibersegurança",
    description: "74 desafios interativos de cibersegurança. Do zero ao nível intermediário.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Escape",
    description: "Aprenda cibersegurança resolvendo desafios de código.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔐</text></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
