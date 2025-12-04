import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

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
  openGraph: {
    title: "Pathfinder – Discover & Book Local Guides",
    description:
      "Find expert local guides, explore unique destinations, and book unforgettable travel experiences with Pathfinder.",
    url: "https://yourdomain.com",
    siteName: "Pathfinder",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "Pathfinder – Travel & Guide Booking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathfinder – Explore & Book Local Guides",
    description:
      "Your trusted travel platform for discovering destinations and booking expert local guides.",
    images: ["/og-main.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
          {/* <LoginSuccessToast />
          <LogoutSuccessToast />  */}
        </ThemeProvider>
      </body>
    </html>
  );
}
