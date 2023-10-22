import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import GraphDataProvider from "./components/context/GraphDataContext";
import { ModalContextProvider } from "./components/context/modalContext";

const inter = League_Spartan({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ModalContextProvider>
          <GraphDataProvider>{children}</GraphDataProvider>
        </ModalContextProvider>
      </body>
    </html>
  );
}
