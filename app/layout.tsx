import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import ExitIntentWrapper from "@/app/components/exitShow/ExitIntentWrapper"
import PerformanceMonitor from "@/app/components/ui/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gracious kingsley | portfolio",
  description: "LatterWorld Techie Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Fonts are loaded via next/font to avoid render-blocking links */}</head>
      <body className={`${inter.variable} ${inter.className}`}>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark" forcedTheme="dark">
          <PerformanceMonitor />
          {children}
          <Toaster richColors position="bottom-center" />
          <ExitIntentWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
