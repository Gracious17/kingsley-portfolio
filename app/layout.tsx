import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import { Toaster } from "sonner";
import ExitIntentWrapper from "./components/exitShow/ExitIntentWrapper";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <>
          <ThemeProvider
          attribute="class"
          enableSystem={true}
            defaultTheme="system">
            <Navbar />
            {children}
            <Toaster richColors position="bottom-center" />
            <ExitIntentWrapper />
          </ThemeProvider>
        </>
      </body>
    </html>
  );
}
