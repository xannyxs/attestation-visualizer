import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";

const inter = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetroPGF Visualizer",
  description: "A Web3 app to visualise the RetroPGF impact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
