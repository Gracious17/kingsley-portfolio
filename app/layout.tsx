import type { Metadata } from "next";
// import { Inter, Preahvihear, Plus_Jakarta_Sans, Poppins } from "next/font/google";
// import dynamic from "next/dynamic";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import ExitIntentWrapper from "@/app/components/exitShow/ExitIntentWrapper"
import PerformanceMonitor from "@/app/components/ui/PerformanceMonitor";

// Fallback font variables since Google Fonts fetch failed during build
const inter = { variable: "--font-inter", className: "font-sans" };
const preahvihear = { variable: "--font-preahvihear" };
const plusJakarta = { variable: "--font-plus-jakarta" };
const poppins = { variable: "--font-poppins" };

// const ExitIntentWrapper = dynamic(() => import("./components/exitshow/ExitIntentWrapper"), { ssr: false });

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
      <body className={`${inter.variable} ${preahvihear.variable} ${plusJakarta.variable} ${poppins.variable} ${inter.className}`}>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          <PerformanceMonitor />
          {children}
          <Toaster richColors position="bottom-center" />
          <ExitIntentWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
