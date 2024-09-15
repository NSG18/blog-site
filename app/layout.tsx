import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
// import '../styles/globals.css';  
import { cn } from "@/lib/utils";
import siteconfig from "@/config/siteconfig";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: siteconfig.title,
  description: siteconfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-p-24 scroll-smooth ">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-black dark:text-white",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
