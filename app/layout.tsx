import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find Care - Encuentra la mejor institución geriátrica",
  description: "Te ayudamos a encontrar la mejor institución geriátrica para tus seres queridos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col">
          <Navbar loggedIn={true} userName="Laura R" />
          {children}
        </main>
      </body>
    </html>
  );
}
