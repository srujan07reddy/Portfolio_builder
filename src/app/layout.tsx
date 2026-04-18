import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Builder | Professional Portfolio Platform",
  description: "Research operations, automation labs, and secure systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020202] text-slate-300 font-mono min-h-screen selection:bg-cyan-500 selection:text-black`}>
        
        {/* Next.js optimized script loading for Netlify CMS */}
        <Script 
          src="https://identity.netlify.com/v1/netlify-identity-widget.js" 
          strategy="afterInteractive" 
        />
        
        {/* Main Content Area */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
