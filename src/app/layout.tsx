import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CategoryProvider } from "@/components/providers/CategoryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGINFULL — Built By ALJ",
  description:
    "The Instagram platform that does everything. AI generates your content, edits it, schedules it, manages your community, and grows your account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23833ab4'/><stop offset='50%25' stop-color='%23fd1d1d'/><stop offset='100%25' stop-color='%23fcaf45'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23g)'/><text y='.9em' x='50%25' text-anchor='middle' font-size='55' font-family='system-ui' font-weight='900' fill='white'>IG</text></svg>"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('iginfull-theme');
                if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
                else document.documentElement.setAttribute('data-theme', 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} min-h-full antialiased`}
      >
        <ThemeProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
