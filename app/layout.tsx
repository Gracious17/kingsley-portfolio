import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kingsley | portfolio",
  description: "LatterWorld Techie Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Navbar />
          {children}
          <Toaster richColors position="bottom-center"/>
        </>
      </body>
    </html>
  );
}
