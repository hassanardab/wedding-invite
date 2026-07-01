import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

// Automatically optimizes and loads the Amiri font
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "دعوة زفاف موسى و راوية",
  description: "نتشرف بدعوتكم لمشاركتنا فرحتنا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={amiri.className}>{children}</body>
    </html>
  );
}
