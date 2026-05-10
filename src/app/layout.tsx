import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SANDBOX | Master OAuth2 & APIs",
  description: "Advanced educational sandbox for mastering secure authentication and API integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Setup", href: "/setup", color: "bg-[#EEFF00]", text: "text-black", code: "EEFF00" },
    { name: "Login", href: "/login", color: "bg-[#1A1B23]", text: "text-white", code: "1A1B23" },
    { name: "Dashboard", href: "/dashboard", color: "bg-[#4D3CFF]", text: "text-white", code: "4D3CFF" },
    { name: "Email", href: "/email", color: "bg-[#8B5CF6]", text: "text-white", code: "8B5CF6" },
    { name: "Validator", href: "/validator", color: "bg-[#F43F5E]", text: "text-white", code: "F43F5E" },
    { name: "Advanced", href: "/advanced", color: "bg-[#059669]", text: "text-white", code: "059669" },
  ];

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-black overflow-x-hidden">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
