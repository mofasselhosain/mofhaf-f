
import type { Metadata } from "next";
import "./globals.css";
import MofhafHeader from "@/components/share/top-header/top-header";
import Footer from "@/components/share/footer/footer";

export const metadata: Metadata = {
  title: "MOFHAF",
  description: "MOFHAF online shopping platform",
  icons:"next.svg"
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
        <Footer/>
      
      </body>
    </html>
  );
}
