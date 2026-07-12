import type { Metadata } from "next";
import "./globals.css";
import "./islandos.css";

export const metadata: Metadata = {
  title: "Georgia's Portfolio",
  description: "A macOS-inspired portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
