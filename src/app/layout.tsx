import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "3D image Affeliate Website",
  description: "3D image Affeliate Website made with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="dark">
        <div className="flex h-screen flex-col">
          <Header />
          <main className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
