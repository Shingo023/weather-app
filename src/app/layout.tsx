"use client";

import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Sidebar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
