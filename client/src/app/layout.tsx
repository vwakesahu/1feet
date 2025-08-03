import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RainbowkitProvider } from "@/rainbow/rainbow-provider";
import Navbar from "@/components/navbar";
import BackgroundGradient from "@/components/background/bg";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "1Feet: Cross chain swaps made easy",
  description: "Cross chain swaps made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <RainbowkitProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-screen flex flex-col items-center justify-center">
              <Navbar />
              {children}
              <BackgroundGradient />
            </div>
          </ThemeProvider>
        </RainbowkitProvider>
      </body>
    </html>
  );
}