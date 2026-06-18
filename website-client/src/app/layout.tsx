import type { Metadata } from "next";
import {
  Abhaya_Libre,
  Inter,
  Italianno,
  Playfair_Display,
  REM,
} from "next/font/google";
// @ts-ignore
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import { Toaster } from "sonner";

const abhaya = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-abhaya",
  display: "swap",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const rem = REM({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-rem",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANNA VALAM — Glow the Siddha Way",
  description:
    "Premium Siddha-inspired wellness. Tradition that nourishes beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <UserSync />
    <html
      lang="en"
      className={`${abhaya.variable} ${italianno.variable} ${inter.variable} ${rem.variable} ${playfair.variable}`}
    >
      <body>
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
    </ClerkProvider>
  );
}
