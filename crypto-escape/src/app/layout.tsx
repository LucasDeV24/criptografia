import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
  description: "Aprenda cibersegurança do zero ao profissional. Programe em JavaScript e Python, e ataque e defenda sistemas reais num terminal simulado: nmap, sqlmap, AWS, firewall e muito mais.",
  keywords: ["cibersegurança", "hacking ético", "CTF", "terminal Linux", "pentest", "programação", "criptografia", "XSS", "SQL Injection"],
  authors: [{ name: "Lucas" }],
  openGraph: {
    title: "Crypto Escape — Aprenda Cibersegurança",
    description: "382 salas interativas de cibersegurança, com laboratórios práticos e terminal de ataque e defesa. Do zero ao nível profissional.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Escape",
    description: "Aprenda cibersegurança programando e praticando ataque e defesa num terminal real, do zero ao profissional.",
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
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
