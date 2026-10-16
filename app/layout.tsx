import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scirtor.com"),
  title: {
    default: "Nurzhan Bekmurat | Junior Cybersecurity Specialist",
    template: "%s | Scirtor",
  },
  description:
    "Penetration testing and SOC analysis. Explore Nurzhan Bekmurat’s security lab case studies, Python projects and software development work.",
  openGraph: {
    title: "Nurzhan Bekmurat · Scirtor",
    description:
      "Junior Cybersecurity Specialist · Penetration Testing & SOC Analysis",
    url: "https://scirtor.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Nurzhan Bekmurat · Scirtor",
    description:
      "Security lab case studies and software development. Focused on junior pentesting and SOC analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
