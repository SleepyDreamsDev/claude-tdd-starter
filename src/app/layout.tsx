import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forever Clean — Servicii de curățenie în Chișinău",
  description:
    "Găsește servicii de curățenie profesionale în Chișinău. Rezervă online, prețuri transparente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
