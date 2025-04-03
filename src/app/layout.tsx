import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import ContentsWrapper from "../components/ui/ContentsWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Multi Touch",
  description: "react package for multi touch",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="w-screen h-screen grid grid-cols-1 grid-rows-[60px_1fr] items-center justify-center">
          <Header />
          <ContentsWrapper>{children}</ContentsWrapper>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
