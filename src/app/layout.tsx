import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "ChromaForge - Professional Photo Editor",
  description: "Transform your photos with stunning filters. Create, save, and share your custom filters with ChromaForge.",
  keywords: ["photo editor", "filters", "image editing", "color grading", "photo effects"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
