import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kakamega Sports Club",
  description: "Western Kenya's premier members' club - Golf, Tennis, Sports & Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white"
      suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
