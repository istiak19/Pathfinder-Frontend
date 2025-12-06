import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import LoginSuccessToast from "./(auth)/_component/LoginSuccessToast";
import LogoutSuccessToast from "./(auth)/_component/LogoutSuccessToast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pathfinder – Explore Destinations & Book Local Guides",
  description:
    "Pathfinder helps travelers discover destinations, connect with trusted local guides, and enjoy personalized travel experiences.",
  keywords: [
    "Pathfinder",
    "local guides",
    "travel booking",
    "tour guide",
    "tourism platform",
    "travel planning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
          <Suspense fallback={null}>
            <LoginSuccessToast />
            <LogoutSuccessToast />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}