import type { Metadata } from "next";
import { Inter, Preahvihear, Plus_Jakarta_Sans, Poppins } from "next/font/google";
// import dynamic from "next/dynamic";
import "./globals.css";
import TubelightNavbar from "../app/components/TubelightNavbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import ExitIntentWrapper from "@/app/components/exitShow/ExitIntentWrapper"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const preahvihear = Preahvihear({ subsets: ["latin"], weight: "400", variable: "--font-preahvihear" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "600", variable: "--font-plus-jakarta" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-poppins" });

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
          <TubelightNavbar />
          {children}
          <Toaster richColors position="bottom-center" />
          <ExitIntentWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
