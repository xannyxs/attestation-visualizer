import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { ModalContextProvider } from "./components/context/modalContext";
import { ThreeGraphContextProvider } from "./components/context/ThreeGraphContext";
import { SelectedNodeContextProvider } from "./components/context/SelectedNodeContextProps";

const font = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetroPGF Visualiser",
  description: "Visualise the Optimism Citizens’ House like never before!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThreeGraphContextProvider>
          <ModalContextProvider>
            <SelectedNodeContextProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </SelectedNodeContextProvider>
          </ModalContextProvider>
        </ThreeGraphContextProvider>
      </body>
    </html>
  );
}
