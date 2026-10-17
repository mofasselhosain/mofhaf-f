
import type { Metadata } from "next";
import "./globals.css";
import MofhafHeader from "@/components/share/top-header/top-header";

export const metadata: Metadata = {
  title: "MOFHAF",
  description: "MOFHAF online shopping platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <MofhafHeader/>
     
        <main>{children}</main>
      
      </body>
    </html>
  );
}
