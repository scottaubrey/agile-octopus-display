import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header/header";
import "./globals.css";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agile Octopus display",
  description: "Agile Octopus application display",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header additionalClasses={[styles.header]} />
        {children}
      </body>
    </html>
  );
}
