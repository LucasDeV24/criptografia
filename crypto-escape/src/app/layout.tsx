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
  description: "Aprenda cibersegurança do zero ao profissional resolvendo desafios interativos. XSS, SQL Injection, Hash, JWT e muito mais.",
  keywords: ["cibersegurança", "hacking ético", "CTF", "programação", "criptografia", "XSS", "SQL Injection"],
  authors: [{ name: "Lucas" }],
  openGraph: {
    title: "Crypto Escape — Aprenda Cibersegurança",
    description: "268 salas interativas de cibersegurança. Do zero ao nível profissional.",
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
