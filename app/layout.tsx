import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nurzhan Bekmurat | Interactive Portfolio",
  description: "A 2D interactive portfolio platform built with Next.js and PixiJS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
